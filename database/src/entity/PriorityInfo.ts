import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PriorityInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, unique: true })
  name: string;

  @Column({ length: 256 })
  remark: string;
}
