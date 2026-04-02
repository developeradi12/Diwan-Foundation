import { NextResponse } from "next/server"
import connectToDatabase  from "@/lib/mongodb"
import { Contact } from "@/models/Contact"

//  POST - Save to DB
export async function POST(req: Request) {
  try {
    await connectToDatabase()

    const body = await req.json()

    const newContact = await Contact.create(body)

    return NextResponse.json(
      {
        success: true,
        message: "Message saved",
        data: newContact
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    )
  }
}

//  GET - Fetch from DB
export async function GET() {
  try {
    await connectToDatabase()

    const contacts = await Contact.find().sort({ createdAt: -1 })

    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    )
  }
}