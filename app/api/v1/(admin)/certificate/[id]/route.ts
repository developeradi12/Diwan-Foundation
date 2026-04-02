import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import fs from "fs";
import path from "path";
import Certificate from "@/models/Certificate";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id: certificateId } = await params; // 👈 await the params

    // Find certificate
    const certificate = await Certificate.findById(certificateId);

    if (!certificate) {
      return NextResponse.json(
        { message: "Certificate not found" },
        { status: 404 }
      );
    }

    // Delete file from public folder
    if (certificate.fileUrl) {
      const filePath = path.join(process.cwd(), "public", certificate.fileUrl);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from DB
    await Certificate.findByIdAndDelete(certificateId);

    return NextResponse.json(
      { message: "Certificate deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}