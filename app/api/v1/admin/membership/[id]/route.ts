import connectToDatabase from "@/lib/mongodb";
import Membership from "@/models/Membership";
import { membershipSchema } from "@/schemas/membershipSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const membership = await Membership.findById(id);

    if (!membership) {
      return NextResponse.json({ success: false, message: "Membership not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: membership });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const body = await req.json();

    const result = membershipSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ success: false, errors: result.error.flatten() }, { status: 400 });
    }

    const updated = await Membership.findByIdAndUpdate(id, result.data, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Membership not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("UPDATE MEMBERSHIP ERROR:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const member = await Membership.findByIdAndDelete(id);

    if (!member) {
      return NextResponse.json({ success: false, message: "Membership not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Membership deleted successfully" });
  } catch (error) {
    console.error("Delete membership error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete membership" }, { status: 500 });
  }
}
