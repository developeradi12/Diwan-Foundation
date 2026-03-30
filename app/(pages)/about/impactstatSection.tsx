"use client";

const stats = [
  { icon: "🏥", value: "3,200+", label: "Patients Treated", color: "#ef4444" },
  { icon: "📚", value: "1,800+", label: "Children in School", color: "#3b82f6" },
  { icon: "👩", value: "620", label: "Women Upskilled", color: "#a855f7" },
  { icon: "🚨", value: "₹80L+", label: "Disaster Aid Given", color: "#f59e0b" },
  { icon: "🩸", value: "9,400+", label: "Blood Units Collected", color: "#f97316" },
  { icon: "🌍", value: "47", label: "Districts Covered", color: "#16a34a" },
];

export default function ImpactStatsSection() {
  return (
    <section
      className="py-16"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="container">

        {/* Header */}
        <div className="text-center mb-12 about-fade-in">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--color-accent)" }}
          >
            Our Impact in Numbers
          </span>
          <h2
            className="mt-2 text-3xl font-black"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-inverse)",
            }}
          >
            Every Number is a Life.
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl p-5 text-center flex flex-col items-center gap-3 about-fade-in transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${s.color}25` }}
              >
                {s.icon}
              </div>
              <p
                className="text-2xl font-black leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: s.color,
                }}
              >
                {s.value}
              </p>
              <p
                className="text-xs text-center leading-snug opacity-70"
                style={{ color: "var(--color-text-inverse)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}