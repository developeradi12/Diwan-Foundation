import { NextResponse } from "next/server";

import User from "@/models/User";
import Donation from "@/models/Donation";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
    try {
        await connectToDatabase();

        const result = await User.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 },
                },
            },
        ]);

        // default values
        let stats = {
            totalUsers: 0,
            members: 0,
            donors: 0,
            donationAmount: 0,
        };

        result.forEach((item) => {
            stats.totalUsers += item.count;

            if (item._id === "member") stats.members = item.count;
            if (item._id === "donor") stats.donors = item.count;
        });

        const donationSum = await Donation.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }, // ⚠️ field name check karo
                },
            },
        ]);
        stats.donationAmount = donationSum[0]?.total || 0;
        return NextResponse.json(stats);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}