import passportJWT, { ExtractJwt, StrategyOptions } from "passport-jwt";
import JWTPayload from "../interface/JWTPayload";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../data/constants";
import { failResponse } from "../../utils/responseObject";
import { IUser } from "../../models/User";
import merchantDb from "../config/merchantDb";
import { encryptMessageWithPublicKey } from "../utils/encrypt";

const SECRET_KEY = process.env.MERCHANT_SERVICE_JWT_SECRET_KEY;

const JwtStrategy = passportJWT.Strategy;

const strategyOption: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
  algorithms: ["HS256"],
};

const merchantAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const urlWithOutAuth = ["/auth/register", "/auth/login"];

  if (urlWithOutAuth.includes(req.url)) {
    // We don't need to do an authentication
    return next();
  }

  // Authenticate User
  passport.authenticate(
    "merchant",
    { session: false },
    (err: any, user: IUser | null) => {
      if (err || !user) {
        // If authentication fails, respond with an unauthorized status
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json(failResponse("Unauthorized"));
      }

      const encryptedUser = encryptMessageWithPublicKey(user);
      req.headers["x-user"] = encryptedUser;

      // req.headers["x-user-id"] = user.id.toString();
      // req.headers["x-user-email"] = user.email;
      // req.headers["x-user-number"] = user.number.toString();
      // req.headers["x-user-f_name"] = user.f_name;
      // req.headers["x-user-l_name"] = user.l_name;
      // if (user.photo_url) req.headers["x-user-photo_url"] = user.photo_url;
      // req.headers["x-user-gender"] = user.gender;
      // console.log(user);
      return next();
    }
  )(req, res, next);
};

const merchantPassportStrategy = new JwtStrategy(
  strategyOption,
  async (payload: any, done: Function) => {
    try {
      merchantDb.query(
        `SELECT id, f_name, l_name, email, number, company_name FROM merchants where id=${payload.sub}`,
        function (err, results: any, fields) {
          console.log();
          if (err) {
            console.log(err);
            // NOTE: Raise Internal Server error
          }
          const merchant = (results as Array<Object>)[0];
          if (merchant) {
            return done(null, merchant);
          }
          return done(null, false);
        }
      );
    } catch (err) {
      return done(null, false);
    }
  }
);

export { merchantAuthenticate, merchantPassportStrategy };
