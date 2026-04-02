import { NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Donation from "@/models/Donation"
import cashfree from "@/types/cashfree"  

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()

    const { order_id } = await req.json()

    if (!order_id) {
      return NextResponse.json(
        { success: false, message: "Order ID required" },
        { status: 400 }
      )
    }

    const donation = await Donation.findOne({ cashfreeOrderId: order_id })

    if (!donation) {
      return NextResponse.json(
        { success: false, message: "Donation not found" },
        { status: 404 }
      )
    }

    if (donation.paymentStatus === "success") {
      return NextResponse.json({
        success: true,
        message: "Already verified",
        data: donation,
      })
    }

    // instance method call
    const response = await cashfree.PGFetchOrder(order_id)
    const order = response.data

    if (order.order_status === "PAID") {
      donation.paymentStatus = "success"
      donation.paidAt = new Date()
    } else {
      donation.paymentStatus = "failed"
    }

    donation.paymentDetails = order
    await donation.save()

    return NextResponse.json({
      success: true,
      status: donation.paymentStatus,
      data: donation,
    })
  } catch (error: any) {
    console.error("Verify donation error:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    )
  }
}