import { Request, Response, NextFunction } from "express";
import { decryptMessageWithPrivateKey } from "../utils/decrypt";

const parseUserCredential = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.headers["x-user"] == "string") {
    const decryptedUser = JSON.parse(
      decryptMessageWithPrivateKey(req.headers["x-user"])
    );
    if (decryptedUser.id && decryptedUser.email) {
      (req as any).user = decryptedUser;
    }
  }
  return next();
};

export default parseUserCredential;
