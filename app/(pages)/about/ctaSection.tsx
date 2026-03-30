"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section" style={{ background: "var(--color-surface)" }}>
      <div className="container">
        <div
          className="rounded-3xl p-10 md:p-16 relative overflow-hidden text-center about-fade-in"
          style={{ background: "var(--color-primary)" }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -top-16 -left-16 w-72 h-72 rounded-full opacity-10"
            style={{ background: "var(--color-accent)" }}
          />
          <div
            className="absolute -bottom-20 -right-16 w-96 h-96 rounded-full opacity-10"
            style={{ background: "var(--color-accent)" }}
          />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Take Action
            </span>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-inverse)",
              }}
            >
              Be the Reason Someone
              <br />
              <span style={{ color: "var(--color-accent)" }}>
                Smiles Today.
              </span>
            </h2>
            <p
              className="text-base opacity-75 leading-relaxed"
              style={{ color: "var(--color-text-inverse)" }}
            >
              Whether you donate ₹100 or ₹1,00,000 — whether you volunteer for
              one day or one year — your contribution becomes someone's
              lifeline. Start today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/donate"
                className="text-sm px-8 py-3 rounded-xl"
              >
                <Button className="rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E] cursor-pointer">
                  Donate Now →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
