import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createValidationErrorFormat from "../utils/createValidationErrorFormat";

function checkValidationError(req: Request, res: Response, next: NextFunction) {
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    return res
      .status(406)
      .send(createValidationErrorFormat(validationErr.array() as any));
  }
  return next();
}

export default checkValidationError;
