import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from "routing-controllers";
import { Service } from "typedi";
import { ValidationError } from "class-validator";
import { ToDoAPIError } from "../error/ToDoAPIError";
import { Request, Response } from "express";
import { TargetNotFoundError } from "../error/TargetNotFoundError";
import { StatusCodes } from "http-status-codes";

@Service()
@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: ToDoAPIError | ValidationError | Error,
    request: Request,
    response: Response
  ) {
    if (error instanceof HttpError) {
      response.status(error.httpCode).send();
      if (process.env.REQUEST_VALIDATION_ERROR_LOGGING === "true") {
        console.log({
          message: error.message,
          errors:
            "errors" in error
              ? (error as Record<string, any>).errors
              : undefined,
        });
      }
      return;
    }
    if (error instanceof ValidationError) {
      response.status(StatusCodes.BAD_REQUEST).send();
      console.log(JSON.stringify(error));
      return;
    }
    if (ErrorHandler.isJSONParseError(error)) {
      response.status(StatusCodes.BAD_REQUEST).send();
      console.log(JSON.stringify(error));
      return;
    }
    if (error instanceof TargetNotFoundError) {
      response.status(StatusCodes.NOT_FOUND).send();
      console.log("TargetNotFoundError");
      return;
    }
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    console.log(JSON.stringify(error));
  }

  private static isJSONParseError(error: Error | JSONParseError): boolean {
    if (!("type" in error)) {
      return false;
    }
    return error.type === "entity.parse.failed";
  }
}

declare interface JSONParseError extends SyntaxError {
  message: string;
  stack: string;
  type: string;
  body: string;
  status: number;
  statusCode: number;
  expose: boolean;
}
