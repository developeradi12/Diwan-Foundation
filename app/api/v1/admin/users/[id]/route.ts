import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "User ID is required" },
                { status: 400 }
            );
        }

        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return NextResponse.json(
                { success: false, message: "user not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "User ID is required" },
                { status: 400 }
            );
        }

        const user = await User.findById(id)
        if (!user) {
            return NextResponse.json(
                { success: false, message: "user not found" },
                { status: 404 }
            );
        }

        const body = await req.json();
        const { fullName, email, role, phone, amount } = body;

        //  role-based validation
        if (!fullName || !email || !role) {
            return NextResponse.json(
                { success: false, message: "Required fields missing" },
                { status: 400 }
            );
        }

        if (role !== "admin" && !phone) {
            return NextResponse.json(
                { success: false, message: "Phone required for non-members" },
                { status: 400 }
            );
        }

        if (role === "donor" && !amount) {
            return NextResponse.json(
                { success: false, message: "Amount required for donor" },
                { status: 400 }
            );
        }

        //  update fields
        user.fullName = fullName;
        user.email = email;
        user.role = role;
        user.phone = phone || null;

        //  amount only for donor
        if (role === "donor") {
            user.amount = amount;
        } else {
            user.amount = undefined; // remove if not donor
        }

        await user.save();

        return NextResponse.json({
            success: true,
            message: "User updated successfully",
            data: user,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}