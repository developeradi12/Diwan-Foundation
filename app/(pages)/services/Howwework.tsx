"use client";

const steps = [
  {
    step: "01",
    icon: "📍",
    title: "Identify the Need",
    desc: "Our community liaison network maps underserved areas and flags gaps in access. We listen before we act.",
    color: "#ef4444",
  },
  {
    step: "02",
    icon: "🤝",
    title: "Build Local Trust",
    desc: "We partner with local leaders, panchayats, and grassroots NGOs before deploying any program.",
    color: "#3b82f6",
  },
  {
    step: "03",
    icon: "🛠️",
    title: "Design the Intervention",
    desc: "Each service is tailored to the community — not a copy-paste from elsewhere. Context shapes every decision.",
    color: "#a855f7",
  },
  {
    step: "04",
    icon: "🚀",
    title: "Deploy & Deliver",
    desc: "Our trained teams deliver on the ground. Every activity is GPS-tagged and photo-documented in real time.",
    color: "#f59e0b",
  },
  {
    step: "05",
    icon: "📊",
    title: "Measure & Report",
    desc: "We track every beneficiary, rupee, and outcome. Monthly impact reports are published publicly.",
    color: "#f97316",
  },
  {
    step: "06",
    icon: "🔄",
    title: "Scale What Works",
    desc: "Proven models are replicated. What fails is discarded. We iterate rapidly and without ego.",
    color: "#16a34a",
  },
];

export default function HowWeWorkSection() {
  return (
    <section className="section" style={{ background: "var(--color-surface-alt)" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 page-fade-in">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
            Our Approach
          </span>
          <h2
            className="mt-2 text-4xl font-black leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            How We Turn{" "}
            <span style={{ color: "var(--color-primary)" }}>Donations into Impact.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            A rigorous, community-led process that ensures every service we deliver is effective, accountable, and sustainable.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="rounded-2xl p-7 flex flex-col gap-4 page-fade-in group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
                animationDelay: `${i * 0.07}s`,
              }}
            >
              {/* Big step number watermark */}
              <span
                className="absolute -top-4 -right-2 text-8xl font-black leading-none select-none pointer-events-none opacity-[0.06]"
                style={{ fontFamily: "var(--font-display)", color: s.color }}
              >
                {s.step}
              </span>

              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${s.color}15` }}
                >
                  {s.icon}
                </div>
                <span
                  className="text-xs font-black uppercase tracking-widest"
                  style={{ color: s.color }}
                >
                  Step {s.step}
                </span>
              </div>

              <h3
                className="text-lg font-black"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                {s.title}
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {s.desc}
              </p>

              {/* Bottom accent bar */}
              <div
                className="h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500 mt-auto"
                style={{ background: s.color }}
              />
            </div>
          ))}
        </div>

        {/* Transparency callout */}
        <div
          className="mt-12 rounded-2xl p-8 grid md:grid-cols-3 gap-6 page-fade-in"
          style={{
            background: "var(--color-primary)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {[
            { icon: "📋", title: "Monthly Reports", desc: "All impact data published every month without exception." },
            { icon: "🔍", title: "Third-Party Audits", desc: "Annual audits by independent CA firms — results made public." },
            { icon: "📞", title: "Open Grievance Line", desc: "Anyone can report misuse or concerns. Every case is investigated." },
          ].map((t) => (
            <div key={t.title} className="flex gap-4 items-start">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: "rgba(249,115,22,0.20)" }}
              >
                {t.icon}
              </span>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--color-text-inverse)" }}>{t.title}</p>
                <p className="text-xs leading-relaxed mt-1 opacity-60" style={{ color: "var(--color-text-inverse)" }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}