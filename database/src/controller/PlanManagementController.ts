import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import { GroupInfo } from "../entity/GroupInfo";
import { PriorityInfo } from "../entity/PriorityInfo";
import { PlanInfo } from "../entity/PlanInfo";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { group } from "console";

dotenv.configDotenv();

const SECRET_KEY = process.env.SECRET_KEY;

export class PlanManagementController {
  private UserInfoRepository = AppDataSource.getRepository(UserInfo);
  private GroupInfoRepository = AppDataSource.getRepository(GroupInfo);
  private PriorityInfoRepository = AppDataSource.getRepository(PriorityInfo);
  private PlanInfoRepository = AppDataSource.getRepository(PlanInfo);

  async createPlan(request: Request, response: Response, next: NextFunction) { }

  async getPlan(
    request: Request,
    response: Response,
    next: NextFunction,
  ) { }

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

  async getPlans(request: Request, response: Response, next: NextFunction) {
    const decodeToken = jwt.verify(request.headers.authorization.split(" ")[1], SECRET_KEY);
    if (!decodeToken) {
        response.status(404).json({ message: "no permission" });
        return;
    }
    const deleted = request.query.deleted;
    const groupName = request.query.groupName;
    const startDate = request.query.startDate;
    const endDate = request.query.endDate;
    const completed = request.query.completed;
    const name = request.query.name;
    const remark = request.query.remark;
    console.log(deleted, groupName, startDate, endDate, completed, name, remark);
  }
}
