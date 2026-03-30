"use client";

export default function ServicesCTA() {
  return (
    <section className="section" style={{ background: "var(--color-surface)" }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Beneficiary card */}
          <div
            className="rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden page-fade-in"
            style={{
              background: "var(--color-primary)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
              style={{ background: "var(--color-accent)" }}
            />
            <div className="text-4xl">🙋</div>
            <div className="space-y-2">
              <h3
                className="text-2xl font-black"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text-inverse)" }}
              >
                Need Our Services?
              </h3>
              <p className="text-sm leading-relaxed opacity-70" style={{ color: "var(--color-text-inverse)" }}>
                All our services are completely free. No paperwork, no income certificates, no wait lists. Just reach out.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/contact" className="text-white text-sm pt-4">Connect Us →</a>
              <a
                href="tel: +91 87588 19249"
                className="btn text-sm"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  color: "var(--color-text-inverse)",
                  border: "1px solid rgba(255,255,255,0.20)",
                }}
              >
                📞 Helpline: +91 87588 19249
              </a>
            </div>
          </div>

          {/* Supporter card */}
          <div
            className="rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden page-fade-in"
            style={{
              background: "var(--color-surface-alt)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
              animationDelay: "0.1s",
            }}
          >
            <div className="text-4xl">💛</div>
            <div className="space-y-2">
              <h3
                className="text-2xl font-black"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
              >
                Want to Support Us?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                Your donation, volunteering, or CSR partnership directly powers these five service pillars. Every contribution matters.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/donate" className="btn btn-primary text-sm">Donate Now →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}