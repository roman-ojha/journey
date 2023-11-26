import { Request, Response, NextFunction } from "express";

class ProfileController {
  uploadPicture(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.file);
      return res.json(req.user);
    } catch (err) {
      return next(err);
    }
  }
}

export default ProfileController;
