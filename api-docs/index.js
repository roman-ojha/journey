import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 8080;
const app = express();
const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const __dirname = dirname(currentFilePath);

// Step 3: Load Swagger YAML File
const swaggerDocument = YAML.load(path.join(__dirname, "docs.yaml"));

// Step 4: Configure Swagger UI Middleware
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
