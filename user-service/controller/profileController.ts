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
    this.sendUserProfile = this.sendUserProfile.bind(this);
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
      const updatedUser = await this.repository.updateUserUsingEmail(
        (req.user as IUser).email,
        {
          picture: uploadResponse[0].name,
        }
      );
      if (!updatedUser) {
        return res.status(STATUS_CODES.INTERNAL_ERROR).json(failResponse());
      }
      return res.json(
        successResponse("SuccessFully uploaded profile picture", updatedUser)
      );
    } catch (err) {
      return next(err);
    }
  }

  async getUserProfilePicture(req: Request, res: Response, next: NextFunction) {
    try {
      const filePath = req.params["0"];
      const file = await gcpStoragePublicBucket.file(filePath);
      const fileStream = file.createReadStream();
      res.set("Content-Type", "image/jpeg");
      fileStream.pipe(res);
    } catch (err) {
      return next(err);
    }
  }

  async sendUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticatedUser = req.user as IUser;
      const user = await this.repository.findFirstSecureUserUsingEmail(
        authenticatedUser.email
      );
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
}

export default ProfileController;
