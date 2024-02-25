import { Router } from "express";
import vehicleRouter from "./vehicle";
import travelRouter from "./travel";
import addressRouter from "./address";
import amqplib from "amqplib";
import { publishMessage } from "../utils/rabbitMQ";
import constants from "../data/constants";

export default (channel: amqplib.Channel) => {
  const router = Router();
  router.use("/vehicle", vehicleRouter(channel));
  router.use("/travel", travelRouter(channel));
  router.use("/address", addressRouter(channel));
  router.get("/test", (req, res) => {
    publishMessage(
      channel,
      constants.USER_VEHICLE_SERVICE_RABBIT_MQ_BINDING_KEY,
      { message: "Testing RabbitMQ" }
    );
    return res.json({ message: "Testing RabbitMQ" });
  });
  return router;
};
