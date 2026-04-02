
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const users = await User.find({
            role: { $in: ["member", "donor"] },
        }).select("fullName");

        return NextResponse.json({
            success: true,
            count: users.length,
            users,
        });

    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}