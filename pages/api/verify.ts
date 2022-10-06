import type { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";
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

async function verifyCertificate(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  await connectDB();
  const { menteeID }: { menteeID: string } = req.body;
  const certificate = await CertificateModel.findOne({
    menteeID: menteeID.toUpperCase(),
  });
  if (!certificate) {
    return next(APIError.custom(`No certificate found for ${menteeID}`, 404));
  }
  res
    .status(200)
    .json({ msg: "Certificate Fetched Successfully", certificate });
}
