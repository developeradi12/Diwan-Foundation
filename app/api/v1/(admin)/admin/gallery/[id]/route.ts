import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

// DELETE /api/admin/gallery/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params
    const image = await Gallery.findById(id);
    if (!image)
      return NextResponse.json(
        { success: false, message: "Image not found" },
        { status: 404 }
      );

    // Delete file from public folder
    if (image.image) {
      try {
        await fs.unlink(path.join(process.cwd(), "public", image.image));
      } catch {
        // File missing — ignore
      }
    }

    await image.deleteOne();
    return NextResponse.json({ success: true, message: "Image deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete image" },
      { status: 500 }
    );
  }
}