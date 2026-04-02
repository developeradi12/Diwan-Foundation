import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Donation ID is required" },
                { status: 400 }
            );
        }

        const donation = await Donation.findByIdAndDelete(id);

        if (!donation) {
            return NextResponse.json(
                { success: false, message: "Donation not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Donation deleted successfully",
        });

    } catch (error) {
    
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}