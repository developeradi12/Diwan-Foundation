import { NextRequest, NextResponse } from "next/server"
import User from "@/models/User"

import bcrypt from "bcryptjs"
import { getSession } from "@/utils/sesion"
import connectToDatabase from "@/lib/mongodb"

// ─── GET /api/donor/profile ────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(session.userId)
      .select("-password -membershipPlan -membershipStartDate -membershipEndDate")
      .lean()

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    console.error("GET /api/donor/profile error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// ─── PUT /api/donor/profile ────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const body = await req.json()
    const {
      fullName,
      phone,
      alternateMobile,
      city,
      state,
      country,
      pincode,
      dob,
      gender,
      aadhaar,
      professionalType,
      facebook,
      instagram,
      linkedin,
      twitter,
      whatsapp,
      oldPassword,
      newPassword,
      confirmPassword,
    } = body

    const user = await User.findById(session.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // ── Handle password change if requested ──
    if (oldPassword || newPassword || confirmPassword) {
      if (!oldPassword || !newPassword || !confirmPassword) {
        return NextResponse.json(
          { error: "Please fill all password fields" },
          { status: 400 }
        )
      }
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { error: "New password and confirm password do not match" },
          { status: 400 }
        )
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password)
      if (!isMatch) {
        return NextResponse.json(
          { error: "Old password is incorrect" },
          { status: 400 }
        )
      }

      user.password = await bcrypt.hash(newPassword, 10)
    }

    // ── Update profile fields ──
    if (fullName !== undefined) user.fullName = fullName
    if (phone !== undefined) user.phone = phone
    if (alternateMobile !== undefined) user.alternateMobile = alternateMobile
    if (city !== undefined) user.city = city
    if (state !== undefined) user.state = state
    if (country !== undefined) user.country = country
    if (pincode !== undefined) user.pincode = pincode
    if (dob !== undefined) user.dob = dob ? new Date(dob) : null
    if (gender !== undefined) user.gender = gender
    if (aadhaar !== undefined) user.aadhaar = aadhaar
    if (professionalType !== undefined) user.professionalType = professionalType
    if (facebook !== undefined) user.facebook = facebook
    if (instagram !== undefined) user.instagram = instagram
    if (linkedin !== undefined) user.linkedin = linkedin
    if (twitter !== undefined) user.twitter = twitter
    if (whatsapp !== undefined) user.whatsapp = whatsapp

    await user.save()

    const updated = await User.findById(session.userId)
      .select("-password -membershipPlan -membershipStartDate -membershipEndDate")
      .lean()

    return NextResponse.json(
      { message: "Profile updated successfully", user: updated },
      { status: 200 }
    )
  } catch (err) {
    console.error("PUT /api/donor/profile error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}