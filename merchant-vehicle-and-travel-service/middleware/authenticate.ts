import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../data/constants";
import { failResponse } from "../../utils/responseObject";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json(failResponse("Unauthorized"));
    }
    req.isAuthenticated = () => true;
    req.isUnauthenticated = () => false;
    return next();
  } catch (err) {
    return next(err);
  }
};

export default authenticate;

// Passport Strategy Authentication done on API Gateway
// import passportJWT, { ExtractJwt, StrategyOptions } from "passport-jwt";
// import { User } from "../config/prisma";
// import { JWTPayload } from "../utils/userAuth";

// const PUBLIC_KEY = process.env.PROJECT_PUBLIC_KEY;

// const JwtStrategy = passportJWT.Strategy;

// const strategyOption: StrategyOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: PUBLIC_KEY,
//   algorithms: ["RS256"],
// };

// const passportStrategy = new JwtStrategy(
//   strategyOption,
//   async (payload: JWTPayload, done: Function) => {
//     try {
//       const getUser = await User.findFirst({
//         where: {
//           email: payload.email,
//         },
//         select: {
//           id: true,
//           email: true,
//           number: true,
//           f_name: true,
//           l_name: true,
//           picture: true,
//           gender: true,
//         },
//       });

//       if (!getUser) return done(null, false);
//       return done(null, { ...getUser, number: Number(getUser.number) });
//     } catch (err) {
//       return done(null, false);
//     }
//   }
// );

// export default passportStrategy;
