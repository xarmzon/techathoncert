import { NextApiRequest,NextApiResponse } from "next";
import { NextHandler } from "next-connect";

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

 export const onError = (
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
  
  export const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).json({ error: true, msg: "Not Found" });
  };




  export default APIError