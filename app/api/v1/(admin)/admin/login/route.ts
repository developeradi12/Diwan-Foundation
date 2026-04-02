import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { signAccessToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // Step-01 : Connet to DB
    await connectToDatabase();

    // Step-02 : Get the data
    const data = await req.json();
    const { email, password } = data;

    // Step-03 : Verify data
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email }).select("_id email password role fullName");

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      existingUser.password.toString(),
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

     console.log("Role being signed:", existingUser.role)

    const accessToken = await signAccessToken({
      userId: existingUser._id.toString(),
      email: existingUser.email,
      role: existingUser.role,
    });

     const res = NextResponse.json(
      {
        success: true,
        message: "Login success",
        user: {
          _id:      existingUser._id,
          fullName: existingUser.fullName,
          email:    existingUser.email,
          role:     existingUser.role,
        },
      },
      { status: 200 }
    )

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });
    return res;
  } catch (err) {
    console.error("Error in auth route:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
