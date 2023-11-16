import { Router } from "express";
import AuthController from "../controller/authController";
import checkValidationError from "../middleware/checkValidationError";
import passport from "passport";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  authController.validateRegistration,
  checkValidationError,
  authController.registerUser
);

router.post(
  "/login",
  authController.loginValidation,
  checkValidationError,
  authController.loginUser
);

router.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  authController.checkAuth
);

export default router;
