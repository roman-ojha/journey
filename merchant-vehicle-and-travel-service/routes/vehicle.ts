import { Router } from "express";
import VehicleController from "../controller/vehicleController";

const router = Router();
const controller = new VehicleController();

router.post("/add");

export default router;
