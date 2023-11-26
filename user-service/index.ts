import express from "express";
import router from "./routes";
import cors from "cors";
import { connect as dbConnect } from "./config/prisma";
import ErrorHandler from "./utils/errorHandler";
import parseUserCredential from "./middleware/parseUserCredential";

const app = express();

const PORT = process.env.USER_SERVICE_PORT;

const allowedDomains = [process.env.API_GATEWAY_URL];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: process.env.API_GATEWAY_SERVICE_URL,
    // optionsSuccessStatus: 200,
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
