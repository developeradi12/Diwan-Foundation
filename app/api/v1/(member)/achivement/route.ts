import { NextResponse } from "next/server"
import AchivementCertificate from "@/models/AchivementCertificate"
import { getSession } from "@/utils/sesion"
import connectToDatabase from "@/lib/mongodb"

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

    const certificate = await AchivementCertificate.findOne({ userId })

    if (!certificate) {
      return NextResponse.json(
        { message: "Certificate not found" },
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