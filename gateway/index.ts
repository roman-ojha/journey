import express from "express";
import proxy from "express-http-proxy";

const app = express();
const PORT = process.env.GATEWAY_PORT;

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
