import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import * as dotenv from "dotenv";

dotenv.configDotenv();

const SECRET_KEY = process.env.SECRET_KEY;
export class UserInfoController {
  private UserInfoRepository = AppDataSource.getRepository( UserInfo );

  async getUserInfo ( request: Request, response: Response, next: NextFunction ) {
    const id = parseInt( request.params.id );
    const user = await this.UserInfoRepository.findOneBy( { id } );
    if ( !user ) {
      response.status( 404 ).json( { message: "userInfo not found" } );
      return;
    }
    response.json( user );
  }

  async editEmail ( request: Request, response: Response, next: NextFunction ) {
    const id = parseInt( request.params.id );
    const user = await this.UserInfoRepository.findOneBy( { id } );
    if ( !user ) {
      response.status( 404 ).json( { message: "userInfo not found" } );
      return;
    }
    user.email = request.body.email;
    await this.UserInfoRepository.save( user );
    response.json( user );
  }

  async editPasswordHash (
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const id = parseInt( request.params.id );
    const user = await this.UserInfoRepository.findOneBy( { id } );
    if ( !user ) {
      response.status( 404 ).json( { message: "userInfo not found" } );
      return;
    }
    user.passwordHash = request.body.passwordHash;
    await this.UserInfoRepository.save( user );
    response.json( user );
  }

  async editAvatarUrl (
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const id = parseInt( request.params.id );
    const user = await this.UserInfoRepository.findOneBy( { id } );
    if ( !user ) {
      response.status( 404 ).json( { message: "userInfo not found" } );
      return;
    }
    user.avatarUrl = request.body.avatarUrl;
    await this.UserInfoRepository.save( user );
    response.json( user );
  }
}
