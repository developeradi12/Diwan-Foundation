// models/Certificate.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  memberId: string;
  memberName: string;
  certificateNo: string;
  issueDate: Date;
  fileUrl: string;
  createdAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    memberId: { type: String, required: true },
    memberName: { type: String, required: true },
    certificateNo: { type: String, required: true },
    issueDate: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate ||
mongoose.model<ICertificate>("Certificate", CertificateSchema);