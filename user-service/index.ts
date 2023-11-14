import express from "express";

const app = express();
const PORT = process.env.USER_SERVICE_PORT;

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
