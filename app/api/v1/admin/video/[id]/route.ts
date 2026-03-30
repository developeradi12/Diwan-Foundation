import connectToDatabase from "@/lib/mongodb";
import Video from "@/models/Videos";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    //  Check ID
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Video ID is required" },
        { status: 400 }
      );
    }

    //  Delete video
    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return NextResponse.json(
        { success: false, message: "Video not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Video deleted successfully" },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete video",
      },
      { status: 500 }
    );
  }
}