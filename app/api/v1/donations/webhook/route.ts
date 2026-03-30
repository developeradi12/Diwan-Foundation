import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import connectToDatabase from "@/lib/mongodb"
import Donation from "@/models/Donation"

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()

    // 1. Get raw body (IMPORTANT for signature)
    const rawBody = await req.text()

    // 2. Parse JSON
    const body = JSON.parse(rawBody)

    // 3. Get signature from headers
    const signature =
      req.headers.get("x-webhook-signature") ||
      req.headers.get("x-cf-signature")

    // 4. Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("base64")

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature ❌")
      return NextResponse.json({ success: false }, { status: 400 })
    }

    // 5. Extract data
    const order = body.data?.order
    const payment = body.data?.payment

    if (!order?.order_id) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const orderId = order.order_id

    // 6. Find donation
    const donation = await Donation.findOne({
      cashfreeOrderId: orderId,
    })

    if (!donation) {
      console.error("Donation not found ❌")
      return NextResponse.json({ success: false }, { status: 404 })
    }

    // 7. Prevent duplicate updates
    if (donation.paymentStatus === "success") {
      return NextResponse.json({ success: true })
    }

    // 8. Update based on status
    if (payment?.payment_status === "SUCCESS") {
      donation.paymentStatus = "success"
      donation.paidAt = new Date()
    } else if (payment?.payment_status === "FAILED") {
      donation.paymentStatus = "failed"
    } else {
      donation.paymentStatus = "pending"
    }

    // Save full webhook data
    donation.paymentDetails = body

    await donation.save()

    console.log("Webhook processed ✅", orderId)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}