import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import CertificateModel, { ICertificate } from "models/certificate.model";
import { validator } from "api/validator.middleware";
import APIError, { onError, onNoMatch } from "../../api/error.api";
import { connectDB } from "../../config/db";

export default nc({
  onError,
  onNoMatch,
})
  .use(validator("verify"))
  .post(verifyCertificate);

async function verifyCertificate(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  res
    .status(201)
    .json({ error: false, msg: "Certificate Uploaded Successfully" });
}
