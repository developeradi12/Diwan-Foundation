import { generatePassword } from "@/lib/generatePassword";
import { sendEmail } from "@/lib/mailer";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const getAllUsers = await User.find({ role: "member" });

        return NextResponse.json(
            {
                message: "fetch users successfully",
                users: getAllUsers
            }, {
            status: 200
        }
        )
    } catch (error) {
        return NextResponse.json({
            error: "Internal Server Error:"
        }, {
            status: 500
        }
        )
    }
}


