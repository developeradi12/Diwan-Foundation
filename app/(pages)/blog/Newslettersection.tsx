"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      className="py-16"
      style={{ background: "var(--color-surface-alt)" }}
    >
      <div className="container">
        <div
          className="rounded-2xl p-8 md:p-12 relative overflow-hidden blog-fade-in"
          style={{
            background: "var(--color-primary)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* Decorative */}
          <div
            className="absolute -top-14 -right-14 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: "var(--color-accent)" }}
          />
          <div
            className="absolute bottom-0 left-8 w-40 h-40 rounded-full opacity-5 pointer-events-none"
            style={{ background: "var(--color-accent)" }}
          />

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div className="space-y-3">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                Stay Updated
              </span>
              <h2
                className="text-3xl font-black leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-inverse)",
                }}
              >
                Stories That Matter,{" "}
                <span style={{ color: "var(--color-accent)" }}>
                  In Your Inbox.
                </span>
              </h2>
              <p
                className="text-sm leading-relaxed opacity-70"
                style={{ color: "var(--color-text-inverse)" }}
              >
                Monthly field reports, impact updates, and stories from the
                communities we serve. No spam — ever.
              </p>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div
                  className="rounded-xl p-6 text-center"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <p className="text-2xl mb-2">🎉</p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text-inverse)" }}
                  >
                    You're subscribed! Thank you.
                  </p>
                  <p
                    className="text-xs mt-1 opacity-60"
                    style={{ color: "var(--color-text-inverse)" }}
                  >
                    Expect your first story within the week.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.20)",
                      color: "var(--color-text-inverse)",
                    }}
                  />
                  <button
                    type="submit"
                    className="button px-6 py-3 text-sm whitespace-nowrap shrink-0"
                    style={{ borderRadius: "var(--radius-lg)" }}
                  >
                    Subscribe →
                  </button>
                </form>
              )}
              <p
                className="text-xs mt-3 opacity-40"
                style={{ color: "var(--color-text-inverse)" }}
              >
                Join 12,000+ readers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}