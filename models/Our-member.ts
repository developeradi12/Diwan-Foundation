import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    image: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default mongoose.models.Member ||
  mongoose.model("Member", memberSchema);