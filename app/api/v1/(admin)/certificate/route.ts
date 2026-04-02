import connectToDatabase from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const getAllCertificate = await Certificate.find();

        return NextResponse.json(
            {
                message: "fetch certificates successfully",
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
