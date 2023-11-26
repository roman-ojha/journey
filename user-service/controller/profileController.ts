import { Request, Response, NextFunction } from "express";
import { gcpStoragePublicBucket } from "../config/cloudStorage";
import { STATUS_CODES } from "../../data/constants";
import {
  failResponse,
  validationErrorResponse,
} from "../../utils/responseObject";
import Controller from "./index";
import { IUser } from "../../models/User";

class ProfileController extends Controller {
  constructor() {
    super();
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  async uploadPicture(req: Request, res: Response, next: NextFunction) {
    try {
      // Upload file to Google Storage
      if (!req.user) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json(failResponse("Unauthorized User"));
      }
      const file = req.file;
      if (!file) {
        return res.status(STATUS_CODES.VALIDATION_ERROR).json(
          validationErrorResponse({
            picture: ["Please upload the file first"],
          })
        );
      }
      // const uploadResponse = await gcpStoragePublicBucket.upload(file.path, {
      //   // https://github.com/googleapis/nodejs-storage/blob/main/samples/uploadFile.js
      //   destination: `user/${file.filename}`,
      //   preconditionOpts: { ifGenerationMatch: 0 },
      // });
      // console.log(uploadResponse);
      // console.log(
      //   `https://storage.cloud.google.com/roman-journey-public-bucket-dev/user/cad46661b6980e85ebf28b8ce5b72659.png?authuser=1`
      // );
      const updateUserPicture = await this.db.user().findFirst({
        where: { email: (req.user as IUser).email },
      });
      console.log(updateUserPicture);
      return res.json(req.user);
    } catch (err) {
      return next(err);
    }
  }
}

export default ProfileController;
