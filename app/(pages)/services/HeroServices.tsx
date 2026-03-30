"use client";

import Link from "next/link";
import { useState } from "react";

export default function HeroServices() {
  const [active, setActive] = useState<string | null>(null);
  const cards = [
    { top: "0%", left: "5%", label: "Healthcare", color: "#ef4444" },
    { top: "0%", left: "45%", label: "Education", color: "#3b82f6" },

    { top: "28%", left: "70%", label: "Women Empowerment", color: "#a855f7" },

    { top: "54%", left: "72%", label: "Disaster Relief", color: "#f59e0b" },
    { top: "66%", left: "40%", label: "Blood Donation", color: "#f97316" },
    { top: "46%", left: "8%", label: "Empowering Grassroots", color: "#10b981" },
    { top: "65%", left: "2%", label: "Livelihoods", color: "#6366f1" },

    { top: "26%", left: "30%", label: "Child Education", color: "#ec4899" },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-primary)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Accent blobs */}
      <div
        className="absolute -top-28 -right-28 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: "var(--color-accent)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-5 pointer-events-none"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="container section">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 blog-fade-in text-xs">
          <a
            href="/"
            className="font-semibold uppercase tracking-widest opacity-50 hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-inverse)" }}
          >
            Home
          </a>
          <span className="opacity-30" style={{ color: "var(--color-text-inverse)" }}>/</span>
          <a
            href="/services"
            className="font-semibold uppercase tracking-widest opacity-50 hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-inverse)" }}
          >
            Our Services
          </a>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6 page-fade-in" style={{ animationDelay: "0.1s" }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{
                background: "rgba(249,115,22,0.15)",
                color: "var(--color-accent)",
                border: "1px solid rgba(249,115,22,0.3)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--color-accent)" }} />
              Free · Community-Driven · Impact-Focused
            </div>

            <h1
              className="font-black leading-[1.05] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-inverse)",
                fontSize: "clamp(36px, 5vw, 60px)",
              }}
            >
              Services That{" "}
              <span className="relative inline-block" style={{ color: "var(--color-accent)" }}>
                Restore Dignity
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                  <path d="M2 6 C60 2, 140 2, 210 4 C260 6, 285 3, 298 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-base leading-relaxed opacity-75 max-w-lg" style={{ color: "var(--color-text-inverse)" }}>
              From free medical camps to blood donation drives, from scholarships
              to disaster kits — every service we offer is free, human-centred, and
              built to last.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/donate"
                className="btn text-sm button hover:text-(--color-accent) "
              >
                Support Our Work
              </Link>
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="relative h-72 page-fade-in" style={{ animationDelay: "0.2s" }}>
            {cards.map((card) => (
              <div
                key={card.label}
                onClick={() => setActive(card.label)}
                className={`absolute flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
          transition-all duration-300 hover:scale-110 hover:-translate-y-1
          ${active === card.label ? "scale-110 ring-2" : ""}`}
                style={{
                  top: card.top,
                  left: card.left,
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "var(--shadow-md)",
                  minWidth: "160px",
                  borderColor: card.color,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: card.color }}
                />

                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        {/* <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 rounded-2xl overflow-hidden page-fade-in"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.10)",
            animationDelay: "0.3s",
          }}
        >
          {[
            { v: "5", l: "Core Service Areas" },
            { v: "48+", l: "Active Programs" },
            { v: "47", l: "Districts Covered" },
            { v: "100%", l: "Free of Cost" },
          ].map((s) => (
            <div key={s.l} className="px-6 py-5 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-2xl font-black" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent)" }}>{s.v}</p>
              <p className="text-xs mt-1 opacity-55 uppercase tracking-wider" style={{ color: "var(--color-text-inverse)" }}>{s.l}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}