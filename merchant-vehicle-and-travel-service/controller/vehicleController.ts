import { Request, Response, NextFunction, response } from "express";
import Controller from ".";
import { STATUS_CODES } from "../data/constants";
import {
  successResponse,
  validationErrorResponse,
} from "../utils/responseObject";
import { gcpStoragePublicBucket } from "../config/cloudStorage";

export default class VehicleController extends Controller {
  constructor() {
    super();
    this.addVehicle = this.addVehicle.bind(this);
    this.getVehicleModels = this.getVehicleModels.bind(this);
  }

  public async getVehicleModels(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      return res.json(await this.repository.getVehicleModels());
    } catch (err) {
      return next(err);
    }
  }

  public async addVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body["plate_no"]);
      const { plate_no, model_id } = req.body;
      const images = req.files;
      if (!images || images.length == 0) {
        return res.status(STATUS_CODES.VALIDATION_ERROR).json(
          validationErrorResponse({
            images: ["AtLeast one vehicle image is required"],
          })
        );
      }
      const uploadPromise = (images as []).map((image) => {
        const destination = `vehicle/${Date.now()}-${(image as any).filename}`;

        return new Promise<string>((resolve, reject) => {
          gcpStoragePublicBucket
            .upload((image as any).path, {
              destination,
              preconditionOpts: { ifGenerationMatch: 0 },
              metadata: {
                contentType: (image as any).mimetype,
              },
            })
            .then((response) => {
              resolve(response[0].name);
            })
            .catch((err) => {
              reject(err);
            });
        });
      });

      // We are waiting until all promises got resolved
      Promise.all(uploadPromise)
        .then(async (response: string[]) => {
          // Successfully uploaded files
          const newVehicleRes = await this.repository.createNewVehicle(
            (req.user as any).id,
            plate_no,
            model_id,
            response
          );
          return res.json(newVehicleRes);
        })
        .catch((err) => {
          return res
            .status(STATUS_CODES.INTERNAL_ERROR)
            .send("Something when wrong while trying to create new Vehicle.");
        });
    } catch (err) {
      return next(err);
    }
  }
}
