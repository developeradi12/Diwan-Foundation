"use client";
import { Button } from "@/components/ui/button";
import { Check, PencilIcon, Trash2 } from "lucide-react";
import DeleteAlert from "./deletAlert";
import Link from "next/link";

interface MembershipCardProps {
  id: string;
  type: string;
  duration: number;
  price: number;
  popular?: boolean;
 features: string[];
}

const MembershipCard = ({
  id,
  type,
  duration,
  price,
  popular = false,
  features=[],
}: MembershipCardProps) => {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg relative"
      style={{
        border: popular
          ? "2px solid var(--color-primary)"
          : "0.5px solid var(--color-border)",
        background: "var(--color-background)",
      }}
    >
      {/* Popular Badge */}
      {popular && (
        <div
          className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-primary)",
          }}
        >
          Popular
        </div>
      )}

      {/* Card Header */}
      <div
        className="px-5 pt-5 pb-4"
        style={{ background: "var(--color-primary)" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: "var(--color-accent)" }}
        >
          Membership Plan
        </p>

        <div className="flex items-start justify-between gap-3">
          <p className="text-xl font-semibold text-white">{type}</p>
          <span
            className="text-xs font-medium px-3 py-1 rounded-full shrink-0 mt-0.5"
            style={{
              background: "rgba(226,173,86,0.2)",
              border: "0.5px solid rgba(226,173,86,0.4)",
              color: "var(--color-accent)",
            }}
          >
            {duration} Month{duration > 1 ? "s" : ""}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-1">
          <span
            className="text-lg font-normal"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            ₹
          </span>
          <span className="text-3xl font-semibold text-white leading-none">
            {price.toLocaleString("en-IN")}
          </span>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            /{duration} {duration > 1 ? "months" : "month"}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-5 py-4">
        <ul className="space-y-2.5 mb-5">
          {features.map((feature, index) => (
            <li
              key={feature}
              className="flex items-center gap-2.5 text-sm text-gray-500"
            >
              <span
                className="flex items-center justify-center w-4 h-4 rounded-full shrink-0"
                style={{
                  background:
                    "color-mix(in oklch, var(--color-accent) 25%, white)",
                }}
              >
                <Check
                  size={10}
                  strokeWidth={3}
                  style={{ color: "var(--color-primary)" }}
                />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <DeleteAlert id={id} />
          <Link href={`/admin/memberships/edit/${id}`}>
            <Button className="text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 hover:opacity-90 hover:scale-[1.01]">
              <PencilIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
