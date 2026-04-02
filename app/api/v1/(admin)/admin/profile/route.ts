import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import { getSession } from "@/utils/sesion"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"


export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

   const authUser = await getSession()

    const id = authUser?.userId

    if (!id) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      )
    }

    const user = await User.findById(id).select("fullName email phone")

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(user)

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase()

    const body = await req.json()

    const {
      name,
      email,
      phone,
      oldPassword,
      newPassword,
      confirmPassword,
    } = body

    // 1. Get logged-in user
    const authUser = await getSession()

    const user = await User.findById(authUser?.userId)

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    // 2. Password Update Logic
    if (newPassword || confirmPassword || oldPassword) {
      
      // Check all fields present
      if (!oldPassword || !newPassword || !confirmPassword) {
        return NextResponse.json(
          { message: "All password fields are required" },
          { status: 400 }
        )
      }

      // Check old password
      const isMatch = await bcrypt.compare(oldPassword, user.password)

      if (!isMatch) {
        return NextResponse.json(
          { message: "Old password is incorrect" },
          { status: 400 }
        )
      }

      // Check new & confirm match
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "New passwords do not match" },
          { status: 400 }
        )
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newPassword, salt)
    }

    // 3. Update other fields
    user.name = name || user.name
    user.email = email || user.email
    user.phone = phone || user.phone

    await user.save()

    return NextResponse.json({
      message: "Profile updated successfully",
    })

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}