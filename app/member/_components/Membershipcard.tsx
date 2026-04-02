"use client"

import Link from "next/link"

interface MembershipPlan {
    _id: string
    membershipType: string
    membershipFee: number
    membershipDuration: number
    features?: string[]
}

interface Props {
    membership?: MembershipPlan | null
    startDate?: string | Date | null
    endDate?: string | Date | null
}

// ─── Helpers ─────────────────────────
function formatDate(d?: string | Date | null) {
    if (!d) return "—"

    const date = new Date(d)

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

function isActive(endDate?: string | Date | null) {
    if (!endDate) return false
    return new Date(endDate) > new Date()
}

// ─── Component ───────────────────────
export default function MembershipCard({
    membership,
    startDate,
    endDate,
}: Props) {

    const active = isActive(endDate)

    return (
        <div
            className={`rounded-2xl p-5 text-white shadow-md ${active
                ? "bg-gradient-to-r from-blue-600 to-blue-500"
                : "bg-gradient-to-r from-gray-500 to-gray-400"
                }`}
        >

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs uppercase tracking-widest opacity-75 mb-1">
                        Membership
                    </p>

                    <h3 className="text-xl font-semibold">
                        {membership?.membershipType || "No Plan"}
                    </h3>

                    {membership?.membershipDuration && (
                        <p className="text-sm opacity-80 mt-1">
                            {membership.membershipDuration} months
                        </p>
                    )}
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20">
                    {active ? "Active" : "Expired"}
                </span>
            </div>

            {/* Info */}
            <div className="mt-4 flex flex-wrap gap-6 text-sm">

                <div>
                    <p className="opacity-60 text-xs">Start Date</p>
                    <p className="font-medium">{formatDate(startDate)}</p>
                </div>

                <div>
                    <p className="opacity-60 text-xs">End Date</p>
                    <p className="font-medium">{formatDate(endDate)}</p>
                </div>

                {membership?.membershipFee !== undefined && (
                    <div>
                        <p className="opacity-60 text-xs">Price</p>
                        <p className="font-medium">₹{membership.membershipFee}</p>
                    </div>
                )}
            </div>

            {/* Features */}
            {membership?.features && membership.features.length > 0 && (
                <div className="mt-4">
                    <p className="text-xs opacity-70 mb-1">Features</p>
                    <ul className="text-sm space-y-1">
                        {membership.features.map((f, i) => (
                            <li key={i}>• {f}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* CTA */}
            {!membership && (
                <Link
                    href="/contact"
                    className="inline-block mt-4 bg-white text-black px-4 py-2 rounded-lg text-sm"
                >
                    Buy Membership
                </Link>
            )}
        </div>
    )
}