import { NextResponse } from "next/server"
import { getSession } from "@/utils/sesion"
import connectToDatabase from "@/lib/mongodb"
import IDCardModel from "@/models/Idcard"

export async function GET() {
  try {
     await connectToDatabase()
    const authUser = await getSession()

    if (!authUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = authUser.userId

    const certificate = await IDCardModel.findOne({ userId })

    if (!certificate) {
      return NextResponse.json(
        { message: "Card not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      certificateUrl: certificate.fileUrl, // from public folder
    })
  } catch (error) {
    console.log("Error fetching certificate:", error)

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}