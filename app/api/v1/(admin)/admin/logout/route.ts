import connectToDatabase from "@/lib/mongodb"
import { NextResponse } from "next/server"


export async function POST() {
    try {
        const response = NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        )
        response.cookies.set("accessToken", "", {
            httpOnly: true,
            expires: new Date(0),
            path: "/",
        })
        return response;
    } catch (error) {
          console.log("error from logout api",error);
    }
}