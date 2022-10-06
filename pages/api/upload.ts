import { connectDB } from "./../../config/db";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve, extname } from "path";
import { existsSync, mkdirSync, rmSync } from "fs";
import nc, { NextHandler } from "next-connect";
import multer, { diskStorage } from "multer";
import { MAX_UPLOAD_SIZE } from "config";
import readXlsxFile, { readSheetNames } from "read-excel-file/node";
import CertificateModel, { ICertificate } from "models/certificate.model";

interface ExtendedNextApiRequest extends NextApiRequest {
  file: Express.Multer.File;
}

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

const validator = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const size = req.file.size / (1024 * 1024);
  if (size > MAX_UPLOAD_SIZE.size) {
    return next(
      APIError.badRequest(
        `Max file size is ${MAX_UPLOAD_SIZE.size}${MAX_UPLOAD_SIZE.type}`
      )
    );
  }

  const { pass } = req.body;
  if (!pass) {
    return next(APIError.badRequest("Upload Password is required"));
  } else if (pass !== process.env.UPLOAD_PASS) {
    return next(APIError.badRequest("Invalid Upload Password"));
  }
  next();
};

const onError = (
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
};

const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).json({ error: true, msg: "Not Found" });
};

const uploadCertificate = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  await connectDB();
  const certFile = req.file;

  const sheets = await readSheetNames(certFile.path);
  const rows = await readXlsxFile(certFile.path, { sheet: sheets[1] });

  const data: ICertificate[] = [];

  rows.map((row, index) => {
    const fullName = (row[0] as string).toUpperCase();
    const track = (row[1] as string).toUpperCase();
    const dateIssued = row[2] as string;
    const menteeID =
      `TM-${fullName.split(" ")[0].slice(0, 2)}${(
        fullName.split(" ")[1] || "000000"
      ).slice(0, 2)}`.toUpperCase() + `${index + 1}`.padStart(2, "0");
    data.push({
      fullName,
      track,
      dateIssued,
      menteeID,
    });
  });

  await CertificateModel.deleteMany({});
  await CertificateModel.create(data);

  rmSync(resolve("public", "cert"), { recursive: true, force: true });
  res
    .status(201)
    .json({ error: false, msg: "Certificate Uploaded Successfully" });
};

export default nc({
  onError,
  onNoMatch,
})
  .use(uploader)
  .use(validator)
  .post(uploadCertificate);

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

export const config = {
  api: {
    bodyParser: false,
  },
};
