import { NextResponse } from "next/server"
import { getSession } from "@/utils/sesion"
import Certificate from "@/models/Certificate"
import connectToDatabase from "@/lib/mongodb"

export async function GET() {
  try {
    const authUser = await getSession()
    console.log("auth", authUser);

    if (!authUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    await connectToDatabase()

    const userId = authUser.userId
    // console.log("userId", userId)

    const docs = await Certificate.findOne({
      memberId: userId
    })

    // console.log("certi", certificates)

    // Correct check for empty array
    if (!docs) {
      return NextResponse.json(
        { message: "Certificate not found" },
        { status: 404 }
      )
    }

    //  Return all certificates OR first one
    return NextResponse.json({
      success: true,
      certificateUrl :docs?.fileUrl,
    })

  } catch (error) {
    console.log("Error fetching certificate:", error)

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}