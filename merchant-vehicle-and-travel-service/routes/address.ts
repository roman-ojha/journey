import { Router } from "express";
import AddressController from "../controller/addressController";

const router = Router();
const controller = new AddressController();

// Get List of all district
router.get("", controller.getAddress);

export default router;
