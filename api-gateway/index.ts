import express, { Request, Response, NextFunction, response } from "express";
import proxy from "express-http-proxy";
import passport from "passport";
import {
  userPasswordStrategy,
  userAuthenticate,
} from "./middleware/userAuthenticate";
import {
  merchantPassportStrategy,
  merchantAuthenticate,
} from "./middleware/merchantAuthenticate";

const app = express();
passport.use("user", userPasswordStrategy);
passport.use("merchant", merchantPassportStrategy);
app.use(passport.initialize());

const PORT = process.env.API_GATEWAY_PORT;

app.use(
  "/user",
  userAuthenticate,
  proxy(process.env.USER_SERVICE_URL as string)
);
app.use(
  "/merchant",
  merchantAuthenticate,
  proxy(process.env.MERCHANT_SERVICE_URL as string)
);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
