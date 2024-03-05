import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.configDotenv();

const SECRET_KEY = process.env.SECRET_KEY;
const ACCESS_TOKEN_EXPIRATION = parseInt( process.env.ACCESS_TOKEN_EXPIRATION );
const REFRESH_TOKEN_EXPIRATION = parseInt( process.env.REFRESH_TOKEN_EXPIRATION );
const ACCESS_TOKEN_OPTIONS = {
  expiresIn: ACCESS_TOKEN_EXPIRATION,
};
const REFRESH_TOKEN_OPTIONS = {
  expiresIn: REFRESH_TOKEN_EXPIRATION,
};

export class AuthController {
  private UserInfoRepository = AppDataSource.getRepository( UserInfo );

  async login ( request: Request, response: Response, next: NextFunction ) {
    const email = request.body.email;
    const passwordHash = request.body.passwordHash;
    const user = await this.UserInfoRepository.findOneBy( { email: email, passwordHash: passwordHash } );
    if ( !user ) {
      response.status( 404 ).json( { message: "userInfo not found" } );
      return;
    }
    response.json(
      {
        currentUser: user,
        accessToken: jwt.sign( { id: user.id }, SECRET_KEY, ACCESS_TOKEN_OPTIONS ),
        refreshToken: jwt.sign( { id: user.id }, SECRET_KEY, REFRESH_TOKEN_OPTIONS ),
      } );
  }

  async logout ( request: Request, response: Response, next: NextFunction ) { }

  async refresh ( request: Request, response: Response, next: NextFunction ) { }

  async deactivate ( request: Request, response: Response, next: NextFunction ) { }

  async register ( request: Request, response: Response, next: NextFunction ) { }

  async VerificationCodeRequest (
    request: Request,
    response: Response,
    next: NextFunction,
  ) { }

  async VerificationCodeVerify (
    request: Request,
    response: Response,
    next: NextFunction,
  ) { }
}