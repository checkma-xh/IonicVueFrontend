import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import type { JwtPayload } from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import * as crypto from "crypto";
import { tokenVerify } from "../utils/tokenVerify";
import { VerificationInfoMap, type VerificationInfo } from "../utils/VerificationInfoMap";

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
const SYSTEM_EMAIL = process.env.SYSTEM_EMAIL;
const SYSTEM_EMAIL_PASSWORD = process.env.SYSTEM_EMAIL_PASSWORD;
const VERIFICATION_CODE_LEN = parseInt(process.env.VERIFICATION_CODE_LEN);
const VERIFICATION_MAX_COUNT = parseInt(process.env.VERIFICATION_MAX_COUNT);

async function generateRandomCode(length: number) {
  const bytes = crypto.randomBytes(Math.ceil(length / 2));
  return bytes.toString("hex").slice(0, length);
}

async function ORMToObject(ORM: any) {
  const object = {};
  const entries = Object.entries(ORM);
  entries.forEach((item: any) => {
    object[item[0]] = item[1];
  });
  return object;
}

export class AuthController {
  private UserInfoRepository = AppDataSource.getRepository(UserInfo);
  private verificationInfoMap = VerificationInfoMap.getVerificationInfoMap();
  private transporter = nodemailer.createTransport({
    service: "outlook", // 使用 Outlook 的 SMTP 服务
    auth: {
      user: SYSTEM_EMAIL,         // 邮箱地址
      pass: SYSTEM_EMAIL_PASSWORD // 邮箱密码
    }
  });

  async register(request: Request, response: Response, next: NextFunction) {
    const email = request.body.email;
    const passwordHash = request.body.passwordHash;
    const avatarUrl = request.body.avatarUrl;
    const verificationInfo = this.verificationInfoMap.get(email);
    if (!verificationInfo?.verificationResult) {
      response.status(400).json({ message: "Verification failed." });
      return;
    }

    let user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.email = :email AND user.activated = 1", { email })
      .getOne();
    if (user) {
      response.status(409).json({ message: "User already exists. Please use a different email or login with your existing account." });
      return;
    }
    user = new UserInfo();
    user.email = email;
    user.passwordHash = passwordHash;
    user.avatarUrl = avatarUrl;
    this.UserInfoRepository.save(user);
    response.status(201).json({ message: "User registration successful. Please login to access your account." });
    return;
  }

  async login(request: Request, response: Response, next: NextFunction) {
    const email = request.body.email;
    const passwordHash = request.body.passwordHash;
    const verificationInfo = this.verificationInfoMap.get(email);
    let user = null;
    if (verificationInfo?.verificationResult) {
      user = await this.UserInfoRepository
        .createQueryBuilder("user")
        .where("user.email = :email AND user.activated = 1", { email })
        .getOne();
    } else {
      user = await this.UserInfoRepository
        .createQueryBuilder("user")
        .where("user.email = :email AND user.passwordHash = :passwordHash AND user.activated = 1", { email, passwordHash })
        .getOne();
    }
    if (!user) {
      response.status(404).json({ message: "UserInfo not found." });
      return;
    }
    const userObject = await ORMToObject(user);
    response.json(
      {
        currentUser: userObject,
        accessToken: jwt.sign(userObject, SECRET_KEY, ACCESS_TOKEN_OPTIONS),
        refreshToken: jwt.sign(userObject, SECRET_KEY, REFRESH_TOKEN_OPTIONS),
      });
  }

  async logout(request: Request, response: Response, next: NextFunction) {
    const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
    if (!decodeToken) {
      response.status(404).json({ message: "No permission." });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: (decodeToken as JwtPayload).id })
      .getOne();
    if (!user) {
      response.status(404).json({ message: "UserInfo not found." });
      return;
    }
    const userObject = await ORMToObject(user);
    response.json(
      {
        currentUser: userObject,
        accessToken: jwt.sign(userObject, SECRET_KEY, { expiresIn: 1 }),
        refreshToken: jwt.sign(userObject, SECRET_KEY, { expiresIn: 1 }),
      });
  }

  async refresh(request: Request, response: Response, next: NextFunction) {
    const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
    if (!decodeToken) {
      response.status(404).json({ message: "No permission." });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: (decodeToken as JwtPayload).id })
      .getOne();
    if (!user) {
      response.status(404).json({ message: "UserInfo not found." });
      return;
    }
    const userObject = await ORMToObject(user);
    response.json(
      {
        currentUser: userObject,
        accessToken: jwt.sign(userObject, SECRET_KEY, ACCESS_TOKEN_OPTIONS),
      });
  }

  async deactivate(request: Request, response: Response, next: NextFunction) {
    const email = request.body.email;
    const verificationInfo = this.verificationInfoMap.get(email);
    if (!verificationInfo?.verificationResult) {
      response.status(400).json({ message: "Verification failed." });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.email = :email AND user.activated = 1", { email })
      .getOne();
    if (!user) {
      response.status(404).json({ message: "UserInfo not found." });
      return;
    }
    user.activated = false;
    await this.UserInfoRepository.save(user);
    const userObject = await ORMToObject(user);
    response.json(
      {
        currentUser: userObject,
        accessToken: jwt.sign(userObject, SECRET_KEY, { expiresIn: 1 }),
        refreshToken: jwt.sign(userObject, SECRET_KEY, { expiresIn: 1 }),
      });
  }

  async verificationCodeRequest(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const receiverEmail: string = request.body.email;
    if (this.verificationInfoMap.has(receiverEmail)) {
      response.status(429).json({ message: "Too many requests. please wait a moment before trying again." });
      return;
    }

    // * 设置邮件选项
    const verificationCode = await generateRandomCode(VERIFICATION_CODE_LEN);
    const mailOptions = {
      from: SYSTEM_EMAIL,           // 发件人邮箱地址
      to: receiverEmail,            // 收件人邮箱地址
      subject: "verification code", // 邮件主题
      text: verificationCode,       // 邮件内容
    };
    // * 发送邮件
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);

      const verificationInfo: VerificationInfo = {
        verificationCode: verificationCode,
        email: receiverEmail,
        timestamp: Date.now(),
        verificationResult: false,
        verificationCount: 0,
      };
      this.verificationInfoMap.set(receiverEmail, verificationInfo);

      // 设置定时器，在 2 分钟后删除验证码信息
      setTimeout(() => {
        this.verificationInfoMap.delete(receiverEmail);
      }, 120000);

      response.status(200).json({ message: "Verification code sent successfully to your email." });
      return;
    } catch (error) {
      console.error("Failed to send verification code:", error);
      response.status(500).json({ message: "Failed to send verification code. Please try again later." });
      return;
    }
  }

  async verificationCodeVerify(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const email: string = request.body.email;
    const verificationCode: string = request.body.verificationCode;
    if (!this.verificationInfoMap.has(email)) {
      response.status(400).json({ message: "Verification code has not been requested. Please request the verification code first." });
      return;
    }
    const verificationInfo = this.verificationInfoMap.get(email);
    if (verificationInfo.verificationCount > VERIFICATION_MAX_COUNT) {
      response.status(429).json({ message: "Maximum number of verifications exceeded. Please try again later." });

    }
    if (verificationInfo.verificationCode == verificationCode) {
      verificationInfo.verificationResult = true;
    }
    verificationInfo.verificationCount++;
    response.status(200).json({ message: "Verification successful." });
    return;
  }
}
