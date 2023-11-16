import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { createValidationErrorFromExpressValidator } from "../utils/createResponseObject";
import { STATUS_CODES } from "../data/constants";

function checkValidationError(req: Request, res: Response, next: NextFunction) {
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    return res
      .status(STATUS_CODES.VALIDATION_ERROR)
      .send(
        createValidationErrorFromExpressValidator(validationErr.array() as any)
      );
  }
  return next();
}

export default checkValidationError;
