import multer from "multer";
import path from "path";
import crypto from "crypto";

export default multer({
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
  // limits: { fileSize: 600 },
});
