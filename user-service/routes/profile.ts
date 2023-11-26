import { Router } from "express";
const router = Router();
import ProfileController from "../controller/profileController";
import multer from "multer";
import path from "path";
import crypto from "crypto";

const profileController = new ProfileController();
const upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "../upload/picture"),
    filename: (req, file, cb) => {
      if (file != undefined) {
        crypto.randomBytes(16, (err, buf) => {
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          cb(null, filename);
        });
      }
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/picture",
  upload.single("picture"),
  profileController.uploadPicture
);

export default router;
