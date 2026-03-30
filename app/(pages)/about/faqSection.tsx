"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How is my donation used?",
    a: "100% of public donations go directly to our programs. Administrative costs are covered by our institutional grants and board contributions. Every rupee you give reaches the community it was intended for — we publish monthly transparency reports to prove it.",
  },
  {
    q: "Can I choose which cause my donation supports?",
    a: "Absolutely. During checkout, you can designate your donation to any of our five cause areas — Healthcare, Education, Women Empowerment, Disaster Relief, or Blood Donation. Undesignated donations are distributed based on current need.",
  },
  {
    q: "Is my donation tax deductible?",
    a: "Yes. HopeForward is registered under Section 80G of the Income Tax Act. Donations above ₹500 are eligible for a 50% tax deduction. We issue official receipts within 24 hours of every donation.",
  },
  {
    q: "How can I volunteer with HopeForward?",
    a: "We welcome volunteers across skill areas — medical, educational, technical, and field support. Fill out our Volunteer Registration form and our team will reach out within 3 business days to match you with the right program.",
  },
  {
    q: "How do you ensure aid reaches the right people?",
    a: "We partner with local panchayats, community leaders, and NGO networks to identify genuine beneficiaries. All disbursements are GPS-tagged and photo-documented. Our field officers conduct post-delivery verification visits.",
  },
  {
    q: "Can organisations partner or sponsor with HopeForward?",
    a: "Yes — we actively seek CSR partnerships, institutional sponsors, and co-implementation partners. Write to us at partnerships@hopeforward.org or call our partnership desk. We'll prepare a tailored impact deck for you.",
  },
  {
    q: "How do I register as a blood donor?",
    a: "Visit our Blood Donation page, fill in your details, and choose a donation camp near you. We'll send you reminders before each camp. You can also call our 24/7 helpline for emergency blood requests.",
  },
  {
    q: "Do you work in rural areas?",
    a: "Yes — over 70% of our programs operate in Tier 3 and rural communities where access to services is most limited. We believe those hardest to reach need us the most.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" style={{ background: "var(--color-surface-alt)" }}>
      <div className="container">

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-start">

          {/* Left sticky header */}
          <div className="lg:sticky lg:top-28 space-y-6 about-fade-in">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Got Questions?
            </span>
            <h2
              className="text-4xl font-black leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              Answers to{" "}
              <span style={{ color: "var(--color-primary)" }}>What You're Thinking.</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              We believe in radical transparency. If you don't see your question
              here, our team responds to every email within one business day.
            </p>

            <a
              href="mailto:hello@hopeforward.org"
              className="btn btn-primary inline-flex text-sm"
            >
              Ask Us Directly →
            </a>

            {/* Trust badge */}
            <div
              className="rounded-xl p-5 space-y-1 mt-4"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                Trusted & Verified
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["80G Certified", "FCRA Approved", "ISO Verified", "GuideStar Listed"].map((b) => (
                  <span
                    key={b}
                    className="text-xs px-2.5 py-1 rounded-md font-semibold"
                    style={{
                      background: "rgba(249,115,22,0.09)",
                      color: "var(--color-accent)",
                      border: "1px solid rgba(249,115,22,0.18)",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right accordion */}
          <div className="space-y-3 about-fade-in" style={{ animationDelay: "0.1s" }}>
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "var(--color-surface)",
                    border: isOpen
                      ? "1px solid var(--color-accent)"
                      : "1px solid var(--color-border)",
                    boxShadow: isOpen ? "0 0 0 3px rgba(249,115,22,0.08)" : "var(--shadow-sm)",
                  }}
                >
                  {/* Question */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-all"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span
                      className="text-sm font-semibold"
                      style={{ color: isOpen ? "var(--color-accent)" : "var(--color-text)" }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-transform duration-300"
                      style={{
                        background: isOpen ? "var(--color-accent)" : "var(--color-surface-alt)",
                        color: isOpen ? "#fff" : "var(--color-text-muted)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <div
                      className="px-6 pb-5"
                      style={{ borderTop: "1px solid var(--color-border)" }}
                    >
                      <p
                        className="text-sm leading-relaxed pt-4"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}