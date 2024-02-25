import { Router } from "express";
import TravelController from "../controller/travelController";
import authenticate from "../middleware/authenticate";
import checkValidationError from "../middleware/checkValidationError";
import amqplib from "amqplib";

export default (channel: amqplib.Channel) => {
  const router = Router();
  const controller = new TravelController(channel);

  // Create New Travel
  router.post(
    "",
    authenticate,
    controller.validateCreateNewTravel,
    checkValidationError,
    controller.createNewTravel
  );
  return router;
};
