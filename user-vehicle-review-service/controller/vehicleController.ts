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
      return res.json({
        status: "success",
      });
    } catch (err) {
      return next(err);
    }
  }
}
