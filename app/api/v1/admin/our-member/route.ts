import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { uploadImage } from "@/utils/uploadImage";
import OurMember from "@/models/Our-member";

/* ── GET all members ── */
export async function GET() {
  try {
    await connectToDatabase();
    const members = await OurMember.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, members });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

/* ── POST create member ── */
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const designation = formData.get("designation") as string;
    const file = formData.get("image") as File;

    if (!name || !designation || !file) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    const image = await uploadImage(file);

    const member = await OurMember.create({ name, designation, image });

    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}