import { NextApiRequest } from "next";

export interface ExtendedNextApiRequest extends NextApiRequest {
  file: Express.Multer.File;
}

export type IValidatorType = "upload" | "verify";
