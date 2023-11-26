import { Request, Response, NextFunction } from "express";
import { gcpStoragePublicBucket } from "../config/cloudStorage";
import { STATUS_CODES } from "../../data/constants";
import { validationErrorResponse } from "../../utils/responseObject";

class ProfileController {
  async uploadPicture(req: Request, res: Response, next: NextFunction) {
    try {
      // Upload file to Google Storage
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
      console.log(uploadResponse);
      console.log(
        `https://storage.cloud.google.com/roman-journey-public-bucket-dev/user/cad46661b6980e85ebf28b8ce5b72659.png?authuser=1`
      );
      return res.json(req.user);
    } catch (err) {
      return next(err);
    }
  }
}

export default ProfileController;
