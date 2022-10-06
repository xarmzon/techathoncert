import { MAX_UPLOAD_SIZE } from "config";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { ExtendedNextApiRequest, IValidatorType } from "./types";
import APIError from "./error.api";

export const validator =
  (type: IValidatorType) =>
  async (
    req: ExtendedNextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    switch (type) {
      case "upload":
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
        break;
      case "verify":
        const { menteeID } = req.body;
        if (!menteeID) {
          return next(APIError.badRequest("MenteeID field is required"));
        }
        break;
      default:
        return next(APIError.custom("Unknown Validator Type", 500));
    }
    next();
  };
