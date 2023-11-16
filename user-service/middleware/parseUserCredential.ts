import { Request, Response, NextFunction } from "express";

const parseUserCredential = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: Record<string, string | number | Date | null> = {};
  user["id"] = parseInt(req.headers["x-user-id"] as string) || null;
  user["email"] = (req.headers["x-user-email"] as string) || null;
  user["number"] = parseInt(req.headers["x-user-number"] as string) || null;
  user["f_name"] = (req.headers["x-user-f_name"] as string) || null;
  user["l_name"] = (req.headers["x-user-l_name"] as string) || null;
  user["photo_url"] = (req.headers["x-user-photo_url"] as string) || null;
  user["gender"] = (req.headers["x-user-gender"] as string) || null;

  if (user.id || user.email) {
    req.user = user;
  }
  return next();
};

export default parseUserCredential;
