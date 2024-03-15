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
      constants.MERCHANT_VEHICLE_AND_TRAVEL_SERVICE_RABBIT_MQ_BINDING_KEY,
      {
        vehicle_id: "xyzabc123pqrve" + Math.floor(Math.random() * 1000000),
        travel_id: "xyzabc123pqrtravelid" + Math.floor(Math.random() * 1000000),
        // departure_at: new Date().toDateString(),
        departure_at: "2024-03-04",
        from: "Biratnagar, Sunsari",
        to: "Koteshowr, Kathmandu",
      }
    );
    return res.json({
      message: "Hello from merchant-vehicle-and-travel-service",
    });
  });
  return router;
};
