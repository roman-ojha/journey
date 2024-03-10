import { Router } from "express";
import ReviewController from "../controller/reviewController";
import authenticate from "../middleware/authenticate";
import amqplib from "amqplib";
import checkValidationError from "../middleware/checkValidationError";

export default (channel: amqplib.Channel) => {
  const router = Router();
  const controller = new ReviewController(channel);

  // Review Vehicle
  router.post(
    "/",
    authenticate,
    controller.validateReviewVehicle,
    checkValidationError,
    controller.reviewVehicle
  );

  // Get Vehicle Review done by auth user
  router.get(
    "/by-auth-user/:vehicle_id",
    controller.getVehicleReviewDoneByAuthUser
  );

  return router;
};
