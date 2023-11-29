import express from "express";
import { connect as dbConnect, prisma } from "./config/database";
import router from "./routes";

const app = express();
const PORT = process.env.MERCHANT_V_AND_T_SERVICE_PORT as string;

// Database connection
dbConnect();

app.use(router);

// Run server
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
