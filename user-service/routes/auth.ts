import { Router } from "express";
import AuthController from "../controller/authController";
import checkValidationError from "../middleware/checkValidationError";

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

router.post("/logout", authController.logoutUser);

export default router;
