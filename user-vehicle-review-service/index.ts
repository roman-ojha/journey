import express from "express";
import { connect as dbConnect, prisma } from "./config/database";
import router from "./routes";
import ErrorHandler from "./utils/errorHandler";
import parseUserCredential from "./middleware/parseUserCredential";
import { createChannel } from "./config/rabbitMQ";

(async () => {
  const app = express();
  const PORT = process.env.USER_VEHICLE_REVIEW_SERVICE_PORT as string;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Database connection
  dbConnect();

  // RabbitMQ connection
  const channel = await createChannel();

  app.use(parseUserCredential);
  app.use(router(channel));
  app.use(ErrorHandler);

  // Run server
  app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
  });
})();
