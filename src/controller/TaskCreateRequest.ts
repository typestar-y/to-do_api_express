import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { TaskCreateCommand } from "../service/TaskCreateCommand";

export class TaskCreateRequest {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsDateString()
  readonly due: string;

  constructor(name: string, due: string) {
    this.name = name;
    this.due = due;
  }

  generateTaskCreateCommand(): TaskCreateCommand {
    return new TaskCreateCommand(this.name, this.due);
  }
}
