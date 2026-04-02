import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { jwtVerify } from "jose"
import User from "@/models/User"

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!)

export async function POST(req: Request) {
  try {
    await connectDB()

    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: "Token & password required" },
        { status: 400 }
      )
    }

    //  VERIFY TOKEN
    let payload: any
    try {
      const data = await jwtVerify(token, secret)
      payload = data.payload
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // optional check
    if (payload.type !== "reset") {
      return NextResponse.json(
        { success: false, message: "Invalid token type" },
        { status: 400 }
      )
    }

    const userId = payload.userId

    // 🔍 Find user
    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    await user.save()

    return NextResponse.json(
      { success: true, message: "Password reset successful" },
      { status: 200 }
    )

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error)

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}