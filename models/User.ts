import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  alternateMobile?: string;
  role?: "member" | "donor" | "admin";

  professionalType?: string;
  password: string;
  membershipPlan?: mongoose.Types.ObjectId | string;
  membershipStartDate?: Date | null;
  membershipEndDate?: Date | null;

  imageUrl?: string | null; // public URL path to uploaded image

  city?: string;
  state?: string;
  country?: string;
  pincode?: string;

  dob?: Date | null;
  aadhaar?: string;

  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  whatsapp?: string;

  gender?: string;

  createdAt?: Date;
  updatedAt?: Date;
  refreshToken: string;
}
const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
      required:true,
    },
    alternateMobile: {
      type: String,
      trim: true,
      default: null
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    role: {
      type: String,
      enum: ["member", "donor", "admin"],
      default: "donor",
    },
    professionalType: {
      type: String,
      trim: true,
      default: null
    },
    membershipPlan: {
      type: Schema.Types.ObjectId,
      ref: "Membership",
      default: null,
      required: false
    },
    membershipStartDate: {
      type: Date, default: null
    },
    membershipEndDate: {
      type: Date, default: null
    },
    imageUrl: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    country: { type: String, default: null },
    pincode: { type: String, default: null },
    dob: { type: Date, default: null },
    aadhaar: { type: String, default: null },
    facebook: { type: String, default: null },
    instagram: { type: String, default: null },
    linkedin: { type: String, default: null },
    twitter: { type: String, default: null },
    whatsapp: { type: String, default: null },
    gender: { type: String, default: null },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
