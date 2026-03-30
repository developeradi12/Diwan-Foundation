import connectToDatabase from "@/lib/mongodb";
import Membership from "@/models/Membership";
import { membershipSchema } from "@/schemas/membershipSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const result = membershipSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const membership = await Membership.create(result.data);

    return NextResponse.json({
      success: true,
      data: membership,
    });
  } catch (error: any) {
    console.error("CREATE MEMBERSHIP ERROR:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {

  try {

    await connectToDatabase();

    const plans = await Membership.find();

    return NextResponse.json({
      success: true,
      data: plans,
    });

  } catch {

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );

  }
}