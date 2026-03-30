import { SquarePen, CreditCard, TrendingUp, Users } from "lucide-react";
import Header from "../../../_components/header";
import Link from "next/link";
import MembershipCard from "@/app/(admin)/_components/membership-card";
import connectToDatabase from "@/lib/mongodb";
import Membership from "@/models/Membership";

const MembershipsPage = async () => {
  await connectToDatabase();
  const memberships = await Membership.find().lean()

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="All Memberships"
      />

      <div className="px-6  max-w-screen-xl mx-auto space-y-6">

        {/* Page Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}>
              Memberships
            </p>
            <p className="text-sm mt-0.5 text-gray-400">
              Manage all membership plans and pricing
            </p>
          </div>

          <Link
            href="/admin/memberships/create"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg w-fit"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-primary)",
            }}
          >
            <SquarePen size={16} strokeWidth={2.5} />
            Create a Plan
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-primary) 10%, white)" }}>
              <CreditCard size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">
                Total Plans
              </p>
              <p className="text-2xl font-bold mt-0.5"
                style={{ color: "var(--color-primary)" }}>
                {memberships.length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-accent) 20%, white)" }}>
              <TrendingUp size={20} style={{ color: "var(--color-accent)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">
                Avg. Price
              </p>
              <p className="text-2xl font-bold mt-0.5"
                style={{ color: "var(--color-primary)" }}>
                ₹{memberships.length
                  ? Math.round(memberships.reduce((a: any, b: any) => a + b.membershipFee, 0) / memberships.length)
                  : 0}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-success) 12%, white)" }}>
              <Users size={20} style={{ color: "var(--color-success)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">
                Active Plans
              </p>
              <p className="text-2xl font-bold mt-0.5"
                style={{ color: "var(--color-primary)" }}>
                {memberships.length}
              </p>
            </div>
          </div>
        </div>

        {/* Plans Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full"
                style={{ background: "var(--color-accent)" }} />
              <p className="text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}>
                All Plans
              </p>
            </div>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: "color-mix(in oklch, var(--color-primary) 8%, white)",
                color: "var(--color-primary)",
              }}
            >
              {memberships.length} total
            </span>
          </div>

          {/* Plans Grid */}
          <div className="p-6">
            {memberships.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-16">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "color-mix(in oklch, var(--color-primary) 8%, white)" }}
                >
                  <CreditCard size={24} style={{ color: "var(--color-primary)" }} />
                </div>
                <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                  No plans yet
                </p>
                <p className="text-xs text-gray-400">Create your first membership plan</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memberships.map((plan: any, index: number) => (
                  <MembershipCard
                    id={plan._id.toString()}  // ✅ convert ObjectId to string
                    key={index}
                    type={plan.membershipType}
                    duration={plan.membershipDuration}
                    price={plan.membershipFee}
                    features={plan.features}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default MembershipsPage;