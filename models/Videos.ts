import mongoose, { Model, Schema } from "mongoose";

export interface IVideo extends Document {
    videoUrl: string;
}

const VideoSchema = new Schema<IVideo>(
    { videoUrl: { type: String, required: true } },
    { timestamps: true }
)
const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

export default Video;