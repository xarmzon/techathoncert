import type { NextApiResponse } from "next";
import { rmSync } from "fs";
import { resolve } from "path";
import nc from "next-connect";
import readXlsxFile, { readSheetNames } from "read-excel-file/node";
import CertificateModel, { ICertificate } from "models/certificate.model";
import { ExtendedNextApiRequest } from "api/types";
import { uploader } from "api/upload.middleware";
import { validator } from "api/validator.middleware";
import { onError, onNoMatch } from "../../api/error.api";
import { connectDB } from "../../config/db";

export default nc({
  onError,
  onNoMatch,
})
  .use(uploader)
  .use(validator("upload"))
  .post(uploadCertificate);

async function uploadCertificate(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
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
}

export const config = {
  api: {
    bodyParser: false,
  },
};
