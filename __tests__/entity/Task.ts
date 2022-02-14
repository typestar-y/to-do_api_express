import { Task } from "../../src/entity/Task";
import { v4 as uuidV4 } from "uuid";

jest.mock("uuid");

describe("create", () => {
  test("正常系", () => {
    const expectedId = "taskId123";
    const expectedName = "タスクあいう";
    const expectedDue = "2022-02-18T12:00:00Z";
    const expectedDueDate = new Date(expectedDue);

    (uuidV4 as jest.Mock).mockReturnValue(expectedId);

    const task = Task.create(expectedName, expectedDue);
    expect(task.id).toBe(expectedId);
    expect(task.name).toBe(expectedName);
    expect(task.due).toStrictEqual(expectedDueDate);
  });
});
