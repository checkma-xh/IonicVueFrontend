import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PlanInfo } from "./PlanInfo";
import { GroupInfo } from "./GroupInfo";
import { ConfigService } from "../utils/ConfigService";

const config = ConfigService.getConfig();

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, unique: true })
  email: string;

  @Column({ length: 256 })
  password: string;

  @Column({ type: "text", default: config.defaultAvatar })
  avatar: string;

  @Column({ default: true })
  activated: boolean;

  @OneToMany(() => PlanInfo, (planInfo) => planInfo.user, {
    cascade: true,
  })
  plans: PlanInfo[];

  @OneToMany(() => GroupInfo, (groupInfo) => groupInfo.user, {
    cascade: true,
  })
  groups: GroupInfo[];
}