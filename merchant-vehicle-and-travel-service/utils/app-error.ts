import { STATUS_CODES, ERROR_TYPES } from "../data/constants";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  responseMessage: string;

  constructor(
    name: ERROR_TYPES,
    statusCode: number,
    message: any,
    responseMessage: string,
    isOperational: boolean
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.responseMessage = responseMessage;
    Error.captureStackTrace(this);
  }
}

//api Specific Errors
class APIError extends AppError {
  constructor(
    name: ERROR_TYPES,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    message = "Internal Server Error",
    responseMessage = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, message, responseMessage, isOperational);
  }
}

//400
class BadRequestError extends AppError {
  constructor(message = "Bad request", loggingErrorResponse: any) {
    super(
      "BAD_REQUEST_ERROR",
      STATUS_CODES.BAD_REQUEST,
      message,
      "Bad Request Error",
      true
    );
  }
}

//422
class ValidationError extends AppError {
  constructor(message = "Validation Error") {
    super(
      "VALIDATION_ERROR",
      STATUS_CODES.VALIDATION_ERROR,
      message,
      "Validation Error",
      true
    );
  }
}

export { AppError, APIError, BadRequestError, ValidationError };
