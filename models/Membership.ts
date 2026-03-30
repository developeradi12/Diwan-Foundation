import mongoose, { Schema, models } from "mongoose";

const MembershipSchema = new Schema(
  {
    membershipType: {
      type: String,
      required: true,
      trim: true,
    },

    membershipDuration: {
      type: Number, // months
      required: true,
    },

    membershipFee: {
      type: Number,
      required: true,
    },
    features : [
      {
        type : String,
        trim : true,
        required : false
      }
    ]
  },
  { timestamps: true }
);

const Membership =
  models.Membership || mongoose.model("Membership", MembershipSchema);

export default Membership;