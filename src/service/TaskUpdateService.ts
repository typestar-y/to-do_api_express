import { Service } from "typedi";
import { TasksRepository } from "../repository/TasksRepository";
import { Task } from "../entity/Task";
import { TaskUpdateCommand } from "./TaskUpdateCommand";
import { TargetNotFoundError } from "../error/TargetNotFoundError";

@Service()
export class TaskUpdateService {
  private readonly tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute(command: TaskUpdateCommand): Promise<void> {
    const target = await this.tasksRepository.findById(command.targetId);
    if (target === null) {
      throw new TargetNotFoundError();
    }

    target.updateName(command.name);
    target.updateDue(command.due);
    target.updateStatus(command.status);

    await this.tasksRepository.save(
      Task.of(command.targetId, command.name, command.due, command.status)
    );
  }
}
