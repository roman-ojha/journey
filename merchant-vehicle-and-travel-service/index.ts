import express from "express";
import { connect as dbConnect, prisma } from "./config/database";
import router from "./routes";
import ErrorHandler from "./utils/errorHandler";
import parseUserCredential from "./middleware/parseUserCredential";
import { createChannel } from "./config/rabbitMQ";
import cors from "cors";

(async () => {
  const app = express();
  const PORT = process.env.MERCHANT_V_AND_T_SERVICE_PORT as string;

  // const ALLOWED_ORIGINS = [];
  const ALLOWED_ORIGINS = "*"; // NOTE: This is for testing purposes only. In production, you should use the above line instead.

  app.use(
    cors({
      origin: ALLOWED_ORIGINS,
      credentials: true,
    })
  );

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
