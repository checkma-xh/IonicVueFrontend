import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PlanInfo } from "./PlanInfo";

@Entity()
export class RepeatInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { length: 64 } )
  name: string;

  @Column( { length: 64 } )
  remark: string;

  @OneToMany( () => PlanInfo, ( planInfo ) => planInfo.repeat, {
    cascade: true,
  } )
  plans: PlanInfo[];
}
