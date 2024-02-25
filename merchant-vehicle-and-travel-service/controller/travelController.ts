import { Request, Response, NextFunction } from "express";
import Controller from ".";
import {
  failResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseObject";
import { body, check } from "express-validator";
import { isNativeError } from "util/types";
import { STATUS_CODES } from "../data/constants";
import { ValidationError } from "../utils/app-error";
import amqplib from "amqplib";

export default class TravelController extends Controller {
  constructor(channel: amqplib.Channel) {
    super(channel);
    this.createNewTravel = this.createNewTravel.bind(this);
  }

  public validateCreateNewTravel = [
    body("driver_no")
      .trim()
      .notEmpty()
      .withMessage("Driver No. is required")
      .isNumeric()
      .withMessage("Driver No. needs to be in number format not in string"),
    body("departure_at")
      .trim()
      .notEmpty()
      .withMessage("Departure time is required")
      .custom((value) => {
        if (isNaN(Date.parse(value))) {
          throw new Error("Departure date and time is not valid");
        }
        return value;
      }),
    body("route").trim().notEmpty().withMessage("Route field is required"),
    body("from")
      .trim()
      .notEmpty()
      .withMessage("From address field is required"),
    body("to").trim().notEmpty().withMessage("To address field is required"),
    body("vehicle_id")
      .trim()
      .notEmpty()
      .withMessage("Vehicle field is required"),
  ];

  public async createNewTravel(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { departure_at, route, driver_no, from, to, vehicle_id } = req.body;
      // Check whether from place exist or not
      if (!(await this.repository.getPlaceById(from))) {
        return res.status(STATUS_CODES.VALIDATION_ERROR).json(
          validationErrorResponse({
            from: ["Given place doesn't exist"],
          })
        );
      }
      // Check whether to place exist or not
      if (!(await this.repository.getPlaceById(to))) {
        return res.status(STATUS_CODES.VALIDATION_ERROR).json(
          validationErrorResponse({
            from: ["Given place doesn't exist"],
          })
        );
      }
      // Check whether Vehicle with the authenticate merchant id exist or not
      if (
        !(await this.repository.getVehicle((req.user as any).id, vehicle_id))
      ) {
        return res.status(STATUS_CODES.VALIDATION_ERROR).json(
          validationErrorResponse({
            vehicle_id: ["Given vehicle is not valid vehicle"],
          })
        );
      }
      // Now let's create the new travel
      const resNewTravel = await this.repository.createNewTravel(
        departure_at,
        route,
        driver_no,
        from,
        to,
        vehicle_id
      );
      if (resNewTravel) {
        return res.json(successResponse(null, resNewTravel));
      }
      return res.status(STATUS_CODES.INTERNAL_ERROR).json(failResponse());
    } catch (err) {
      return next(err);
    }
  }
}
