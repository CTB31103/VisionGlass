import multer from "multer";
import path from "path";
import sharp from "sharp";

const ALLOWED_MB = 15;
const ALLOWED_MIME_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/HEIC",
];

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: ALLOWED_MB * 1024 * 1024, files: 5 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});
