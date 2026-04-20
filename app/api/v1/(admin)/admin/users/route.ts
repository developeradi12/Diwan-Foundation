import { NextRequest, NextResponse } from "next/server"
import User from "@/models/User"
import connectToDatabase from "@/lib/mongodb"
import "@/models/Membership"
import { generatePassword } from "@/lib/generatePassword"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/lib/mailer"
import Donation from "@/models/Donation"

export async function GET() {
  try {
    await connectToDatabase()

    const users = await User.find()
      .populate("membershipPlan", "membershipType membershipDuration")
      .lean()

    const formatted = users.map((u: any) => ({
      _id: u._id.toString(),
      fullName: u.fullName,
      email: u.email ?? null,
      phone: u.phone ?? null,
      imageUrl: u.imageUrl ?? null,
      role: u.role,
      membershipPlan: u.membershipPlan
        ? {
          _id: u.membershipPlan._id.toString(),
          membershipType: u.membershipPlan.membershipType,
          membershipDuration: u.membershipPlan.membershipDuration,
        }
        : null,
      createdAt: u.createdAt?.toISOString(),
      updatedAt: u.updatedAt?.toISOString(),
    }))

    return NextResponse.json({
      success: true,
      data: formatted,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    )
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const fullName = body.fullName;
    const email = body.email;
    const role = body.role || "donor";
    const amount = body.amount;
    const phone = body.phone;

    //  Basic validation
    if (!fullName || !email || !role || !phone) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    //  Donor → amount required
    if (role === "donor" && (!amount || amount <= 0)) {
      return NextResponse.json(
        { success: false, message: "Amount is required for donor" },
        { status: 400 }
      );
    }

    //  Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    //  Generate password
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    //  Create user
    const newUser = await User.create({
      fullName,
      email,
      role,
      phone,
      password: hashedPassword,
    });

    //  Send Email
    await sendEmail({
      to: email,
      subject: "Your Account Created 🎉",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto">
          <h2>Welcome, ${fullName} 👋</h2>
          <p>Your account has been created successfully.</p>

          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:8px;border:1px solid #eee"><strong>Email</strong></td>
              <td style="padding:8px;border:1px solid #eee">${email}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #eee"><strong>Password</strong></td>
              <td style="padding:8px;border:1px solid #eee">${plainPassword}</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid #eee"><strong>Role</strong></td>
              <td style="padding:8px;border:1px solid #eee">${role}</td>
            </tr>
            ${role === "donor"
          ? `<tr>
                    <td style="padding:8px;border:1px solid #eee"><strong>Amount</strong></td>
                    <td style="padding:8px;border:1px solid #eee">${amount}</td>
                  </tr>`
          : ""
        }
          </table>

          <p style="margin-top:16px">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/login"
              style="background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none">
              Login Now
            </a>
          </p>
        </div>
      `,
    });

    if (role === "donor") {
      const donation = await Donation.create({
        user: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
         amount: amount ,
        screenshot: "add by admin",
        paidAt: new Date(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("CREATE USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
