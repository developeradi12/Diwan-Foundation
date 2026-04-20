import mongoose, { Document, Schema } from "mongoose";

export interface IDonation extends Document {

  user: mongoose.Types.ObjectId;          // ref → User

  // ── Payment info ─────────────────────────────────────────────────────────
  amount: number;
  fullName: string;
  email: string;
  phone: string;
  paidAt?: Date | null;                   // timestamp of successful payment
  screenshot: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    amount: { type: Number, required: true },
    paidAt: { type: Date, default: null },
    screenshot: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Donation ||
  mongoose.model<IDonation>("Donation", DonationSchema);