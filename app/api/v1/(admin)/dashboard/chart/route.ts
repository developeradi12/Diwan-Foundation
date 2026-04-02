import { NextResponse } from "next/server";

import Donation from "@/models/Donation";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase()

    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const data = await Donation.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lt: startOfNextMonth,
          },
        },
      },
      {
        $group: {
          _id: { day: { $dayOfMonth: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.day": 1 } },
    ]);

    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    const formatted = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const found = data.find((d) => d._id.day === day);

      return {
        day,
        donations: found ? found.count : 0,
      };
    });

    //  Today & Yesterday
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const yesterdayStart = new Date(Date.now() - 86400000);
    yesterdayStart.setHours(0, 0, 0, 0);

    const todayCount = await Donation.countDocuments({
      createdAt: { $gte: todayStart },
    });

    const yesterdayCount = await Donation.countDocuments({
      createdAt: {
        $gte: yesterdayStart,
        $lt: todayStart,
      },
    });

    return NextResponse.json({
      chart: formatted,
      today: todayCount,
      yesterday: yesterdayCount,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}