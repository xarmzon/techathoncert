import type { NextApiRequest, NextApiResponse } from "next";
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
  .get(getCertificates)
  .post(uploadCertificate);

async function getCertificates(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const certificatesData = await CertificateModel.find({});

  return res
    .status(200)
    .json({ data: certificatesData, status: "success", error: null });
}

async function uploadCertificate(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const certFile = req.file;
  const appendUpload: boolean | string = req.body.append || false;
  const sheets = await readSheetNames(certFile.path);
  const rows = await readXlsxFile(certFile.path, { sheet: sheets[1] });

  const data: ICertificate[] = [];

  rows.map((row, index) => {
    const fullName = (row[0] as string)
      .trim()
      .split(" ")
      .map((part) => part.trim())
      .map((part) => {
        return part[0].toUpperCase() + part.substring(1).toLowerCase();
      })
      .join(" ");
    const track = (row[1] as string).toUpperCase();
    const dateIssued = row[2] as string;
    const trainingName = row[3] as string;
    const technicalSkills = (row[4] as string).split(",").map((s) => s.trim());
    const softSkills = (row[5] as string).split(",").map((s) => s.trim());
    const menteeID =
      `TM-${fullName.split(" ")[0].slice(0, 2)}${(
        fullName.split(" ")[1] || "000000"
      ).slice(0, 2)}`.toUpperCase() + `${index + 1}`.padStart(2, "0");
    data.push({
      fullName,
      track,
      dateIssued,
      menteeID,
      softSkills,
      technicalSkills,
      trainingName,
    });
  });

  appendUpload === false ||
    (appendUpload === "false" && (await CertificateModel.deleteMany({})));
  await CertificateModel.create(data);

  let path: string[] = [];
  if (process.env.NODE_ENV === "production") {
    path.push("temp", "cert");
  } else {
    path.push("public", "cert");
  }
  rmSync(resolve(...path), { recursive: true, force: true });
  res.status(201).json({ msg: "Certificate Uploaded Successfully" });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
