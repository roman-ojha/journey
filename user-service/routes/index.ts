import { Router } from "express";
import authRouter from "./auth";
import profileRouter from "./profile";

const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);

export default router;
