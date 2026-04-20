"use client";

import * as React from "react";
import { Boxes, MoveRight, PopcornIcon, Spotlight, User2 } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";

export default function DashboardStats() {
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    members: 0,
    donors: 0,
    donationCount: 0,
    donationAmount: 0,
  });

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return `₹ ${amount.toLocaleString("en-IN")}`;
  };

  const cards = [
    {
      title: "Total Members",
      value: stats.members,
      icon: Spotlight,
      bg: "bg-red-50",
      iconBg: "bg-red-100 text-red-400",
      link: "/admin/members",
    },
    {
      title: "Total Donar",
      value: stats.donors,
      icon: PopcornIcon,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100 text-blue-400",
      link: "/admin/donations",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: User2,
      bg: "bg-orange-50",
      iconBg: "bg-orange-100 text-orange-400",
      link: "/admin/users",
    },
    {
      title: "Total Donation",
      value: formatCurrency(stats.donationAmount),
      icon: Boxes,
      bg: "bg-green-50",
      iconBg: "bg-green-100 text-green-400",
      link: "/admin/donations",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className={`${card.bg} rounded-xl p-5 hover:shadow-md transition-shadow`}
          >
            <p className="text-black font-medium text-lg flex gap-2 items-center">
              <Icon
                className={`${card.iconBg} rounded-md p-1.5 w-8 h-8 shrink-0`}
              />
              {card.title}
            </p>

            <div className="my-5">
              {loading ? (
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
              ) : (
                <h4 className="text-2xl font-bold text-gray-800">
                  {card.value}
                </h4>
              )}
            </div>

            <Link
              href={card.link}
              className="flex gap-2 items-center text-gray-600 hover:text-gray-900"
            >
              Explore <MoveRight className="w-5" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}