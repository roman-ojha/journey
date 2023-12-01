import { Request, Response, NextFunction } from "express";
import Controller from ".";
import { successResponse } from "../utils/responseObject";
import { body, check } from "express-validator";

export default class TravelController extends Controller {
  constructor() {
    super();
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
      return res.json(successResponse());
    } catch (err) {
      return next(err);
    }
  }
}
