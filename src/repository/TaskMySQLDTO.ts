import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
export class TaskMySQLDTO {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  due: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  readonly created?: Date;

  @UpdateDateColumn()
  readonly updated?: Date;

  constructor(id: string, name: string, due: Date, status: string) {
    this.id = id;
    this.name = name;
    this.due = due;
    this.status = status;
  }
}
