"use client";

import Image from "next/image";

const stats = [
  { value: "12K+", label: "Lives Impacted" },
  { value: "48", label: "Active Projects" },
  { value: "6", label: "Cause Areas" },
  { value: "200+", label: "Volunteers" },
];

export default function HeroAbout() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--color-primary)" }}
      />

      {/* Decorative circles */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 -z-10"
        style={{ background: "var(--color-accent)" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-5 -z-10"
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
            href="/About"
            className="font-semibold uppercase tracking-widest opacity-50 hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-inverse)" }}
          >
            About
          </a>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6 about-fade-in" style={{ animationDelay: "0.1s" }}>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "rgba(249,115,22,0.15)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(249,115,22,0.3)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--color-accent)" }} />
                Est. 2026 · Serving Communities
              </div>

              <h1
                className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-inverse)",
                }}
              >
                We Exist to{" "}
                <span
                  className="relative inline-block"
                  style={{ color: "var(--color-accent)" }}
                >
                  Uplift
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                  >
                    <path
                      d="M2 6 C40 2, 80 2, 120 4 C160 6, 180 3, 198 2"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                Every Life.
              </h1>

              <p
                className="text-base leading-relaxed max-w-lg opacity-80"
                style={{ color: "var(--color-text-inverse)" }}
              >
                HopeForward is a grassroots charity dedicated to transforming lives across
                healthcare, education, women empowerment, disaster relief, and blood
                donation — because every person deserves dignity and opportunity.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {/* <a
                href="#mission"
                className="btn btn-primary text-sm"
              >
                Our Mission
              </a> */}
                <a
                  href="#team"
                  className="btn text-sm"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "var(--color-text-inverse)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Meet The Team
                </a>
              </div>
            </div>

            {/* Right — image placeholder with overlay card */}
            <div className="relative about-fade-in" style={{ animationDelay: "0.2s" }}>
              <div
                className="rounded-2xl overflow-hidden aspect-[4/3] relative"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {/* Image */}
                <Image
                  src="/images/gallery/photo4.jpeg"
                  alt="Fakir Diwan Community"
                  fill
                  className="object-cover"
                />

                {/* Floating card */}
                {/* <div
                className="absolute bottom-4 left-4 right-4 rounded-xl px-5 py-4 flex items-center gap-4"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl"
                  style={{ background: "rgba(249,115,22,0.12)" }}
                >
                  ❤️
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--color-text)" }}>
                    1,200+ Donors This Month
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    Join our growing community of changemakers
                  </p>
                </div>
              </div> */}
              </div>
            </div>
          </div>

          {/* Stats strip */}
          {/* <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 rounded-2xl overflow-hidden about-fade-in"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            animationDelay: "0.3s",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="px-6 py-6 text-center"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <p
                className="text-3xl font-black"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-accent)",
                }}
              >
                {s.value}
              </p>
              <p className="text-xs mt-1 opacity-60 uppercase tracking-wider" style={{ color: "var(--color-text-inverse)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}