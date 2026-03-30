"use client";

export default function ContactHero() {
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
          <span
            className="text-xs font-semibold uppercase tracking-widest opacity-50"
            style={{ color: "var(--color-text-inverse)" }}
          >
            Home
          </span>
          <span
            className="opacity-30"
            style={{ color: "var(--color-text-inverse)" }}
          >
            /
          </span>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-accent)" }}
          >
            contact us
          </span>
        </div>

        <div
          className="max-w-3xl blog-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <h1
            className="font-black leading-[1.05] tracking-tight mb-5"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-inverse)",
              fontSize: "clamp(36px, 5vw, 64px)",
            }}
          >
            Contact{" "}
            <span
              className="relative inline-block"
              style={{ color: "var(--color-accent)" }}
            >
              Us
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 260 8"
                fill="none"
              >
                <path
                  d="M2 6 C50 2, 120 2, 180 4 C220 6, 245 3, 258 2"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="text-base leading-relaxed opacity-75 max-w-xl"
            style={{ color: "var(--color-text-inverse)" }}
          >
            if you have any doubt in your mind than feel free to contact us.
          </p>
        </div>
      </div>
    </section>
  );
}
