import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RepeatInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, unique: true })
  name: string;

  @Column({ length: 256 })
  remark: string;
}