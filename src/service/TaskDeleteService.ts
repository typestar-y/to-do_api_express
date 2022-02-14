import { Service } from "typedi";
import { TasksRepository } from "../repository/TasksRepository";
import { TaskDeleteCommand } from "./TaskDeleteCommand";
import { TargetNotFoundError } from "../error/TargetNotFoundError";

@Service()
export class TaskDeleteService {
  private readonly tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute(command: TaskDeleteCommand): Promise<void> {
    const target = await this.tasksRepository.findById(command.targetId);
    if (target === null) {
      throw new TargetNotFoundError();
    }
    await this.tasksRepository.deleteById(command.targetId);
  }
}
