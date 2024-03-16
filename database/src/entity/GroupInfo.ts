import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";
import { PlanInfo } from "./PlanInfo";

@Entity()
export class GroupInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 256 })
  remark: string;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.groups)
  @JoinColumn({ name: 'userId' })
  user: UserInfo;

  @OneToMany(() => PlanInfo, (planInfo) => planInfo.group, {
    cascade: true,
  })
  plans: PlanInfo[];
}
