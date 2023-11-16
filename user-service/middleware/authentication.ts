import fs from "fs";
import path from "path";
import passport from "passport";
import passportJWT, { ExtractJwt, StrategyOptions } from "passport-jwt";
import { User } from "../config/prisma";

const PUBLIC_KEY = process.env.USER_SERVICE_PUBLIC_SECRET_KEY;
const PRIVATE_KEY = process.env.USER_SERVICE_PRIVATE_SECRET_KEY;

const JwtStrategy = passportJWT.Strategy;

const strategyOption: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY,
  algorithms: ["RSA256"],
};

const passportStrategy = new JwtStrategy(
  strategyOption,
  (payload: Object, done: Function) => {
    console.log(payload);
    return done(null, { msg: "success" });
  }
);
