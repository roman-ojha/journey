import { Router } from "express";
import AuthController from "../controller/authController";
import { check } from "express-validator";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  authController.validateRegistration,
  authController.registerUser as any
);

export default router;
