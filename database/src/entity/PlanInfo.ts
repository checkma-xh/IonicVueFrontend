import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";
import { GroupInfo } from "./GroupInfo";
import { PriorityInfo } from "./PriorityInfo";
import { RepeatInfo } from "./RepeatInfo";

@Entity()
export class PlanInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 256 })
  remark: string;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.plans)
  @JoinColumn({ name: 'userId' })
  user: UserInfo;

  @ManyToOne(() => GroupInfo, (groupInfo) => groupInfo.plans)
  @JoinColumn({ name: 'groupId' })
  group: GroupInfo;

  @ManyToOne(() => PriorityInfo)
  @JoinColumn({ name: 'priorityId' })
  priority: PriorityInfo;

  @ManyToOne(() => RepeatInfo)
  @JoinColumn({ name: 'repeatId' })
  repeat: RepeatInfo;

  @Column('datetime')
  startDate: Date;

  @Column('datetime')
  endDate: Date;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: false })
  deleted: boolean;
}  
