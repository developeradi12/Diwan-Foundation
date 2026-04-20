import { NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Donation from "@/models/Donation"
import User from "@/models/User"
import fs from "fs"
import path from "path"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/lib/mailer"
import { generatePassword } from "@/lib/generatePassword"


export async function POST(req: NextRequest) {
  try {
    // console.log("🔥 API HIT")

    await connectToDatabase()
    // console.log("✅ DB Connected")

    const formData = await req.formData()

    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const amount = formData.get("amount") as string
    const screenshot = formData.get("screenshot") as File

    // console.log("📦 Data:", { fullName, email, phone, amount })

    //  Validation
    if (!fullName || !email || !phone || !amount || !screenshot) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      )
    }

    if (Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      )
    }

    // =========================
    //  HANDLE USER (OLD LOGIC)
    // =========================

    let user = await User.findOne({ email })
    let isNewUser = false

    if (!user) {
      isNewUser = true

      const plainPassword = generatePassword()
      const hashedPassword = await bcrypt.hash(plainPassword, 10)

      user = await User.create({
        fullName,
        email,
        phone,
        password: hashedPassword,
        role: "donor",
      })

      // console.log("👤 New user created:", user._id)

      //  Send email
      await sendEmail({
        to: email,
        subject: "Your login credentials",
        html: `
          <h2>Welcome, ${fullName}!</h2>
          <p>Thank you for your donation ❤️</p>
          <p>Email: ${email}</p>
          <p>Password: ${plainPassword}</p>
        `,
      })
    }

    // =========================
    //  HANDLE FILE
    // =========================

    const bytes = await screenshot.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), "public/uploads")

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const fileName = `${Date.now()}-${screenshot.name}`
    const filePath = path.join(uploadDir, fileName)

    fs.writeFileSync(filePath, buffer)

    const fileUrl = `/uploads/${fileName}`


    // =========================
    //  CREATE DONATION
    // =========================

    const donation = await Donation.create({
      user: user._id, 
      fullName,
      email,
      phone,
      amount: Number(amount),
      screenshot: fileUrl,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Donation submitted successfully",
        data: donation,
        isNewUser,
      },
      { status: 201 }
    )

  } catch (error: any) {
    // console.error(" ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 }
    )
  }
}