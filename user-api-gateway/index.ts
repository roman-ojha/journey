import express, { Request, Response, NextFunction } from "express";
import proxy from "express-http-proxy";
import passport from "passport";
import passportStrategy from "./middleware/authentication";

const app = express();
passport.use(passportStrategy);
app.use(passport.initialize());

const PORT = process.env.USER_GATEWAY_PORT;

app.use(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    const urlWithOutAuth = ["/auth/register", "/auth/login"];
    console.log(req.url);
    if (urlWithOutAuth.includes(req.url)) {
      // console.log("Includes");
      // We don't need to do an authentication
      return next();
    }
    console.log("Not Includes");
    // Authenticate User
    passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
      // console.log(user);
      if (err || !user) {
        // If authentication fails, respond with an unauthorized status
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      return next();
    })(req, res, next);
  },
  proxy(process.env.USER_SERVICE_URL as string)
);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
