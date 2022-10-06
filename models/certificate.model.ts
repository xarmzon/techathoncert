import { Model, model, models, Schema } from "mongoose";

interface ICertificate {
  fullName: string;
  menteeID: string;
  track: string;
  dateIssued: string;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    menteeID: {
      type: String,
      required: true,
      trim: true,
    },
    track: {
      type: String,
      required: true,
      trim: true,
    },
    dateIssued: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel: Model<ICertificate, any, any, any, any> =
  models.certificate || model("Certificate", CertificateSchema);
export default CertificateModel;
