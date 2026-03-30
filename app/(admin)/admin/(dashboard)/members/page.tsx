import { Member } from "@/schemas/UserSchema"
import Header from "../../../_components/header"
import { MembersTable } from "./table"
import User from "@/models/User"
import Link from "next/link"
import { UserPlus, Users, TrendingUp, ShieldCheck } from "lucide-react"
import Membership from "@/models/Membership"
import connectToDatabase from "@/lib/mongodb"

async function getMembers(): Promise<Member[]> {
  await connectToDatabase();
   const _Membership = Membership 
  const members = await User.find({ role: "member" })
    .populate("membershipPlan", "membershipType membershipDuration")
    .lean()

  return members.map((m: any) => ({
    ...m,
    _id: m._id.toString(),
    membershipPlan: m.membershipPlan
      ? {
        ...m.membershipPlan,
        _id: m.membershipPlan._id.toString(),
        membershipType: m.membershipPlan.membershipType,
        membershipDuration: m.membershipPlan.membershipDuration,
      }
      : null,
    membershipStartDate: m.membershipStartDate?.toISOString() ?? null,
    createdAt: m.createdAt?.toISOString(),
    updatedAt: m.updatedAt?.toISOString(),
  }))
}

export default async function MembersPage() {
  const members = await getMembers()

  const newThisMonth = members.filter((m: any) => {
    const created = new Date(m.createdAt)
    const now = new Date()
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    )
  }).length

  //  New — duration se calculate karo
  const activeMembers = members.filter((m) => {
    if (!m.membershipStartDate || !m.membershipPlan?.membershipDuration) return false
    const end = new Date(m.membershipStartDate)
    end.setMonth(end.getMonth() + Number(m.membershipPlan.membershipDuration))
    return end >= new Date()
  }).length

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="All Members"
      />

      <div className="px-6  max-w-screen-xl mx-auto space-y-6">

        {/* Page Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}>
              Members
            </p>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)", opacity: 0.7 }}>
              Manage and view all registered gym members
            </p>
          </div>

          <Link
            href="/admin/members/create"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg w-fit"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-primary)",
            }}
          >
            <UserPlus size={16} strokeWidth={2.5} />
            Create Member
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Members */}
          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-primary) 10%, white)" }}>
              <Users size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">
                Total Members
              </p>
              <p className="text-2xl font-bold mt-0.5"
                style={{ color: "var(--color-primary)" }}>
                {members.length}
              </p>
            </div>
          </div>

          {/* New This Month */}
          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-accent) 20%, white)" }}>
              <TrendingUp size={20} style={{ color: "var(--color-accent)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">
                New This Month
              </p>
              <p className="text-2xl font-bold mt-0.5"
                style={{ color: "var(--color-primary)" }}>
                {newThisMonth}
              </p>
            </div>
          </div>

          {/* Active Members */}
          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-success) 12%, white)" }}>
              <ShieldCheck size={20} style={{ color: "var(--color-success)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">
                Active Members
              </p>
              <p className="text-2xl font-bold mt-0.5"
                style={{ color: "var(--color-primary)" }}>
                {activeMembers}
              </p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full"
                style={{ background: "var(--color-accent)" }} />
              <p className="text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}>
                All Members
              </p>
            </div>
            <span className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background: "color-mix(in oklch, var(--color-primary) 8%, white)",
                color: "var(--color-primary)",
              }}>
              {members.length} total
            </span>
          </div>

          <div className="p-4">
            <MembersTable data={members} />
          </div>
        </div>

      </div>
    </div>
  )
}