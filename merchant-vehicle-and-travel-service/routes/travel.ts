import { Router } from "express";
import TravelController from "../controller/travelController";

const router = Router();
const controller = new TravelController();

export default router;
