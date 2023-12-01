import { createLogger, transports } from "winston";
import { APIError, AppError } from "./app-error";
import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../data/constants";

const LogErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app_error.log" }),
  ],
});

class ErrorLogger {
  constructor() {}
  async logError(err: Error) {
    console.log("==================== Start Error Logger ===============");
    LogErrors.log({
      private: true,
      level: "error",
      message: `${new Date()}-${JSON.stringify({
        ...err,
        message: err.message,
      })}`,
    });
    console.log("==================== End Error Logger ===============");
    // log error with Logger plugins

    return false;
  }

  isTrustError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    } else {
      return false;
    }
  }
}

const ErrorHandler = async (
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errorLogger = new ErrorLogger();

    process.on("uncaughtException", (reason, promise) => {
      console.log(reason, "UNHANDLED");
      throw reason; // need to take care
    });

    process.on("uncaughtException", (error) => {
      errorLogger.logError(error);
      if (errorLogger.isTrustError(err)) {
        //process exist // need restart
      }
    });

    if (err) {
      await errorLogger.logError(err);
      if (err.isOperational) {
        return res
          .status(err.statusCode)
          .json({ message: err.responseMessage });
      }
      return res
        .status(STATUS_CODES.INTERNAL_ERROR)
        .json({ message: "Internal Server Error" });
    }
    return next();
  } catch (err) {
    console.log(err);
  }
};

export default ErrorHandler;
