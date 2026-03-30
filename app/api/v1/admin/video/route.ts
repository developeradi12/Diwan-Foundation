import connectToDatabase from "@/lib/mongodb";
import Video from "@/models/Videos";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const videos = await Video.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, videos },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { videoUrl } = body;

        //  Validation
        if (!videoUrl) {
            return NextResponse.json(
                { success: false, message: "Video URL is required" },
                { status: 400 }
            );
        }

        const video = await Video.create({ videoUrl });

        return NextResponse.json(
            { success: true, data: video },
            { status: 201 }
        )
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to save video",
            },
            { status: 500 }
        );
    }
}