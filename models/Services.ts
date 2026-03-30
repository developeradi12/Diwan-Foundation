import mongoose, { Schema, Document, models, model } from "mongoose";

// Interface
export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//  Slug generator function
const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

//  Pre-save hook
ServiceSchema.pre("save", async function (this: IService) {
   if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
});
const Service =
  models.Service || model<IService>("Service", ServiceSchema);

export default Service;