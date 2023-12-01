import { Router } from "express";
import TravelController from "../controller/travelController";
import authenticate from "../middleware/authenticate";
import checkValidationError from "../middleware/checkValidationError";

const router = Router();
const controller = new TravelController();

// Create New Travel
router.post(
  "",
  authenticate,
  controller.validateCreateNewTravel,
  checkValidationError,
  controller.createNewTravel
);

export default router;
