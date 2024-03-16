import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import * as crypto from "crypto";
import { tokenVerify } from "../utils/useVerifyTool";
import { VerificationInfoMap } from "../utils/VerificationInfoMap";
import { ConfigService } from "../utils/ConfigService";


const config = ConfigService.getConfig();
const accessTokenOptions = {
	expiresIn: config.accessTokenExpiration,
};
const refreshTokenOptions = {
	expiresIn: config.refreshTokenExpiration,
};


export class AuthController {
	private UserInfoRepository = AppDataSource.getRepository(UserInfo);
	private verificationInfoMap = VerificationInfoMap.getVerificationInfoMap();
	private transporter = nodemailer.createTransport({
		service: "outlook", // 使用 Outlook 的 SMTP 服务
		auth: {
			user: config.systemEmail,         // 邮箱地址
			pass: config.systemEmailPassword  // 邮箱密码
		}
	});


	private generateRandomCode(length: number) {
		const bytes = crypto.randomBytes(Math.ceil(length / 2));
		return bytes.toString("hex").slice(0, length);
	}


	private createUser(email: string, password: string, avatar: string): UserInfo {
		const user = new UserInfo();
		user.email = email;
		user.password = password;
		user.avatar = avatar;
		return user;
	}


	async register(request: Request, response: Response, next: NextFunction) {
		const { email, password, avatar } = request.body;
		const verificationInfo = this.verificationInfoMap.get(email);
		if (!verificationInfo?.verificationResult) {
			return response.status(401).json({ message: "verification failed" });
		}

		const user = await this.UserInfoRepository
			.createQueryBuilder("user")
			.where("user.email = :email", { email: email })
			.getOne();

		if (user) {
			return response.status(409).json({ message: "user already exists" });
		}

		const newUser = this.createUser(email, password, avatar);
		await this.UserInfoRepository.save(newUser);

		return response.status(201).json({ message: "register successful" });
	}


	async login(request: Request, response: Response, next: NextFunction) {
		const { email, password } = request.body;
		const verificationInfo = this.verificationInfoMap.get(email);
		const repository = this.UserInfoRepository
			.createQueryBuilder("user")
			.where("user.email = :email AND user.activated = 1", { email: email });

		if (password) {
			repository.andWhere("user.password = :password", { password: password });
		} else if (!verificationInfo?.verificationResult) {
			return response.status(401).json({ message: "verification failed" });
		}

		const user = await repository.getOne();

		if (!user) {
			return response.status(404).json({ message: "user not found" });
		}

		const accessToken = jwt.sign({id: user.id}, config.secretKey, accessTokenOptions);
		const refreshToken = jwt.sign({id: user.id}, config.secretKey, refreshTokenOptions);

		return response.status(201).json({
			id                   : user.id,
			email                : user.email,
			password             : user.password,
			avatar               : user.avatar,
			activated            : user.activated,
			accessToken          : accessToken,
			accessTokenExpiration: config.accessTokenExpiration,
			refreshToken         : refreshToken,
			message              : "login successful",
		});
	}


	async logout(request: Request, response: Response, next: NextFunction) {
		const decodeToken = await tokenVerify(request.headers?.authorization.split(" ")[1]);
		if (!decodeToken) {
			return response.status(400).json({ message: "bad request" });
		}

		const user = await this.UserInfoRepository
			.createQueryBuilder("user")
			.where("user.id = :id AND user.activated = 1", { id: (decodeToken as JwtPayload).id })
			.getOne();

		if (!user) {
			return response.status(404).json({ message: "user not found" });
		}

		return response.status(201).json({ message: "logout successful" });
	}


	async refresh(request: Request, response: Response, next: NextFunction) {
		const decodeToken = await tokenVerify(request.headers?.authorization.split(" ")[1]);
		if (!decodeToken) {
			return response.status(400).json({ message: "bad request" });
		}

		const user = await this.UserInfoRepository
			.createQueryBuilder("user")
			.where("user.id = :id AND user.activated = 1", { id: (decodeToken as JwtPayload).id })
			.getOne();

		if (!user) {
			return response.status(404).json({ message: "user not found" });
		}

		const accessToken =  jwt.sign({id: user.id}, config.secretKey, accessTokenOptions);

		return response.status(200).json({
			id                   : user.id,
			email                : user.email,
			password             : user.password,
			avatar               : user.avatar,
			activated            : user.activated,
			accessToken          : accessToken,
			accessTokenExpiration: config.accessTokenExpiration,
			message              : "refresh successful"
		});
	}


	async deactivate(request: Request, response: Response, next: NextFunction) {
		const { email } = request.body;
		const verificationInfo = this.verificationInfoMap.get(email);
		if (!verificationInfo?.verificationResult) {
			return response.status(401).json({ message: "verification failed" });
		}

		const user = await this.UserInfoRepository
			.createQueryBuilder("user")
			.where("user.email = :email", { email })
			.getOne();

		if (!user) {
			return response.status(401).json({ message: "verification failed" });
		}

		user.activated = false;
		await this.UserInfoRepository.save(user);

		return response.status(200).json({ message: "deactivate successful" });
	}


	async sendVerificationEmail(receiverEmail: string, verificationCode: string) {
		try {
			const mailOptions = {
				from: config.systemEmail,
				to: receiverEmail,
				subject: "verification Code",
				text: `your verification code is: ${verificationCode}`,
			};
			await this.transporter.sendMail(mailOptions);
		} catch (error) {
			throw new Error("failed to json verification email");
		}
	}


	async verificationCodeRequest(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const receiverEmail = request.body.email;
		if (this.verificationInfoMap.has(receiverEmail)) {
			return response.status(429).json({ message: "verification code has already been sent to this email" });
		}

		const verificationCode = this.generateRandomCode(config.verificationCodeLen);
		await this.sendVerificationEmail(receiverEmail, verificationCode);
		VerificationInfoMap.createVerificationInfo(verificationCode, receiverEmail);
		return response.status(200).json({ message: "verification code sent" });
	}


	async verificationCodeVerify(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const { email, verificationCode } = request.body;
		const verificationInfo = this.verificationInfoMap.get(email);
		if (!verificationInfo) {
			return response.status(400).json({ message: "verification code has not been requested" });
		}
		
		verificationInfo.verificationCount++;
		
		if (verificationInfo.verificationCount > config.verificationMaxCount) {
			return response.status(429).json({ message: "maximum number of verifications exceeded" });
		}
		else if (verificationInfo.verificationCode.toLowerCase() === verificationCode.toLowerCase()) {
			verificationInfo.verificationResult = true;
			return response.status(200).json({ message: "verification successful" });
		}
		else {
			return response.status(401).json({ message: "verification failed" });
		}
	}
}
