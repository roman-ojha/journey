import express from "express";
import proxy from "express-http-proxy";

const app = express();
const PORT = process.env.USER_GATEWAY_PORT;

app.use("/", proxy(process.env.USER_SERVICE_URL as string));

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
