import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import type { JwtPayload } from "jsonwebtoken";

dotenv.configDotenv();

const SECRET_KEY = process.env.SECRET_KEY;
const ACCESS_TOKEN_EXPIRATION = parseInt(process.env.ACCESS_TOKEN_EXPIRATION);
const REFRESH_TOKEN_EXPIRATION = parseInt(process.env.REFRESH_TOKEN_EXPIRATION);
const ACCESS_TOKEN_OPTIONS = {
  expiresIn: ACCESS_TOKEN_EXPIRATION,
};
const REFRESH_TOKEN_OPTIONS = {
  expiresIn: REFRESH_TOKEN_EXPIRATION,
};

export class AuthController {
  private UserInfoRepository = AppDataSource.getRepository(UserInfo);
  private ORMToObject(ORM: any) {
    const object = {};
    const entries = Object.entries(ORM);
    entries.forEach((item: any) => {
      object[item[0]] = item[1];
    });
    return object;
  }

  async register(request: Request, response: Response, next: NextFunction) { }

  async login(request: Request, response: Response, next: NextFunction) {
    const email = request.body.email;
    const passwordHash = request.body.passwordHash;
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.email = :email AND user.passwordHash = :passwordHash AND user.activated = 1", { email, passwordHash })
      .getOne();
    if (!user) {
      response.status(404).json({ message: "userInfo not found" });
      return;
    }
    response.json(
      {
        currentUser: user,
        accessToken: jwt.sign(this.ORMToObject(user), SECRET_KEY, ACCESS_TOKEN_OPTIONS),
        refreshToken: jwt.sign(this.ORMToObject(user), SECRET_KEY, REFRESH_TOKEN_OPTIONS),
      });
  }

  async logout(request: Request, response: Response, next: NextFunction) {
    const decodeToken = jwt.verify(request.headers.authorization.split(" ")[1], SECRET_KEY);
    if (!decodeToken) {
      response.status(404).json({ message: "no permission" });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: (decodeToken as JwtPayload).id })
      .getOne();
    if (!user) {
      response.status(404).json({ message: "userInfo not found" });
      return;
    }
    response.json(
      {
        accessToken: jwt.sign(this.ORMToObject(user), SECRET_KEY, { expiresIn: 1 }),
        refreshToken: jwt.sign(this.ORMToObject(user), SECRET_KEY, { expiresIn: 1 }),
      });
  }

  async refresh(request: Request, response: Response, next: NextFunction) {
    const decodeToken = jwt.verify(request.headers.authorization.split(" ")[1], SECRET_KEY);
    if (!decodeToken) {
      response.status(404).json({ message: "no permission" });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: (decodeToken as JwtPayload).id })
      .getOne();
    if (!user) {
      response.status(404).json({ message: "userInfo not found" });
      return;
    }
    response.json(
      { accessToken: jwt.sign(this.ORMToObject(user), SECRET_KEY, REFRESH_TOKEN_OPTIONS) });
  }

  async deactivate(request: Request, response: Response, next: NextFunction) {
    const decodeToken = jwt.verify(request.headers.authorization.split(" ")[1], SECRET_KEY);
    if (!decodeToken) {
      response.status(404).json({ message: "no permission" });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: (decodeToken as JwtPayload).id })
      .getOne();
    if (!user) {
      response.status(404).json({ message: "userInfo not found" });
      return;
    }
    user.activated = false;
    await this.UserInfoRepository.save(user);
    response.json(
      {
        accessToken: jwt.sign(this.ORMToObject(user), SECRET_KEY, { expiresIn: 1 }),
        refreshToken: jwt.sign(this.ORMToObject(user), SECRET_KEY, { expiresIn: 1 }),
      });
  }

  async verificationCodeRequest(
    request: Request,
    response: Response,
    next: NextFunction,
  ) { }

  async verificationCodeVerify(
    request: Request,
    response: Response,
    next: NextFunction,
  ) { }
}
