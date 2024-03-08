import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import { tokenVerify } from "../utils/tokenVerify";
import { verificationInfoMap } from "./AuthController";

export class UserInfoController {
  private UserInfoRepository = AppDataSource.getRepository(UserInfo);

  async getUserInfo(request: Request, response: Response, next: NextFunction) {
    const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
    if (!decodeToken) {
      response.status(404).json({ message: "no permission" });
      return;
    }
    const id = parseInt(request.params.id);
    const user = await this.UserInfoRepository.findOneBy({ id });
    if (!user) {
      response.status(404).json({ message: "userInfo not found" });
      return;
    }
    response.json(user);
  }

  async editEmail(request: Request, response: Response, next: NextFunction) {
    const oldEmail: string = request.body.oldEmail;
    const newEmail: string = request.body.newEmail;
    const verificationInfo = verificationInfoMap.get(newEmail);
    if (!verificationInfo?.verificationResult) {
      response.status(400).json({ message: "Verification failed." });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.email = :email AND user.activated = 1", { oldEmail })
      .getOne();
    user.email = newEmail;
    await this.UserInfoRepository.save(user);
    response.json(user);
  }
// redis hashtable\publisher
// celery
// kafka

  async editPasswordHash(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const email: string = request.body.email;
    const passwordHash: string = request.body.passwordHash;
    const verificationInfo = verificationInfoMap.get(email);
    if (!verificationInfo?.verificationResult) {
      response.status(400).json({ message: "Verification failed." });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.email = :email AND user.activated = 1", { email })
      .getOne();
    user.passwordHash = passwordHash;
    await this.UserInfoRepository.save(user);
    response.json(user);
  }

  async editAvatarUrl(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const email: string = request.body.email;
    const avatarUrl: string = request.body.avatarUrl;
    const verificationInfo = verificationInfoMap.get(email);
    if (!verificationInfo?.verificationResult) {
      response.status(400).json({ message: "Verification failed." });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.email = :email AND user.activated = 1", { email })
      .getOne();
    user.passwordHash = avatarUrl;
    await this.UserInfoRepository.save(user);
    response.json(user);
  }
}
