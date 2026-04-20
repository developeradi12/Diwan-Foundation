// app/admin/donations/page.tsx

import Header from "../../../_components/header";
import { Heart, TrendingUp, CheckCircle, Clock } from "lucide-react";
import Donation from "@/models/Donation";
import connectToDatabase from "@/lib/mongodb";
import { DonorTable } from "./_components/table";
import "@/models/User";
import { DonationDTO, DonationStats } from "@/types/donation";
import { StatCard } from "@/app/(admin)/_components/stats-card";

// ─── Data Fetcher ────────────────────────────────────────────────────────────

async function getDonors(): Promise<DonationDTO[]> {
  await connectToDatabase();

  const donations = await Donation.find()
    .populate({
      path: "user",
      select: "fullName email phone",
    })
    .sort({ createdAt: -1 })
    .lean();

  return donations.map((d: any): DonationDTO => ({
    _id: d._id.toString(),

    user: d.user
      ? {
        _id: d.user._id.toString(),
        Name: d.user.fullName,
        email: d.user.email,
        phone: d.user.phone,
      }
      : null,
    screenshot:d.screenshot,
    amount: d.amount,
    paidAt: d.paidAt ?? null,
    createdAt: d.createdAt,
  }));
}

// ─── Stats Calculator ────────────────────────────────────────────────────────

function computeStats(donors: DonationDTO[]): DonationStats {
  return {
    totalRaised: donors?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function DonorsPage() {
  const donors = await getDonors();
  const { totalRaised} =
    computeStats(donors);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Donations"
      />

      <div className="px-6 max-w-screen-xl mx-auto space-y-6">

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-2xl font-bold tracking-tight text-primary">
              Donations
            </p>
            <p className="text-sm mt-0.5 text-gray-400">
              Track and manage all incoming donations
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* <StatCard
            icon={<Heart size={20} />}
            label="Pending Amount"
            value={`₹${pendingAmount.toLocaleString("en-IN")}`}
          /> */}
          <StatCard
            icon={<TrendingUp size={20} />}
            label="Total Raised"
            value={`₹${totalRaised.toLocaleString("en-IN")}`}
          />
          {/* <StatCard
            icon={<CheckCircle size={20} />}
            label="Success"
            value={successCount}
          /> */}
          {/* <StatCard
            icon={<Clock size={20} />}
            label="Pending"
            value={pendingCount}
          /> */}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-primary">All Donations</p>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100">
              {donors.length} total
            </span>
          </div>

          <div className="p-4">
            <DonorTable data={donors} />
          </div>
        </div>

      </div>
    </div>
  );
}

