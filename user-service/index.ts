import express from "express";
import router from "./routes";
import cors from "cors";
import { connect as dbConnect } from "./config/prisma";
import ErrorHandler from "./utils/errorHandler";
import parseUserCredential from "./middleware/parseUserCredential";

const app = express();

const PORT = process.env.USER_SERVICE_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ALLOWED_ORIGINS = [
  process.env.USER_CLIENT_URL as string,
  process.env.API_GATEWAY_URL as string,
];
// const ALLOWED_ORIGINS = "*"; // NOTE: This is for testing purposes only. In production, you should use the above line instead.

app.use(
  cors({
    // origin: process.env.API_GATEWAY_SERVICE_URL,
    // optionsSuccessStatus: 200,
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);
app.use(parseUserCredential);
app.use(router);
app.use(ErrorHandler);

// Database Connection
dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
