import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import { tokenVerify } from "../utils/tokenVerify";
import { VerificationInfoMap } from "../utils/VerificationInfoMap";
import type { JwtPayload } from "jsonwebtoken";
import { findExistingUser } from "../utils/findExistingUser";


export class UserInfoController {
	private UserInfoRepository = AppDataSource.getRepository(UserInfo);
	private verificationInfoMap = VerificationInfoMap.getVerificationInfoMap();

	async getUserInfo(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error('Invalid token');
			}

			const id = parseInt(request.params.id);
			const user = await findExistingUser(id, null, null);

			response.status(200).json(user);
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			response.status(500).json({ status: "error", message: errorMessage });
		}
	}

	async editEmail(request: Request, response: Response, next: NextFunction) {
		try {
			const { newEmail, oldEmail } = request.body;

			const verificationInfo = this.verificationInfoMap.get(newEmail);
			if (!verificationInfo?.verificationResult) {
				throw new Error("Verification failed.");
			}

			const user = await findExistingUser(null, oldEmail, null);
			user.email = newEmail;
			await this.UserInfoRepository.save(user);

			response.status(200).json(user);
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			response.status(500).json({ status: "error", message: errorMessage });
		}
	}


	async editPasswordHash(
		request: Request,
		response: Response,
		next: NextFunction,
	) {

		try {
			const { email, passwordHash } = request.body;
			const verificationInfo = this.verificationInfoMap.get(email);
			if (!verificationInfo?.verificationResult) {
				throw new Error("Verification failed.");
			}
			const user = await findExistingUser(null, email, null);
			user.passwordHash = passwordHash;
			await this.UserInfoRepository.save(user);

			response.status(200).json(user);
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			response.status(500).json({ status: "error", message: errorMessage });
		}
	}

	async editAvatarUrl(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const { avatarUrl } = request.body;
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Verification failed.");
			}
			const user = await findExistingUser((decodeToken as JwtPayload).id, null, null);
			user.avatarUrl = avatarUrl;
			await this.UserInfoRepository.save(user);

			response.status(200).json(user);
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			response.status(500).json({ status: "error", message: errorMessage });
		}
	}
}
