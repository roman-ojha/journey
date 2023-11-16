import passportJWT, { ExtractJwt, StrategyOptions } from "passport-jwt";
import { User } from "../config/prisma";
import { JWTPayload } from "../utils/userAuth";

const PUBLIC_KEY = process.env.USER_SERVICE_PUBLIC_SECRET_KEY;

const JwtStrategy = passportJWT.Strategy;

const strategyOption: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY,
  algorithms: ["RS256"],
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

export default passportStrategy;
