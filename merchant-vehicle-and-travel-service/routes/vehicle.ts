import { Router } from "express";
import VehicleController from "../controller/vehicleController";
import uploadFile from "../middleware/uploadFile";
import authenticate from "../middleware/authenticate";
import amqplib from "amqplib";

export default (channel: amqplib.Channel) => {
  const router = Router();
  const controller = new VehicleController(channel);

  router.get("/model", authenticate, controller.getVehicleModels);

  // Create new vehicle
  router.post(
    "/",
    authenticate,
    uploadFile.array("images"),
    controller.addVehicle
  );

  // Create vehicle with image url
  router.post(
    "/with-imageUrl",
    authenticate,
    controller.addVehicleWithImageURL
  );

  // Get Vehicle Details
  router.get("/:vehicle_id?", authenticate, controller.getVehicles);
  return router;
};
