import express from "express";
import proxy from "express-http-proxy";

const app = express();
const PORT = process.env.PORT;

app.use("/api/user", proxy(process.env.USER_API_GATEWAY_URL));
app.use("/api/docs", proxy(process.env.API_DOCS_SERVICE_URL));

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
