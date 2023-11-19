import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";

const app = express();
const PORT = process.env.MAIN_PROXY_PORT;

app.use(cors());
app.use(express.json());

app.use("/api/user", proxy(process.env.USER_API_GATEWAY_URL));
app.use("/api/docs", proxy(process.env.API_DOCS_SERVICE_URL));
app.use("/api/admin", proxy(process.env.ADMIN_SERVICE_URL));
app.use(
  "/api/user/prisma-studio",
  proxy(process.env.USER_SERVICE_PRISMA_STUDIO_PORT)
);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
