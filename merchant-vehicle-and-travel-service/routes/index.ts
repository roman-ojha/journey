import { Router } from "express";
import vehicleRouter from "./vehicle";
import travelRouter from "./travel";

const router = Router();

router.use("/vehicle", vehicleRouter);
router.use("/travel", travelRouter);

export default router;
