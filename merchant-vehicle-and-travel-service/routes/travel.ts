import { Router } from "express";
import TravelController from "../controller/travelController";

const router = Router();
const controller = new TravelController();

// Create New Travel
router.post("/", controller.createNewTravel);

export default router;
