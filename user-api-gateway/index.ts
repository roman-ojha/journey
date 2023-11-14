import express from "express";
import proxy from "express-http-proxy";

const app = express();
const PORT = process.env.GATEWAY_PORT;

app.get("/", (req, res) => {
  res.json({ name: "Roman Ojha" });
});

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
