import {
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { TaskCreateRequest } from "./TaskCreateRequest";
import { StatusCodes } from "http-status-codes";
import { TaskCreateService } from "../service/TaskCreateService";
import { Service } from "typedi";
import { TaskDTO } from "./TaskDTO";
import { TaskSearchService } from "../service/TaskSearchService";
import { Task } from "../entity/Task";
import { TaskUpdateRequest } from "./TaskUpdateRequest";
import { TaskUpdateService } from "../service/TaskUpdateService";
import { TaskDeleteService } from "../service/TaskDeleteService";
import { TaskDeleteCommand } from "../service/TaskDeleteCommand";

@JsonController("/tasks")
@Service()
export class TaskController {
  private readonly taskCreateService: TaskCreateService;
  private readonly taskSearchService: TaskSearchService;
  private readonly taskUpdateService: TaskUpdateService;
  private readonly taskDeleteService: TaskDeleteService;

  constructor(
    taskCreateService: TaskCreateService,
    taskSearchService: TaskSearchService,
    taskUpdateService: TaskUpdateService,
    taskDeleteService: TaskDeleteService
  ) {
    this.taskCreateService = taskCreateService;
    this.taskSearchService = taskSearchService;
    this.taskUpdateService = taskUpdateService;
    this.taskDeleteService = taskDeleteService;
  }

  @OnUndefined(StatusCodes.CREATED)
  @Post()
  async create(@Body() request: TaskCreateRequest): Promise<void> {
    await this.taskCreateService.execute(request.generateTaskCreateCommand());
  }

  @Get()
  async search(): Promise<TaskDTO[]> {
    return (await this.taskSearchService.execute()).map(
      (task: Task) =>
        new TaskDTO(
          task.id,
          task.name,
          task.due.toISOString(),
          task.status.toString()
        )
    );
  }

  @OnUndefined(StatusCodes.NO_CONTENT)
  @Put("/:id")
  async update(
    @Param("id") targetId: string,
    @Body() request: TaskUpdateRequest
  ): Promise<void> {
    await this.taskUpdateService.execute(
      request.generateTaskUpdateCommand(targetId)
    );
  }

  @OnUndefined(StatusCodes.NO_CONTENT)
  @Delete("/:id")
  async delete(@Param("id") targetId: string): Promise<void> {
    await this.taskDeleteService.execute(new TaskDeleteCommand(targetId));
  }
}
