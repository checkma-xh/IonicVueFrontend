import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import { GroupInfo } from "../entity/GroupInfo";
import { PriorityInfo } from "../entity/PriorityInfo";
import { PlanInfo } from "../entity/PlanInfo";
import * as jwt from "jsonwebtoken";
import { tokenVerify } from "../utils/tokenVerify";
import type { JwtPayload } from "jsonwebtoken";
import { ConfigService } from "../utils/ConfigService";

const config = ConfigService.getConfig();

export class PlanManagementController {
  private UserInfoRepository = AppDataSource.getRepository(UserInfo);
  private GroupInfoRepository = AppDataSource.getRepository(GroupInfo);
  private PriorityInfoRepository = AppDataSource.getRepository(PriorityInfo);
  private PlanInfoRepository = AppDataSource.getRepository(PlanInfo);

  async createPlan(request: Request, response: Response, next: NextFunction) {
    const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
    if (!decodeToken) {
      response.status(404).json({ message: "No permission." });
      return;
    }
    const user = await this.UserInfoRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: (decodeToken as JwtPayload).id })
      .getOne();
    const name: string = request.body.name;
    const remark: string = request.body.remark;
    const groupName: string = request.body.groupName;
    const repeatName: string = request.body.repeatName;
    const priorityName: string = request.body.priorityName;
    const startDate:  string = request.body.startDate;
    const endDate: string = request.body.endDate;
    let plan = await this.PlanInfoRepository
      .createQueryBuilder("plan")
      .leftJoinAndSelect("plan.user", "user")
      .where("plan.name = :name AND user.id = :id", { name: name , id: (decodeToken as JwtPayload).id })
      .getOne();
    if (plan){
      response.status(409).json({message: "Resource already exists."})
      return;
    }
    plan = new PlanInfo();
    plan.name = name;
    plan.remark = remark;
    plan.group = ;
   }

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
    const decodeToken = jwt.verify(request.headers.authorization.split(" ")[1], config.secretKey);
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
    const decodeToken = jwt.verify(request.headers.authorization.split(" ")[1], config.secretKey);
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
