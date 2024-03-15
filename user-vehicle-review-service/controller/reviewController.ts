import { Request, Response, NextFunction, response } from "express";
import Controller from ".";
import { STATUS_CODES } from "../data/constants";
import {
  failResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responseObject";
import amqplib from "amqplib";
import { body, check } from "express-validator";
import constants from "../data/constants";
import { publishMessage } from "../utils/rabbitMQ";

export default class ReviewController extends Controller {
  constructor(channel: amqplib.Channel) {
    super(channel);
    this.reviewVehicle = this.reviewVehicle.bind(this);
    this.getVehicleReviewDoneByAuthUser =
      this.getVehicleReviewDoneByAuthUser.bind(this);
  }

  validateReviewVehicle = [
    check("vehicle_id").notEmpty().withMessage("Vehicle id is required"),
    check("rating")
      .isNumeric()
      .withMessage("Rating should be a number")
      .notEmpty()
      .withMessage("Rating is required")
      .custom(async (value) => {
        const rating = parseInt(value);
        if (
          rating !== 1 &&
          rating !== 2 &&
          rating !== 3 &&
          rating !== 4 &&
          rating !== 5
        ) {
          throw Error("Rating should be between 1 to 5");
        }
        return rating;
      }),
    check("review")
      .trim()
      .notEmpty()
      .withMessage("Review is required")
      .isString()
      .withMessage("Review should be a string")
      .isLength({ min: 5, max: 500 })
      .withMessage("Review should be between 5 to 500 characters"),
  ];

  public async reviewVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { vehicle_id, rating, review } = req.body;
      const user_id = (req.user as any).id;
      const resVehicle = await this.repository.getVehicleById(vehicle_id);
      if (!resVehicle) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json(failResponse("Given vehicle not found"));
      }
      const resReview = await this.repository.reviewVehicle(
        vehicle_id,
        parseInt(rating),
        review,
        user_id
      );
      if (!resReview) {
        return res.json(successResponse("Review added successfully", null));
      }
      publishMessage(
        this.rabbitMQChannel,
        constants.USER_VEHICLE_REVIEW_SERVICE_RABBIT_MQ_BINDING_KEY,
        {
          id: resReview.id,
          vehicle_id: resReview.vehicle_id,
          user_id: resReview.user_id,
          rating: resReview.rating,
        }
      );
      return res.json(successResponse("Review added successfully", resReview));
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
        return res.json(successResponse("Unauthorized User"));
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
