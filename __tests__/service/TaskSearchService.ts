import { TaskSearchService } from "../../src/service/TaskSearchService";
import { Task } from "../../src/entity/Task";
import { TasksRepository } from "../../src/repository/TasksRepository";

describe("execute", () => {
  test("正常系", async () => {
    const task = Task.of(
      "taskId123",
      "タスク名あいう",
      "2022-02-19T03:00:00",
      "Doing"
    );

    const taskFindAllMock = jest.fn().mockResolvedValue([task]);
    const tasksRepositoryMock = {
      findAll: taskFindAllMock,
    } as unknown as TasksRepository;

    const result = await new TaskSearchService(tasksRepositoryMock).execute();
    expect(result).toStrictEqual([task]);
    expect(taskFindAllMock.mock.calls).toHaveLength(1);
    expect(taskFindAllMock.mock.calls[0][0]).toBeUndefined();
  });
});
