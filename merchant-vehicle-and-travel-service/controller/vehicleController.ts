import { Request, Response, NextFunction, response } from "express";
import Controller from ".";
import { STATUS_CODES } from "../data/constants";
import {
  failResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseObject";
import { gcpStoragePublicBucket } from "../config/cloudStorage";

export default class VehicleController extends Controller {
  constructor() {
    super();
    this.addVehicle = this.addVehicle.bind(this);
    this.getVehicleModels = this.getVehicleModels.bind(this);
    this.getVehicles = this.getVehicles.bind(this);
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
      if (!(await this.repository.getVehicleModels(model_id))) {
        return res.status(STATUS_CODES.VALIDATION_ERROR).json(
          validationErrorResponse({
            model_id: ["Given model of vehicle doesn't exist"],
          })
        );
      }
      // TODO: Need to check vehicle plate_no as well because it needs to be unique, But you have to thing because merchant could have added fault plate_no and that could match with other vehicle plate_no as well

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
          return res.json(
            successResponse("Successfully add new vehicle", newVehicleRes)
          );
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

  public async getVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicle_id = req.params["vehicle_id"];
      if (vehicle_id) {
        const vehicle = await this.repository.getVehicle(
          (req.user as any).id,
          vehicle_id
        );
        if (!vehicle) {
          return res
            .status(STATUS_CODES.BAD_REQUEST)
            .json(failResponse("Vehicle doesn't exist, with given detail"));
        }
        return res.json(successResponse("Successful Response", vehicle));
      }
      const vehicles = await this.repository.getListOfVehicles(
        (req.user as any).id
      );
      return res.json(successResponse("Successful Response", vehicles));
    } catch (err) {
      return next(err);
    }
  }
}
