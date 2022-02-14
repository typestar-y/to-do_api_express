import { Connection, createConnection } from "typeorm";
import supertest from "supertest";
import { generateApp } from "../../src/app";
import { TaskMySQLDTO } from "../../src/repository/TaskMySQLDTO";
import { TaskSearchService } from "../../src/service/TaskSearchService";
import { Task } from "../../src/entity/Task";
import { StatusCodes } from "http-status-codes";

describe("search", () => {
  let request: supertest.SuperTest<supertest.Test>;
  let connection: Connection;

  beforeAll(async () => {
    request = supertest(await generateApp());
    connection = await createConnection({
      type: "better-sqlite3",
      database: ":memory:",
      entities: [TaskMySQLDTO],
      synchronize: true,
    }).catch((error: Error) => {
      throw error;
    });
  });
  beforeEach(async () => {
    if (!connection.isConnected) {
      await connection.connect();
    }
  });
  afterEach(async () => {
    await connection.close();
  });

  test("正常系", async () => {
    const expectedTask1Id = "id123";
    const expectedTask1Name = "タスク名あいう";
    const expectedTask1Due = "2022-02-19T12:00:00+09:00";
    const expectedTask1DueUTC = "2022-02-19T03:00:00.000Z";
    const expectedTask1Status = "Doing";
    const expectedTask2Id = "id456";
    const expectedTask2Name = "タスク名かきく";
    const expectedTask2Due = "2022-02-20T12:00:00+09:00";
    const expectedTask2DueUTC = "2022-02-20T03:00:00.000Z";
    const expectedTask2Status = "Todo";

    const expectedTask1 = Task.of(
      expectedTask1Id,
      expectedTask1Name,
      expectedTask1Due,
      expectedTask1Status
    );
    const expectedTask2 = Task.of(
      expectedTask2Id,
      expectedTask2Name,
      expectedTask2Due,
      expectedTask2Status
    );
    jest
      .spyOn(TaskSearchService.prototype, "execute")
      .mockResolvedValue([expectedTask1, expectedTask2]);

    const response = await request.get("/tasks").send().expect(StatusCodes.OK);
    expect(response.body).toStrictEqual([
      {
        id: expectedTask1Id,
        name: expectedTask1Name,
        due: expectedTask1DueUTC,
        status: expectedTask1Status,
      },
      {
        id: expectedTask2Id,
        name: expectedTask2Name,
        due: expectedTask2DueUTC,
        status: expectedTask2Status,
      },
    ]);
  });
});
