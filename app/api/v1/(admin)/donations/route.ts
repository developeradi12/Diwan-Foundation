import { NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Donation from "@/models/Donation"

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const donations = await Donation.find()
      .populate("user", "fullName email phone role")  // user details bhi saath aayenge
      .sort({ createdAt: -1 })

    return NextResponse.json(
      { success: true, data: donations },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}