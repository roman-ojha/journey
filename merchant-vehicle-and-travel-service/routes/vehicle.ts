import { Router } from "express";
import VehicleController from "../controller/vehicleController";
import uploadFile from "../middleware/uploadFile";
import authenticate from "../middleware/authenticate";

const router = Router();
const controller = new VehicleController();

router.get("/model", authenticate, controller.getVehicleModels);
router.post(
  "/add",
  authenticate,
  uploadFile.array("images"),
  controller.addVehicle
);

export default router;
