import { Router } from "express";
import vehicleRouter from "./vehicle";
import travelRouter from "./travel";
import addressRouter from "./address";
import amqplib from "amqplib";
import { Express } from "express";

export default (channel: amqplib.Channel) => {
  const router = Router();
  router.use("/vehicle", vehicleRouter(channel));
  router.use("/travel", travelRouter(channel));
  router.use("/address", addressRouter(channel));
  return router;
};
