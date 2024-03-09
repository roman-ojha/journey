import { Request, Response, NextFunction, response } from "express";
import Controller from ".";
import { STATUS_CODES } from "../data/constants";
import {
  failResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseObject";
import amqplib from "amqplib";

export default class VehicleController extends Controller {
  constructor(channel: amqplib.Channel) {
    super(channel);
    this.reviewVehicle = this.reviewVehicle.bind(this);
    this.getVehicleReviewDoneByAuthUser =
      this.getVehicleReviewDoneByAuthUser.bind(this);
  }

  public async reviewVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({});
    } catch (err) {
      return next(err);
    }
  }

  public async getVehicleReviewDoneByAuthUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json(failResponse("Unauthorized User"));
      }
      const user_id = (req.user as any).id;
      const vehicle_id = req.params.vehicle_id;
      const resVehicle =
        await this.repository.merchantVAndTClient.vehicles.findFirst({
          where: {
            id: vehicle_id,
          },
        });
      if (!resVehicle) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json(failResponse("Given vehicle not found"));
      }
      const review = await this.repository.getVehicleReviewDoneByAuthUser(
        user_id,
        vehicle_id
      );
      return res.json(successResponse("Successful response", review));
    } catch (err) {
      return next(err);
    }
  }
}
