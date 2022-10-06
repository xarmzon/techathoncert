// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve, extname } from "path";
import { existsSync, mkdirSync } from "fs";
import nc, { NextHandler } from "next-connect";
import multer, { diskStorage } from "multer";
import { MAX_UPLOAD_SIZE } from "config";

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

const uploader = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
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
  limits: {
    fileSize: 1024 * 1024,
  },
});

const certFileMiddleware = uploader.single("cert");

export default nc({
  onError: (
    err: Error,
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    if (err instanceof APIError) {
      res.status(err.status || 500).json({
        error: true,
        msg: err.message,
      });
    } else {
      console.log(err);
      res.status(500).json({
        error: true,
        msg: "An unknown error occurred. Please try again later",
      });
    }
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ error: true, msg: "Not Found" });
  },
})
  .use(certFileMiddleware)
  .use(async (req, res, next) => {
    const { pass } = req.body;
    console.log("Password: ", pass);
    if (!pass) {
      return next(APIError.badRequest("Upload Password is required"));
    } else if (pass !== process.env.UPLOAD_PASS) {
      return next(APIError.badRequest("Invalid Upload Password"));
    }
    next();
  })
  .post(async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    console.log(req.headers);
    res
      .status(201)
      .json({ error: false, msg: "Certificate Uploaded Successfully" });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

class APIError extends Error {
  status: number;
  constructor(msg = "Unknown Error Occurred", status = 500) {
    super(msg);
    this.status = status;
  }
  static badRequest(msg = "Bad Request", status = 400) {
    return new this(msg, status);
  }
  static unauthorized(msg = "No Access", status = 401) {
    return new this(msg, status);
  }
  static custom(msg: string, status: number) {
    return new this(msg, status);
  }
}
