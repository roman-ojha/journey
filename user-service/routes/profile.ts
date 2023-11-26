import { Router } from "express";
const router = Router();
import ProfileController from "../controller/profileController";
import uploadFile from "../middleware/uploadFile";
import authenticate from "../middleware/authenticate";

const profileController = new ProfileController();
router.post(
  "/picture",
  authenticate,
  uploadFile.single("picture"),
  profileController.uploadPicture
);

router.get("/picture/*", profileController.getUserProfilePicture);

router.get("", authenticate, profileController.sendUserProfile);

export default router;
