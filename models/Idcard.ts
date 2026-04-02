import mongoose, { Schema, Document } from "mongoose";

export interface IIDCard extends Document {
  userId: string;
  userName: string;
  certificateNo: string;
  issueDate: Date;
  fileUrl: string;
}

const IDCardSchema = new Schema<IIDCard>(
  {
    userId: { type: String, required: true,unique:true },
    userName: { type: String, required: true },
    certificateNo: { type: String, required: true ,unique:true},
    issueDate: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const IDCardModel =
  mongoose.models.IDCard ||
  mongoose.model<IIDCard>("IDCard", IDCardSchema);

export default IDCardModel;