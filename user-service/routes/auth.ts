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

export default router;
