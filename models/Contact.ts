import mongoose, { Schema, models } from "mongoose"

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const Contact =
  models.Contact || mongoose.model("Contact", ContactSchema)