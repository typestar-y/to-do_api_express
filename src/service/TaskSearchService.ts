import { Service } from "typedi";
import { TasksRepository } from "../repository/TasksRepository";
import { Task } from "../entity/Task";

@Service()
export class TaskSearchService {
  private readonly tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute(): Promise<Task[]> {
    return await this.tasksRepository.findAll();
  }
}
