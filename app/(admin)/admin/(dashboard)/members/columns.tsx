"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Member } from "@/schemas/UserSchema"

export const columns = (
    onDelete: (member: Member) => void
): ColumnDef<Member>[] => [
        {
            accessorKey: "imageUrl",
            header: "Member",
            cell: ({ row }) => {
                const image = row.original.imageUrl
                const name = row.original.fullName

                return (
                    <div className="flex items-center gap-3">
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-200"
                            />
                        ) : (
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                                style={{
                                    background: "color-mix(in oklch, var(--color-primary) 10%, white)",
                                    color: "var(--color-primary)",
                                }}
                            >
                                {name?.charAt(0)?.toUpperCase() ?? "?"}
                            </div>
                        )}
                        <span className="font-medium text-sm" style={{ color: "var(--color-primary)" }}>
                            {name}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => (
                <span className="text-sm text-gray-600 font-mono">
                    {row.original.phone ?? "—"}
                </span>
            ),
        },
        {
            accessorKey: "membershipType",
            header: "Plan",
            cell: ({ row }) => {
                const plan = row.original.membershipPlan?.membershipType
                if (!plan) return <span className="text-gray-400 text-sm">—</span>
                return (
                    <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                            background: "color-mix(in oklch, var(--color-accent) 20%, white)",
                            color: "var(--color-primary)",
                        }}
                    >
                        {plan}
                    </span>
                )
            },
        },
        {
            accessorKey: "membershipStartDate",
            header: "Start Date",
            cell: ({ row }) => {
                const date = row.original.membershipStartDate
                if (!date) return <span className="text-gray-400 text-sm">—</span>
                return (
                    <span className="text-sm text-gray-600">
                        {new Date(date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                )
            },
        },
        {
            id: "status",
            header: "Status",
            cell: ({ row }) => {
                const startDate = row.original.membershipStartDate
                const duration = row.original.membershipPlan?.membershipDuration

                if (!startDate || !duration) return <span className="text-gray-400 text-sm">—</span>

                // Calculate end date from start date + duration (in months)
                const end = new Date(startDate)
                end.setMonth(end.getMonth() + Number(duration))

                const isActive = end >= new Date()

                return (
                    <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                            background: isActive
                                ? "color-mix(in oklch, var(--color-success) 12%, white)"
                                : "color-mix(in oklch, var(--color-danger) 10%, white)",
                            color: isActive ? "var(--color-success)" : "var(--color-danger)",
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: isActive ? "var(--color-success)" : "var(--color-danger)" }}
                        />
                        {isActive ? "Active" : "Expired"}
                    </span>
                )
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const id = row.original._id
                return (
                    <div className="flex gap-2">
                        <Link href={`/admin/members/edit/${id}`}>
                            <button
                                className="p-2 rounded-lg border transition-all duration-150  cursor-pointer hover:scale-105"
                                style={{
                                    borderColor: "color-mix(in oklch, var(--color-primary) 20%, white)",
                                    color: "var(--color-primary)",
                                }}
                            >
                                <Pencil size={14} />
                            </button>
                        </Link>
                        <button
                            onClick={() => onDelete(row.original)}
                            className="p-2 rounded-lg border transition-all duration-150 cursor-pointer hover:scale-105"
                            style={{
                                borderColor: "color-mix(in oklch, var(--color-danger) 30%, white)",
                                color: "var(--color-danger)",
                            }}
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                )
            },
        },
    ]