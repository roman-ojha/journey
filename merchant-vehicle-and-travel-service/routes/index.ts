import { Router } from "express";
import vehicleRouter from "./vehicle";
import travelRouter from "./travel";
import addressRouter from "./address";

const router = Router();

router.use("/vehicle", vehicleRouter);
router.use("/travel", travelRouter);
router.use("/address", addressRouter);

export default router;
