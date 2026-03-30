import connectToDatabase from "@/lib/mongodb";
import Idcard from "@/models/Idcard";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const getAllCertificate = await Idcard.find();

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
