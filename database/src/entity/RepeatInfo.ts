import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RepeatInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true })
  name: string;

  @Column({ length: 64 })
  remark: string;
}