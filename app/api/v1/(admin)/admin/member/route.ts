import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { sendEmail } from "@/lib/mailer";
import bcrypt from "bcryptjs";
import { generatePassword } from "@/lib/generatePassword";
import { uploadImage } from "@/utils/uploadImage";

{/* fetch members only */ }

export async function GET(req: NextRequest) {
  try {

    await connectToDatabase();

    const members = await User.find({ role: "member" });

    return NextResponse.json(
      {
        message: "Members fetched successfully",
        members
      },
      { status: 200 }
    );

  } catch (error) {

    console.error("Error fetching members:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error"
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()


    const formData = await req.formData()

    const getValue = (key: string) => {
      const val = formData.get(key)
      return val ? String(val) : ""
    }

    const fullName = getValue("fullName")
    const email = getValue("email")
    const membershipPlan = getValue("membershipPlan")
    const membershipStartDate = getValue("membershipStartDate")

    // optional fields
    const phone = getValue("phone")
    const dob = getValue("dob")
    const address = getValue("address")
    const country = getValue("country")
    const state = getValue("state")
    const city = getValue("city")
    const pincode = getValue("pincode")
    const gender = getValue("gender")
    const alternateMobile = getValue("alternateMobile")
    const whatsapp = getValue("whatsapp")
    const aadhaar = getValue("aadhaar")
    const instagram = getValue("instagram")
    const facebook = getValue("facebook")
    const twitter = getValue("twitter")
    const linkedin = getValue("linkedin")
    const professionalType = getValue("professionalType")

    const image = formData.get("image") as File | null

    //  Validation
    if (!fullName || !email || !membershipPlan || !membershipStartDate) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      )
    }

    // Check existing user
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Member already exists with this email" },
        { status: 409 }
      )
    }

    //  Generate password
    const plainPassword = generatePassword()
    const hashedPassword = await bcrypt.hash(plainPassword, 10)

    //  Upload image (MAIN PART)
    let imageUrl: string | null = null

    if (image && image.size > 0) {
      imageUrl = await uploadImage(image, "members") //  folder name
    }

    //  Create member
    const newMember = await User.create({
      fullName,
      email,
      phone,
      dob,
      membershipPlan,

      address,
      country,
      state,
      city,
      pincode,
      gender,
      alternateMobile,
      whatsapp,
      aadhaar,
      instagram,
      facebook,
      twitter,
      linkedin,
      professionalType,
      membershipStartDate,

      imageUrl, //  store URL
      role: "member",
      password: hashedPassword,
      isAdminCreate: true,
    })

    // Send email
    await sendEmail({
      to: email,
      subject: "Welcome! Your Membership Account Details",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto">
          <h2>Welcome, ${fullName} 👋</h2>
          <p>Your membership account has been created successfully.</p>

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
              style="background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none">
              Login Now
            </a>
          </p>
        </div>
      `,
    })
   
    return NextResponse.json(
      {
        success: true,
        message: "Member created successfully",
        member: newMember,
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error("Member create error:", error)

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    )
  }
}