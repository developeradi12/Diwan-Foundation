import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGallery extends Document {
  image: string;
}

const GallerySchema = new Schema<IGallery>(
  { image: { type: String, required: true } },
  { timestamps: true }
);

const Gallery: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);

export default Gallery;