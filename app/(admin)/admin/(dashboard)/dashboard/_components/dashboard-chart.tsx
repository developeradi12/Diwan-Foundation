"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import api from "@/lib/axios";

const chartConfig = {
  donations: {
    label: "Donations",
    color: "#0B402E",
  },
} satisfies ChartConfig;

export default function DashboardChart() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState({
    today: 0,
    yesterday: 0,
  });

  //  Fetch API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/dashboard/chart");
        console.log("res",res);
        setChartData(res.data.chart);
        setStats({
          today: res.data?.today,
          yesterday: res.data?.yesterday,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  //  Total calculation
  const total = React.useMemo(() => {
    return chartData.reduce(
      (acc, curr) => acc + curr.donations,
      0
    );
  }, [chartData]);

  return (
    <Card className="rounded-2xl shadow-sm  border-gray-100 py-0 overflow-hidden">
      
      {/* Header */}
      <CardHeader className="flex flex-col gap-4 border-b border-gray-200 p-0">

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-stretch">

          {/* Title */}
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4">
            <div className="flex items-center gap-2">
              <div
                className="w-1 h-5 rounded-full"
                style={{ background: "#E2AD56" }}
              />
              <CardTitle
                className="text-sm font-semibold"
                style={{ color: "#0B402E" }}
              >
                Donation Overview
              </CardTitle>
            </div>

            <CardDescription className="text-xs text-gray-400 ml-3">
              Monthly donations analytics
            </CardDescription>
          </div>

          {/* Total */}
          <div className="flex flex-col justify-center gap-1 px-8 py-4 border-t sm:border-t-0 sm:border-l border-gray-100">
            <span className="text-xs text-gray-400 uppercase">
              Total Donations
            </span>
            <span className="text-3xl font-bold text-[#0B402E]">
              {total}
            </span>
          </div>
        </div>

        {/* Today / Yesterday Cards */}
        <div className="flex gap-4 px-6 pb-4">
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-3 flex-1">
            <p className="text-xs text-gray-400">Today</p>
            <h2 className="text-xl font-bold text-[#0B402E]">
              {stats.today}
            </h2>
          </div>

          <div className="bg-gray-50 border rounded-xl border-gray-300 p-3 flex-1">
            <p className="text-xs text-gray-400">Yesterday</p>
            <h2 className="text-xl font-bold text-[#0B402E]">
              {stats.yesterday}
            </h2>
          </div>
        </div>

      </CardHeader>

      {/* Chart */}
      <CardContent className="px-2 pt-6 pb-4 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="h-[260px] w-full"
        >
          <BarChart data={chartData}>
            <CartesianGrid
              vertical={false}
              stroke="#f0f0f0"
              strokeDasharray="3 3"
            />

            {/*  FIXED */}
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickFormatter={(value) => `Day ${value}`}
            />

            <ChartTooltip
              content={<ChartTooltipContent />}
            />

            {/*  FIXED */}
            <Bar
              dataKey="donations"
              fill="#0B402E"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}