import { Request, Response, NextFunction } from "express";
import { gcpStoragePublicBucket } from "../config/cloudStorage";
import { STATUS_CODES } from "../../data/constants";
import {
  failResponse,
  successResponse,
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
      const uploadResponse = await gcpStoragePublicBucket.upload(file.path, {
        // https://github.com/googleapis/nodejs-storage/blob/main/samples/uploadFile.js
        destination: `user/${file.filename}`,
        preconditionOpts: { ifGenerationMatch: 0 },
      });
      if (!uploadResponse) {
        return res.status(STATUS_CODES.INTERNAL_ERROR).json(failResponse());
      }
      const updateUser = await this.db.user().update({
        where: { email: (req.user as IUser).email },
        data: {
          picture: uploadResponse[0].name,
        },
      });
      const updatedUser = await this.repository.updateUserUsingEmail(
        (req.user as IUser).email,
        {
          picture: uploadResponse[0].name,
        }
      );
      return res.json(successResponse("SuccessFully uploaded profile picture"));
    } catch (err) {
      return next(err);
    }
  }
}

export default ProfileController;