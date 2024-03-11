import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import * as crypto from "crypto";
import { tokenVerify } from "../utils/tokenVerify";
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


	private async generateRandomCode(length: number) {
		const bytes = crypto.randomBytes(Math.ceil(length / 2));
		return bytes.toString("hex").slice(0, length);
	}


	private createUser(email: string, passwordHash: string, avatarUrl: string): UserInfo {
		const user = new UserInfo();
		user.email = email;
		user.passwordHash = passwordHash;
		user.avatarUrl = avatarUrl;
		return user;
	}


	async register(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, passwordHash, avatarUrl } = request.body;
			const verificationInfo = this.verificationInfoMap.get(email);
			if (!verificationInfo?.verificationResult) {
				throw new Error("Verification failed.");
			}

			const user = await this.UserInfoRepository
				.createQueryBuilder("user")
				.where("user.email = :email", { email: email })
				.getOne();

			if (user) {
				throw new Error("User already exists. Please use a different email or login with your existing account.");
			}

			const newUser = this.createUser(email, passwordHash, avatarUrl);
			await this.UserInfoRepository.save(newUser);

			return { status: "success", message: "User registration successful. Please login to access your account." };
		} catch (error) {
			const errorMessage = error.message || "An error occurred during registration.";
			return { status: "error", message: errorMessage };
		}
	}


	async login(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, passwordHash } = request.body;
			const verificationInfo = this.verificationInfoMap.get(email);
			const repository = this.UserInfoRepository
				.createQueryBuilder("user")
				.where("user.email = :email AND user.activated = 1", { email: email });

			if (passwordHash) {
				repository.andWhere("user.passwordHash = :passwordHash", { passwordHash: passwordHash });
			} else if (!verificationInfo?.verificationResult) {
				throw new Error("Verification failed.");
			}

			const user = await repository.getOne();

			if (!user) {
				throw new Error("User not found.");
			}

			const userObject = { ...user };
			const accessToken = jwt.sign(userObject, config.secretKey, accessTokenOptions);
			const refreshToken = jwt.sign(userObject, config.secretKey, refreshTokenOptions);

			return {
				status: "success",
				currentUser: userObject,
				accessToken: accessToken,
				refreshToken: refreshToken,
			};
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}



	async logout(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			return { status: "success", message: "Logout." };
		} catch (error) {
			console.error("Error during logout:", error);
			return { status: "error", message: "Internal server error." };
		}
	}


	async refresh(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const user = await this.UserInfoRepository
				.createQueryBuilder("user")
				.where("user.id = :id", { id: (decodeToken as JwtPayload).id })
				.getOne();

			if (!user) {
				throw new Error("User not found.");
			}

			const userObject = { ...user };
			const accessToken = jwt.sign(userObject, config.secretKey, accessTokenOptions);

			return {
				status: "success",
				currentUser: userObject,
				accessToken: accessToken,
			};
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}


	async deactivate(request: Request, response: Response, next: NextFunction) {
		try {
			const { email } = request.body;
			const verificationInfo = this.verificationInfoMap.get(email);
			if (!verificationInfo?.verificationResult) {
				throw new Error("Verification failed.");
			}

			const user = await this.UserInfoRepository
				.createQueryBuilder("user")
				.where("user.email = :email", { email })
				.getOne();

			if (!user) {
				throw new Error("User not found.");
			}

			user.activated = false;
			await this.UserInfoRepository.save(user);

			return { status: "success", message: "Deactivated." };
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}


	async sendVerificationEmail(receiverEmail: string, verificationCode: string) {
		try {
			const mailOptions = {
				from: config.systemEmail,
				to: receiverEmail,
				subject: "Verification Code",
				text: `Your verification code is: ${verificationCode}`,
			};
			await this.transporter.sendMail(mailOptions);
		} catch (error) {
			throw new Error("Failed to send verification email.");
		}
	}


	async verificationCodeRequest(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const receiverEmail = request.body.email;
		try {
			if (this.verificationInfoMap.has(receiverEmail)) {
				throw new Error("Verification code has already been sent to this email.");
			}

			const verificationCode = await this.generateRandomCode(config.verificationCodeLen);
			await this.sendVerificationEmail(receiverEmail, verificationCode);
			VerificationInfoMap.createVerificationInfo(verificationCode, receiverEmail);

			return { message: "Verification code sent successfully to your email." };
		} catch (error) {
			console.error("Error sending verification code:", error);
			return { message: "Failed to send verification code. Please try again later." };
		}
	}


	async verificationCodeVerify(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		try {
			const email = request.body.email;
			const verificationCode = request.body.verificationCode;
			const verificationInfo = this.verificationInfoMap.get(email);

			if (!verificationInfo) {
				throw new Error("Verification code has not been requested. Please request the verification code first.");
			}
			if (verificationInfo.verificationCount > config.verificationMaxCount) {
				throw new Error("Maximum number of verifications exceeded. Please try again later.");
			}
			if (verificationInfo.verificationCode === verificationCode) {
				verificationInfo.verificationResult = true;
			}
			verificationInfo.verificationCount++;

			return { status: "success", message: "Verification successful." };
		} catch (error) {
			console.error("Error verifying verification code:", error);
			return { status: "error", message: error.message };
		}
	}
}