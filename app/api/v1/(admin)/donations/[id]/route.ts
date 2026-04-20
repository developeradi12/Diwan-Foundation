import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { deleteLocalImage } from "@/utils/deleteImage";

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
        //STEP 1: Find donation first
        const donation = await Donation.findById(id);

        if (!donation) {
            return NextResponse.json(
                { success: false, message: "Donation not found" },
                { status: 404 }
            );
        }

        //  STEP 2: Delete screenshot (if exists)
        if (donation.screenshot) {
            await deleteLocalImage(donation.screenshot);
        }

        //  STEP 3: Delete donation
        await Donation.findByIdAndDelete(id);

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