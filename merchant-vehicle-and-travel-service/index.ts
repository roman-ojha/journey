import express from "express";
import { connect as dbConnect } from "./config/database";

const app = express();
const PORT = process.env.MERCHANT_V_AND_T_SERVICE_PORT as string;

// Database connection
dbConnect();

// Run server
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
