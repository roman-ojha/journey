import { STATUS_CODES, ERROR_TYPES } from "../../data/constants";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  // errorStack: any;
  // logError: any;

  constructor(
    name: ERROR_TYPES,
    statusCode: number,
    message: any,
    isOperational: boolean
    // errorStack: any,
    // loggingErrorResponse: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    // this.errorStack = errorStack;
    // this.logError = loggingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//api Specific Errors
class APIError extends AppError {
  constructor(
    name: ERROR_TYPES,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    message = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, message, isOperational);
  }
}

//400
// class BadRequestError extends AppError {
//   constructor(message = "Bad request", loggingErrorResponse: any) {
//     super(
//       "NOT FOUND",
//       STATUS_CODES.BAD_REQUEST,
//       message,
//       true,
//       false,
//       loggingErrorResponse
//     );
//   }
// }

//400
// class ValidationError extends AppError {
//   constructor(message = "Validation Error") {
//     super("BAD REQUEST", STATUS_CODES.BAD_REQUEST, message, true);
//   }
// }

export { AppError, APIError };
