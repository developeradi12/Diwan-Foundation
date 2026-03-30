"use client";

import { SquarePen } from "lucide-react";
import Header from "../../../_components/header";
import Link from "next/link";
import { UserTable } from "./_components/user-table";
import { Users, UserCheck, ShieldCheck } from "lucide-react";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { StatCard } from "@/app/(admin)/_components/stats-card";

export const getUsers = async () => {
  const res = await api.get("/admin/users");

  return res.data.data;
};

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [adminCount, setAdminCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [donorCount, setDonorCount] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();

    setUsers(data);

    let a = 0;
    let m = 0;
    let d = 0;

    data.forEach((item: any) => {
      const role = item.role?.toLowerCase();

      if (role === "admin") a++;
      else if (role === "member") m++;
      else if (role === "donor") d++;
    });

    setAdminCount(a);
    setMemberCount(m);
    setDonorCount(d);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="All Users"
      />

      <div className="px-6  max-w-7xl mx-auto space-y-6">
        {/* Page Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}
            >
              Users
            </p>
            <p className="text-sm mt-0.5 text-gray-400">
              Manage all registered users and admins
            </p>
          </div>

          <Link
            href="/admin/users/create"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg w-fit"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-primary)",
            }}
          >
            <SquarePen size={16} strokeWidth={2.5} />
            Create User
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard
            icon={<Users size={20} />}
            label="Total Users"
            value={users.length}
          />
          <StatCard
            icon={<UserCheck size={20} />}
            label="Members"
            value={memberCount}
          />
          <StatCard
            icon={<ShieldCheck size={20} />}
            label="Admins"
            value={adminCount}
          />
          <StatCard
            icon={<ShieldCheck size={20} />}
            label="Donors"
            value={donorCount}
          />
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-1 h-5 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                All Users
              </p>
            </div>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                background:
                  "color-mix(in oklch, var(--color-primary) 8%, white)",
                color: "var(--color-primary)",
              }}
            >
              {users.length} total
            </span>
          </div>

          <div className="p-4">
            <UserTable data={users} /> {/*  server data pass karo */}
          </div>
        </div>
      </div>
    </div>
  );
}
