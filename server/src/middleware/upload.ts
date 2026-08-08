import multer from "multer";
import path from "path";
import sharp from "sharp";

const ALLOWED_MB = 6;
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: ALLOWED_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});
