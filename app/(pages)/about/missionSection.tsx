"use client";

const pillars = [
  {
    icon: "🎯",
    title: "Our Mission",
    desc: "To empower underserved communities through targeted programs in healthcare, education, and social welfare — creating sustainable, lasting change from the ground up.",
  },
  {
    icon: "🔭",
    title: "Our Vision",
    desc: "A world where every individual, regardless of circumstance, has equal access to health, knowledge, and opportunity — and no one is left behind in times of crisis.",
  },
  {
    icon: "💎",
    title: "Our Values",
    desc: "Transparency, compassion, inclusivity, and accountability guide every decision we make. We believe charity begins with integrity.",
  },
];

const values = [
  "Dignity for every person",
  "Community-led solutions",
  "Zero tolerance for inequality",
  "100% fund accountability",
  "Long-term impact focus",
  "Collaboration over competition",
];

export default function MissionSection() {
  return (
    <section id="mission" className="section" style={{ background: "var(--color-surface-alt)" }}>
      <div className="container">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14 about-fade-in">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--color-accent)" }}
          >
            Why We Exist
          </span>
          <h2
            className="mt-2 text-4xl font-black leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            Driven by Purpose,
            <br />
            <span style={{ color: "var(--color-primary)" }}>Guided by Values</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Our work is rooted in a simple belief — that every act of compassion,
            no matter how small, creates a ripple that changes the world.
          </p>
        </div>

        {/* Mission / Vision / Values cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="rounded-2xl p-7 flex flex-col gap-4 about-fade-in group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "rgba(249,115,22,0.10)" }}
              >
                {p.icon}
              </div>
              <h3
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column values layout */}
        <div
          className="rounded-2xl overflow-hidden grid lg:grid-cols-2 about-fade-in"
          style={{
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {/* Left — dark panel */}
          <div
            className="p-10 flex flex-col justify-center space-y-6"
            style={{ background: "var(--color-primary)" }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              What We Stand For
            </span>
            <h3
              className="text-3xl font-black leading-snug"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-inverse)",
              }}
            >
              Principles that <br />
              never compromise.
            </h3>
            <p
              className="text-sm leading-relaxed opacity-70"
              style={{ color: "var(--color-text-inverse)" }}
            >
              Every program we run, every rupee we spend, every community we serve
              is measured against these non-negotiable principles.
            </p>
          </div>

          {/* Right — values list */}
          <div
            className="p-10 grid grid-cols-1 sm:grid-cols-2 gap-4 content-center"
            style={{ background: "var(--color-surface)" }}
          >
            {values.map((v) => (
              <div key={v} className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{
                    background: "rgba(249,115,22,0.12)",
                    color: "var(--color-accent)",
                  }}
                >
                  ✓
                </span>
                <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}