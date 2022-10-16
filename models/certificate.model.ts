import { Model, model, models, Schema } from "mongoose";

export interface ICertificate {
  fullName: string;
  menteeID: string;
  track: string;
  trainingName: string;
  technicalSkills: string[];
  softSkills: string[];
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
    trainingName: {
      type: String,
      required: true,
      trim: true,
    },
    technicalSkills: {
      type: [String],
      required: true,
    },
    softSkills: {
      type: [String],
      required: true,
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
  models.Certificate || model("Certificate", CertificateSchema);
export default CertificateModel;
