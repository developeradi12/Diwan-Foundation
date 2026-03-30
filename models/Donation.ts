import mongoose, { Document, Schema } from "mongoose";

export interface IDonation extends Document {

  user: mongoose.Types.ObjectId;          // ref → User

  // ── Payment info ─────────────────────────────────────────────────────────
  amount: number;
  paymentStatus: "pending" | "success" | "failed";

  // ── Razorpay fields (filled after successful payment) ────────────────────
  cashfreeOrderId: String
  paidAt?: Date | null;                   // timestamp of successful payment

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

    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    cashfreeOrderId: {
      type: String,
    },
    paidAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Donation ||
  mongoose.model<IDonation>("Donation", DonationSchema);