import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import type { CreateOrderRequest } from "cashfree-pg"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import Donation from "@/models/Donation"
import { generatePassword } from "@/lib/generatePassword"
import { sendEmail } from "@/lib/mailer"
import { signAccessToken } from "@/utils/jwt"
import cashfree from "@/types/cashfree"

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()

    const body = await req.json()
    const { fullName, email, phone, amount } = body

    if (!fullName || !email || !phone || !amount) {
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

      await sendEmail({
        to: email,
        subject: "Your login credentials",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto">
            <h2>Welcome, ${fullName}!</h2>
            <p>Thank you for your donation ❤️</p>
            <table style="border-collapse:collapse;width:100%">
              <tr>
                <td style="padding:8px;border:1px solid #eee"><strong>Email</strong></td>
                <td style="padding:8px;border:1px solid #eee">${email}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #eee"><strong>Password</strong></td>
                <td style="padding:8px;border:1px solid #eee">${plainPassword}</td>
              </tr>
            </table>
            <p style="margin-top:16px">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/login"
                 style="background:#22c55e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none">
                Login to your account
              </a>
            </p>
          </div>
        `,
      })
    }

    const existing = await Donation.findOne({ user: user._id, paymentStatus: "pending" })
    if (existing) {
      return NextResponse.json({
        success: true,
        order_id: existing.cashfreeOrderId,
        message: "Pending payment already exists",
      })
    }

    const donation = await Donation.create({
      user: user._id,
      amount: Number(amount),
      paymentStatus: "pending",
    })

    const orderId = `donation_${donation._id}`

    const orderRequest: CreateOrderRequest = {
      order_id: orderId,
      order_amount: Number(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: user._id.toString(),
        customer_email: email,
        customer_phone: phone,
        customer_name: fullName,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/donate/success?order_id={order_id}`,
      },
    }

    const cfOrder = await cashfree.PGCreateOrder(orderRequest)
    
    //  Save orderId BEFORE returning
    donation.cashfreeOrderId = orderId
    await donation.save()

    const res = NextResponse.json(
      {
        success: true,
        payment_session_id: cfOrder.data?.payment_session_id,
        order_id: orderId,
        donationId: donation._id,
        isNewUser,
      },
      { status: 201 }
    )

    return res
  } catch (error: any) {
    console.error(" Initiate donation error:", error)
    return NextResponse.json(
      { success: false, message: error?.message || "Something went wrong" },
      { status: 500 }
    )
  }
}