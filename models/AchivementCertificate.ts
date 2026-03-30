// models/Certificate.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IAchivementCertificate extends Document {
  userId: string;
  userName: string;
  certificateNo: string;
  issueDate: Date;
  fileUrl: string;
  createdAt: Date;
}

const AchivementCertificateSchema = new Schema<IAchivementCertificate>(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    certificateNo: { type: String, required: true },
    issueDate: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AchivementCertificate ||
mongoose.model<IAchivementCertificate>("AchivementCertificate", AchivementCertificateSchema);