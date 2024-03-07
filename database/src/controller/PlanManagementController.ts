/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import { GroupInfo } from "../entity/GroupInfo";
import { PriorityInfo } from "../entity/PriorityInfo";
import { PlanInfo } from "../entity/PlanInfo";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { userInfo } from "os";

dotenv.configDotenv();

const SECRET_KEY = process.env.SECRET_KEY;

export class PlanManagementController {
  private UserInfoRepository = AppDataSource.getRepository(UserInfo);
  private GroupInfoRepository = AppDataSource.getRepository(GroupInfo);
  private PriorityInfoRepository = AppDataSource.getRepository(PriorityInfo);
  private PlanInfoRepository = AppDataSource.getRepository(PlanInfo);

  async createPlan(request: Request, response: Response, next: NextFunction) { }

  async completePlan(
    request: Request,
    response: Response,
    next: NextFunction,
  ) { }

  async deletePlan(request: Request, response: Response, next: NextFunction) { }

  async setPlan(request: Request, response: Response, next: NextFunction) { }

  async createGroup(request: Request, response: Response, next: NextFunction) { }

  async getGroups(request: Request, response: Response, next: NextFunction) {
    const decodeToken = jwt.verify(request.headers.authorization.split(" ")[1], SECRET_KEY);
    if (!decodeToken) {
      response.status(404).json({ message: "no permission" });
      return;
    }
    const groups = await this.GroupInfoRepository.find();
    if (!groups) {
      response.status(404).json({ message: "groups information not found" });
      return;
    }
    response.json(groups);
  }

  async deleteGroup(request: Request, response: Response, next: NextFunction) { }

  async setGroup(request: Request, response: Response, next: NextFunction) { }

  async getPlansByDeleted(
    request: Request,
    response: Response,
    next: NextFunction,
  ) { }

  async getPlansByGroupName(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    // const decodeToken = jwt.verify(request.headers.authorization.split(" ")[1], SECRET_KEY);
    // if (!decodeToken) {
    //   response.status(404).json({ message: "no permission" });
    //   return;
    // }
    const plans = await this.PlanInfoRepository
    .createQueryBuilder("plan")
    .leftJoinAndSelect("plan.user", "user")
    .leftJoinAndSelect("plan.group", "group")
    .where("user.id = :id", { id: 1 })
    .andWhere("group.name = :groupName", { groupName: request.query.groupName })
    .getMany();
    if (!plans) {
      response.status(404).json({ message: "plan information not found" });
      return;
    }
    response.json(plans);
  }


  async getPlansByPeriod(
    request: Request,
    response: Response,
    next: NextFunction,
  ) { }


  async getPlansByContent(
    request: Request,
    response: Response,
    next: NextFunction,
  ) { }
}
