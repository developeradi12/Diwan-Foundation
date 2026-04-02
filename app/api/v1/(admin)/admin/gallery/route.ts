import connectToDatabase from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { uploadImage } from "@/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/gallery
export async function GET() {
  try {
    await connectToDatabase();
    const images = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, images });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

// POST /api/admin/gallery
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData  = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile || imageFile.size === 0)
      return NextResponse.json(
        { success: false, message: "Image is required" },
        { status: 400 }
      );

    const imagePath = await uploadImage(imageFile, "gallery");

    if (!imagePath)
      return NextResponse.json(
        { success: false, message: "Image upload failed" },
        { status: 500 }
      );

    const image = await Gallery.create({ image: imagePath });
    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}