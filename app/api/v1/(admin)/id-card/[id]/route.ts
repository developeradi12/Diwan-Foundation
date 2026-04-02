import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import fs from "fs";
import path from "path";
import IDCardModel from "@/models/Idcard";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id: cardId } = await params;

    // Find card
    const card = await IDCardModel.findById(cardId);

    if (!card) {
      return NextResponse.json(
        { message: "ID card not found" },
        { status: 404 }
      );
    }

    // Delete file from public folder
    if (card.fileUrl) {
      const filePath = path.join(process.cwd(), "public", card.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    
    await IDCardModel.findByIdAndDelete(cardId);

    return NextResponse.json(
      { message: "ID card deleted successfully" },
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