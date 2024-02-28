import { Router } from "express";
import vehicleRouter from "./vehicle";
import travelRouter from "./travel";
import addressRouter from "./address";
import amqplib from "amqplib";
import constants from "../data/constants";
import { publishMessage } from "../utils/rabbitMQ";

export default (channel: amqplib.Channel) => {
  const router = Router();
  router.use("/vehicle", vehicleRouter(channel));
  router.use("/travel", travelRouter(channel));
  router.use("/address", addressRouter(channel));
  router.get("/", (req, res) => {
    publishMessage(
      channel,
      constants.USER_VEHICLE_SERVICE_RABBIT_MQ_BINDING_KEY,
      {
        vehicle_id: "roman test vehicle id",
        travel_id: "roman test travel id",
        departure_at: new Date().toDateString(),
        from: "travel from",
        to: "travel to",
      }
    );
    return res.json({
      message: "Hello from merchant-vehicle-and-travel-service",
    });
  });
  return router;
};
