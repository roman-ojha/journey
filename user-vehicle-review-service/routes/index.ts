import { Router } from "express";
import reviewRouter from "./review";
import amqplib from "amqplib";

export default (channel: amqplib.Channel) => {
  const router = Router();
  router.use("/review", reviewRouter(channel));
  return router;
};
