import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { MAX_UPLOAD_SIZE } from "config";
import APIError from "./error.api";
import { extname } from "path";

const storage = diskStorage({
  destination: function (req, file, cb) {
    if (!existsSync("public/cert")) {
      mkdirSync("public/cert");
    }
    cb(null, "public/cert");
  },
  filename: function (req, file, cb) {
    const suffix = Date.now().toString(16);
    cb(null, file.fieldname + "_" + suffix + extname(file.originalname));
  },
});

export const uploader = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const size = file.size / (1024 * 1024);
    if (size > MAX_UPLOAD_SIZE.size) {
      cb(
        APIError.badRequest(
          `Max file size is ${MAX_UPLOAD_SIZE.size}${MAX_UPLOAD_SIZE.type}`
        )
      );
    } else if (!extname(file.originalname).includes("xlsx")) {
      cb(APIError.badRequest("Only Excel file is allowed"));
    } else {
      cb(null, true);
    }
  },
}).single("cert");
