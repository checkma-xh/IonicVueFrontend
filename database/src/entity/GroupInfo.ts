import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { UserInfo } from "./UserInfo";
import { PlanInfo } from "./PlanInfo";

@Entity()
export class GroupInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { length: 64 } )
  name: string;

  @Column( { length: 64 } )
  remark: string;

  @ManyToOne( () => UserInfo, ( userInfo ) => userInfo.groups )
  user: UserInfo;

  @OneToMany( () => PlanInfo, ( planInfo ) => planInfo.group, {
    cascade: true,
  } )
  plans: PlanInfo[];
}
