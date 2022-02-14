import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { TaskMySQLDTO } from "./TaskMySQLDTO";
import { Task } from "../entity/Task";

@Service()
export class TasksRepository {
  @InjectRepository(TaskMySQLDTO)
  private readonly repository: Repository<TaskMySQLDTO>;

  constructor(
    @InjectRepository(TaskMySQLDTO) repository: Repository<TaskMySQLDTO>
  ) {
    this.repository = repository;
  }

  async save(target: Task): Promise<void> {
    await this.repository.save(
      new TaskMySQLDTO(
        target.id,
        target.name,
        target.due,
        target.status.toString()
      )
    );
  }

  async findAll(): Promise<Task[]> {
    return (await this.repository.find()).map((dto: TaskMySQLDTO) =>
      Task.of(dto.id, dto.name, dto.due.toString(), dto.status)
    );
  }

  async findById(targetId: string): Promise<Task | null> {
    const dto = await this.repository.findOne(targetId);
    if (dto === undefined) {
      return null;
    }
    return Task.of(dto.id, dto.name, dto.due.toString(), dto.status);
  }

  async deleteById(targetId: string): Promise<void> {
    await this.repository.delete(targetId);
  }
}
