import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserInfo } from "./entity/UserInfo";
import { PlanInfo } from "./entity/PlanInfo";
import { GroupInfo } from "./entity/GroupInfo";
import { PriorityInfo } from "./entity/PriorityInfo";
import { RepeatInfo } from "./entity/RepeatInfo";

export const AppDataSource = new DataSource({
  type       : "sqlite",
  database   : "database.sqlite",
  synchronize: true,
  logging    : false,
  entities   : [UserInfo, PlanInfo, GroupInfo, PriorityInfo, RepeatInfo],
  migrations : [],
  subscribers: [],
  cache      : false,
});
