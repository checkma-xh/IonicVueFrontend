import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import { tokenVerify } from "../utils/tokenVerify";
import { VerificationInfoMap } from "../utils/VerificationInfoMap";
import type { JwtPayload } from "jsonwebtoken";


export class UserInfoController {
  private UserInfoRepository = AppDataSource.getRepository(UserInfo);
  private verificationInfoMap = VerificationInfoMap.getVerificationInfoMap();

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
    const verificationInfo = this.verificationInfoMap.get(newEmail);
    if (!verificationInfo?.verificationResult) {
      response.status(400).json({ message: "Verification failed." });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.email = :email AND user.activated = 1", { email: oldEmail })
      .getOne();
      console.log(oldEmail, newEmail, verificationInfo, user);
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
    const verificationInfo = this.verificationInfoMap.get(email);
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
    const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
    if (!decodeToken) {
      response.status(404).json({ message: "No permission." });
      return;
    }
    const avatarUrl: string = request.body.avatarUrl;
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: (decodeToken as JwtPayload).id })
      .getOne();
    user.avatarUrl = avatarUrl;
    await this.UserInfoRepository.save(user);
    response.json(user);
  }
}
