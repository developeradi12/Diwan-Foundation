import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"

import nodemailer from "nodemailer"
import User from "@/models/User"
import { SignJWT } from "jose"

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!)
export async function POST(req: Request) {
    try {
        await connectDB()

        const { email } = await req.json()

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            )
        }

        const user = await User.findOne({ email })

        // 🔐 Important: don't reveal user existence
        if (!user) {
            return NextResponse.json(
                { success: true, message: "If email exists, reset link sent" },
                { status: 200 }
            )
        }

        //  Create token (expires in 15 min)
        const token = await new SignJWT({
            userId: user._id.toString(),
            type: "reset",
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("15m")
            .sign(secret)
            
        // 🔗 Reset URL
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`

        // 📧 Mail transporter (you already have this, adjust if needed)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        // ✉️ Send email
        await transporter.sendMail({
            from: `"Support" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Reset Your Password",
            html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">Reset Password</a>
        <p>This link expires in 15 minutes.</p>
      `,
        })

        return NextResponse.json(
            { success: true, message: "Reset link sent to email" },
            { status: 200 }
        )

    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error)

        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 }
        )
    }
}