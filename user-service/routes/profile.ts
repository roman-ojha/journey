import { Router } from "express";
const router = Router();
import ProfileController from "../controller/profileController";
import uploadFile from "../middleware/uploadFile";

const profileController = new ProfileController();
router.post(
  "/picture",
  uploadFile.single("picture"),
  profileController.uploadPicture
);

export default router;
