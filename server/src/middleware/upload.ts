import multer from "multer";

const ALLOWED_MB = 15;
const ALLOWED_MIME_TYPES = [
  "image/jpg",
  "image/webp",
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
      return cb(
        new Error(
          "Please upload an image with a compatible image type: .png, .jpeg, .jpg, .webp, .heic",
        ),
      );
    }
    cb(null, true);
  },
});
