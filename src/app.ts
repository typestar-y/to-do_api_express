import "reflect-metadata";
import express, { Express } from "express";
import {
  useContainer as useRoutingControllersContainer,
  useExpressServer,
} from "routing-controllers";
import { Container as TypeormTypediExtensionsContainer } from "typeorm-typedi-extensions";
import { TaskController } from "./controller/TaskController";
import { createConnection, useContainer as useTypeormContainer } from "typeorm";
import { Container as TypediContainer } from "typedi";
import { TaskMySQLDTO } from "./repository/TaskMySQLDTO";
import helmet from "helmet";
import { ErrorHandler } from "./controller/ErrorHandler";

export const generateApp = async (): Promise<Express> => {
  const app = express();
  app.use(helmet());

  useRoutingControllersContainer(TypediContainer);
  useTypeormContainer(TypeormTypediExtensionsContainer);

  const _ENV = process.env.NODE_ENV;
  if (_ENV !== "test") {
    await createConnection({
      type: "better-sqlite3",
      database: _ENV === "development" ? ":memory:" : "db/db",
      entities: [TaskMySQLDTO],
      synchronize: true,
      logging: true,
    });
  }

  useExpressServer(app, {
    cors: true,
    controllers: [TaskController],
    defaultErrorHandler: false,
    middlewares: [ErrorHandler],
    validation: {
      forbidUnknownValues: true,
    },
  });
  return app;
};
