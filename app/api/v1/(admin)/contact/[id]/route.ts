import { NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import { Contact } from "@/models/Contact"

// DELETE /api/contact/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      )
    }

    // Find & delete
    const contact = await Contact.findByIdAndDelete(id)

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact deleted successfully",
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error)

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    )
  }
}