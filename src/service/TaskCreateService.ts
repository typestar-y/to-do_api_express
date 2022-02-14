import { Service } from "typedi";
import { TaskCreateCommand } from "./TaskCreateCommand";
import { TasksRepository } from "../repository/TasksRepository";
import { Task } from "../entity/Task";

@Service()
export class TaskCreateService {
  private readonly tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute(command: TaskCreateCommand): Promise<void> {
    await this.tasksRepository.save(Task.create(command.name, command.due));
  }
}
