import passportJWT, { ExtractJwt, StrategyOptions } from "passport-jwt";
import { User } from "../config/prisma";
import JWTPayload from "../interface/JWTPayload";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../data/constants";
import { failResponse } from "../../utils/responseObject";

const PUBLIC_KEY = process.env.USER_SERVICE_PUBLIC_SECRET_KEY;

const JwtStrategy = passportJWT.Strategy;

const strategyOption: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY,
  algorithms: ["RS256"],
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const urlWithOutAuth = ["/auth/register", "/auth/login"];

  if (urlWithOutAuth.includes(req.url)) {
    // We don't need to do an authentication
    return next();
  }

  // Authenticate User
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err || !user) {
      // If authentication fails, respond with an unauthorized status
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json(failResponse("Unauthorized"));
    }
    req.headers["x-user-id"] = user.id;
    req.headers["x-user-email"] = user.email;
    req.headers["x-user-number"] = user.number;
    req.headers["x-user-f_name"] = user.f_name;
    req.headers["x-user-l_name"] = user.l_name;
    req.headers["x-user-photo_url"] = user.photo_url;
    req.headers["x-user-gender"] = user.gender;
    return next();
  })(req, res, next);
};

const passportStrategy = new JwtStrategy(
  strategyOption,
  async (payload: JWTPayload, done: Function) => {
    try {
      const getUser = await User.findFirst({
        where: {
          email: payload.email,
        },
        select: {
          id: true,
          email: true,
          number: true,
          f_name: true,
          l_name: true,
          photo_url: true,
          gender: true,
        },
      });
      if (!getUser) return done(null, false);
      return done(null, { ...getUser, number: Number(getUser.number) });
    } catch (err) {
      return done(null, false);
    }
  }
);

export { authenticate, passportStrategy };
