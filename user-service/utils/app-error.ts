const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  errorStack: any;
  logError: any;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: true,
    errorStack: any,
    loggingErrorResponse: any
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = loggingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//api Specific Errors
class APIError extends AppError {
  constructor(
    name: string,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

//400
class BadRequestError extends AppError {
  constructor(description = "Bad request", loggingErrorResponse: any) {
    super(
      "NOT FOUND",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      false,
      loggingErrorResponse
    );
  }
}

//400
class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack: any) {
    super(
      "BAD REQUEST",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack
    );
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
};
