import connectToDatabase from "@/lib/mongodb";
import AchivementCertificate from "@/models/AchivementCertificate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const getAllCertificate = await AchivementCertificate.find();

        return NextResponse.json(
            {
                message: "fetch achivement certificates successfully",
                data: getAllCertificate
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
