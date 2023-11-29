import { Router } from "express";
import VehicleController from "../controller/vehicleController";
import uploadFile from "../middleware/uploadFile";

const router = Router();
const controller = new VehicleController();

router.post("/add", uploadFile.array("images"), controller.addVehicle);

export default router;
