import { Router } from "express";
import reviewRouter from "./review";
import amqplib from "amqplib";

export default (channel: amqplib.Channel) => {
  const router = Router();
  router.use("/", reviewRouter(channel));
  return router;
};
