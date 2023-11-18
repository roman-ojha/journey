import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const PORT = process.env.API_DOCS_SERVICE_PORT;
const app = express();
const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const __dirname = dirname(currentFilePath);

// Load Swagger YAML File
const swaggerDocument = YAML.load(path.join(__dirname, "docs.yml"));

// Configure Swagger UI Middleware
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
