import { Router } from "express";
import AddressController from "../controller/addressController";
import amqplib from "amqplib";

export default (channel: amqplib.Channel) => {
  const router = Router();
  const controller = new AddressController(channel);

  // Get List of all district
  router.get("", controller.getAddress);

  return router;
};
