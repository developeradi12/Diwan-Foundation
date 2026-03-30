"use client";

export default function HeroBlog() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-primary)" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "var(--color-accent)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full opacity-5 pointer-events-none"
        style={{ background: "var(--color-accent)" }}
      />
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container section">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 blog-fade-in">
          <span className="text-xs font-semibold uppercase tracking-widest opacity-50" style={{ color: "var(--color-text-inverse)" }}>Home</span>
          <span className="opacity-30" style={{ color: "var(--color-text-inverse)" }}>/</span>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>Blog & Stories</span>
        </div>

        <div className="max-w-3xl blog-fade-in" style={{ animationDelay: "0.1s" }}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{
              background: "rgba(249,115,22,0.15)",
              color: "var(--color-accent)",
              border: "1px solid rgba(249,115,22,0.3)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--color-accent)" }} />
            Field Reports · Impact Stories · Awareness
          </div>

          <h1
            className="font-black leading-[1.05] tracking-tight mb-5"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-inverse)",
              fontSize: "clamp(36px, 5vw, 64px)",
            }}
          >
            Stories From{" "}
            <span
              className="relative inline-block"
              style={{ color: "var(--color-accent)" }}
            >
              the Ground.
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 260 8" fill="none">
                <path d="M2 6 C50 2, 120 2, 180 4 C220 6, 245 3, 258 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p
            className="text-base leading-relaxed opacity-75 max-w-xl"
            style={{ color: "var(--color-text-inverse)" }}
          >
            Real field reports, impact stories, health awareness, and lessons
            from communities we serve across India. Every post is a window into
            the work — unfiltered.
          </p>
        </div>

        {/* Stats row */}
        {/* <div
          className="flex flex-wrap gap-6 mt-10 pt-10 blog-fade-in"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.10)",
            animationDelay: "0.2s",
          }}
        >
          {[
            { value: "48+", label: "Articles Published" },
            { value: "6", label: "Cause Categories" },
            { value: "12K+", label: "Monthly Readers" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span
                className="text-2xl font-black"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-accent)",
                }}
              >
                {s.value}
              </span>
              <span className="text-xs opacity-50 uppercase tracking-wider" style={{ color: "var(--color-text-inverse)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}