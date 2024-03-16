import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import { tokenVerify } from "../utils/useVerifyTool";
import { VerificationInfoMap } from "../utils/VerificationInfoMap";
import type { JwtPayload } from "jsonwebtoken";


export class UserInfoController {
	private UserInfoRepository = AppDataSource.getRepository(UserInfo);
	private verificationInfoMap = VerificationInfoMap.getVerificationInfoMap();

	async getUserInfo(request: Request, response: Response, next: NextFunction) {
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

		return response.status(200).json({
			id       : user.id,
			email    : user.email,
			password : user.password,
			avatar   : user.avatar,
			activated: user.activated, message: "get user information successful"
		});
	}

	async editEmail(request: Request, response: Response, next: NextFunction) {
		const { newEmail, oldEmail } = request.body;
		const verificationInfo = this.verificationInfoMap.get(newEmail);
		if (!verificationInfo?.verificationResult) {
			return response.status(400).json({ message: "verification failed" });
		}

		const user = await this.UserInfoRepository
			.createQueryBuilder("user")
			.where("user.email = :email AND user.activated = 1", { email: oldEmail })
			.getOne();

		if (!user) {
			return response.status(404).json({ message: "user not found" });
		}

		user.email = newEmail;
		await this.UserInfoRepository.save(user);

		return response.status(200).json({ message: "edit email successful" });
	}


	async editPassword(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		const { email, password } = request.body;
		const verificationInfo = this.verificationInfoMap.get(email);
		if (!verificationInfo?.verificationResult) {
			return response.status(400).json({ message: "verification failed" });
		}

		const user = await this.UserInfoRepository
			.createQueryBuilder("user")
			.where("user.email = :email AND user.activated = 1", { email: email })
			.getOne();

		if (!user) {
			return response.status(404).json({ message: "user not found" });
		}

		user.password = password;
		await this.UserInfoRepository.save(user);

		return response.status(200).json({ message: "edit password successful" });
	}

	async editAvatar(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		const { avatar } = request.body;
		const decodeToken = await tokenVerify(request.headers?.authorization.split(" ")[1]);
		if (!decodeToken) {
			return response.status(400).json({ message: "verification failed" });
		}

		const user = await this.UserInfoRepository
			.createQueryBuilder("user")
			.where("user.id = :id AND user.activated = 1", { id: (decodeToken as JwtPayload).id })
			.getOne();

		if (!user) {
			return response.status(404).json({ message: "user not found" });
		}

		user.avatar = avatar;
		await this.UserInfoRepository.save(user);

		return response.status(200).json({ message: "edit avatar successful" });
	}
}