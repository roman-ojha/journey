import { Router } from "express";
import VehicleController from "../controller/vehicleController";
import authenticate from "../middleware/authenticate";
import amqplib from "amqplib";

export default (channel: amqplib.Channel) => {
  const router = Router();
  const controller = new VehicleController(channel);

  // Review Vehicle
  router.post("/", authenticate, controller.reviewVehicle);

  return router;
};
