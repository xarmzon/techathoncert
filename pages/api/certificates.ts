import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import CertificateModel from "models/certificate.model";
import { onError, onNoMatch } from "../../api/error.api";
import { connectDB } from "../../config/db";

export default nc({
  onError,
  onNoMatch,
}).get(getCertificates);

async function getCertificates(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const certificatesData = await Promise.all([
    await CertificateModel.estimatedDocumentCount(),
    await CertificateModel.find({}),
  ]);

  return res.status(200).json({
    total: certificatesData[0],
    status: "success",
    error: null,
    data: certificatesData[1],
  });
}
