import { IsDateString, IsNotEmpty, IsString, Matches } from "class-validator";
import { TaskUpdateCommand } from "../service/TaskUpdateCommand";

export class TaskUpdateRequest {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsDateString()
  readonly due: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(Todo)|(Doing)|(Done)$/)
  readonly status: string;

  constructor(name: string, due: string, status: string) {
    this.name = name;
    this.due = due;
    this.status = status;
  }

  generateTaskUpdateCommand(targetId: string): TaskUpdateCommand {
    return new TaskUpdateCommand(targetId, this.name, this.due, this.status);
  }
}
