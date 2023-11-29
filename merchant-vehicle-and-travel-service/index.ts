import express from "express";
import { connect as dbConnect, prisma } from "./config/database";
import router from "./routes";
import ErrorHandler from "./utils/errorHandler";
import parseUserCredential from "./middleware/parseUserCredential";

const app = express();
const PORT = process.env.MERCHANT_V_AND_T_SERVICE_PORT as string;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnect();

app.use(parseUserCredential);
app.use(router);
app.use(ErrorHandler);

// Run server
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
