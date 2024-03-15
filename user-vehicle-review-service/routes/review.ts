import { Router } from "express";
import ReviewController from "../controller/reviewController";
import authenticate from "../middleware/authenticate";
import amqplib from "amqplib";
import checkValidationError from "../middleware/checkValidationError";
import constants from "../data/constants";
import { publishMessage } from "../utils/rabbitMQ";

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

  router.get("/test", (req, res) => {
    publishMessage(
      channel,
      constants.USER_VEHICLE_REVIEW_SERVICE_RABBIT_MQ_BINDING_KEY,
      {
        review_id: "xyzabc",
      }
    );
    res.json({ msg: "send review" });
  });

  return router;
};
