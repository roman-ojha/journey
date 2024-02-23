import express from "express";
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
import cors from "cors";

const app = express();
passport.use("user", userPasswordStrategy);
passport.use("merchant", merchantPassportStrategy);

app.use(
  cors({
    origin: [process.env.USER_CLIENT_URL as string],
    credentials: true,
  })
);

app.use((req, res, next) => {
  // Decrypt POST, PATCH, PUT, DELETE Request body which is coming from actual user client like React
  // And Not decrypt the body that is coming from swagger cause it hasn't been encrypted
  if (req.header("x-swagger-token") !== process.env.SWAGGER_AUTH_TOKEN) {
    console.log("Request isn't from swagger");
    // Decrypt request body here
  }
  console.log("Request is from swagger");
  return next();
});

app.use(passport.initialize());

const PORT = process.env.API_GATEWAY_PORT;

app.use(
  "/api/user/booking/",
  userAuthenticate,
  proxy(process.env.USER_VEHICLE_BOOKING_SERVICE_URL as string, {
    parseReqBody: false,
  })
);

app.use(
  "/api/user",
  userAuthenticate,
  proxy(process.env.USER_SERVICE_URL as string, { parseReqBody: false }) // don't parse the request body which will effect on uploading the file 'multipart/form-data'
);

app.use(
  "/api/merchant/v-and-t-service",
  merchantAuthenticate,
  proxy(process.env.MERCHANT_V_AND_T_SERVICE_URL as string, {
    parseReqBody: false,
  })
);

app.use(
  "/api/merchant",
  merchantAuthenticate,
  proxy(process.env.MERCHANT_SERVICE_URL as string, { parseReqBody: false })
);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
