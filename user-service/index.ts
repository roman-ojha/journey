import express from "express";
import router from "./routes";
import cors from "cors";
import { connect as dbConnect } from "./config/prisma";
import ErrorHandler from "./utils/errorHandler";

const app = express();

const PORT = process.env.USER_SERVICE_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.use(ErrorHandler);

// Database Connection
dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
