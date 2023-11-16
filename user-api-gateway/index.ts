import express, { Request, Response, NextFunction, response } from "express";
import proxy from "express-http-proxy";
import passport from "passport";
import { passportStrategy, authenticate } from "./middleware/authentication";

const app = express();
passport.use(passportStrategy);
app.use(passport.initialize());

const PORT = process.env.USER_GATEWAY_PORT;

app.use("/", authenticate, proxy(process.env.USER_SERVICE_URL as string));

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
