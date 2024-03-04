import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import * as CryptoJS from 'crypto-js';


export class UserInfoController {
    private UserInfoRepository = AppDataSource.getRepository(UserInfo);

    async getUserInfo(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const user = await this.UserInfoRepository.findOneBy({ id });
        if (!user) {
            return response.status(404).json({ message: "userInfo not found" });
        }
        return response.json(user);
    }


    async editEmail(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const user = await this.UserInfoRepository.findOneBy({ id });
        if (!user) {
            return response.status(404).json({ message: "userInfo not found" });
        }
        user.email = request.body.email;
        await this.UserInfoRepository.save(user);
        return response.json(user);
    }


    async editPasswordHash(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const user = await this.UserInfoRepository.findOneBy({ id });
        if (!user) {
            return response.status(404).json({ message: "userInfo not found" });
        }
        user.passwordHash = CryptoJS.SHA256(request.body.passwordHash).toString();
        await this.UserInfoRepository.save(user);
        return response.json(user);
    }

    
    async editAvatarUrl(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const user = await this.UserInfoRepository.findOneBy({ id });
        if (!user) {
            return response.status(404).json({ message: "userInfo not found" });
        }
        user.avatarUrl = request.body.avatarUrl;
        await this.UserInfoRepository.save(user);
        return response.json(user);
    }
}