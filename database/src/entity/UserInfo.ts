import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PlanInfo } from "./PlanInfo";
import { GroupInfo } from "./GroupInfo";

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true })
  email: string;

  @Column({ length: 256 })
  passwordHash: string;

  @Column({ length: 64 })
  avatarUrl: string;

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