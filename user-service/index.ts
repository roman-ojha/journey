import express from "express";
import router from "./routes";
import { connect as dbConnect } from "./config/prisma";
import ErrorHandler from "./utils/error-handler";

const app = express();
const PORT = process.env.USER_SERVICE_PORT;

app.use(express.json());
app.use(router);
app.use(ErrorHandler);

// Database Connection
dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
