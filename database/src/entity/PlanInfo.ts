import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";
import { GroupInfo } from "./GroupInfo";
import { PriorityInfo } from "./PriorityInfo";
import { RepeatInfo } from "./RepeatInfo";

@Entity()
export class PlanInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 64 })
  remark: string;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.plans)
  user: UserInfo;

  @ManyToOne(() => GroupInfo, (groupInfo) => groupInfo.plans)
  group: GroupInfo;

  @ManyToOne(() => PriorityInfo, (priorityInfo) => priorityInfo.plans)
  priority: PriorityInfo;

  @ManyToOne(() => RepeatInfo, (repeatInfo) => repeatInfo.plans)
  repeat: RepeatInfo;

  @CreateDateColumn()
  startDate: Date;

  @UpdateDateColumn()
  endDate: Date;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: false })
  deleted: boolean;
}
