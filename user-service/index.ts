import express from "express";
import router from "./routes";
import { connect as dbConnect } from "./config/prisma";

const app = express();
const PORT = process.env.USER_SERVICE_PORT;

// Database Connection
dbConnect();

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
