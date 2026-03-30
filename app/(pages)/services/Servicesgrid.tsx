"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Image from "next/image";

interface Service {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
}

export default function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ── Fetch Services ── */
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/services");
      setServices(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section
      id="services-grid"
      className="section"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="container">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 page-fade-in">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
            What We Offer
          </span>
          <h2 className="mt-2 text-4xl font-black leading-tight" style={{ color: "var(--color-text)" }}>
            Eight Pillars of{" "}
            <span style={{ color: "var(--color-primary)" }}>Free Service.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Click any service to explore how we deliver it.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="flex flex-col gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl p-6 animate-pulse bg-gray-100">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-xl bg-gray-300" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-300 mb-2" />
                    <div className="h-5 w-40 bg-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Service cards */
          <div className="flex flex-col gap-6">
            {services.map((s, i) => {
              const isOpen = active === s._id;

              return (
                <div
                  key={s._id}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    border: "1.5px solid var(--color-border)",
                    animationDelay: `${i * 0.07}s`,
                  }}
                >
                  {/* Header */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                    onClick={() => setActive(isOpen ? null : s._id)}
                  >
                    <div className="flex items-center gap-4">

                      {/* ✅ IMAGE instead of icon */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden">
                        <Image
                          src={s.image || "/fallback.png"}
                          alt={s.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-xs uppercase text-gray-500">
                          {s.shortDescription}
                        </p>
                        <h3 className="text-lg font-bold text-(--color-text)">
                          {s.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-sm font-semibold">
                      {isOpen ? "Close -" : "View More +"}
                    </span>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="px-6 pb-8 border-t border-gray-200">
                      <p className="text-sm mt-5 text-(--color-text-muted)">
                        {s.description}
                      </p>

                      <div className="flex justify-end mt-5">
                        <a
                          href="/contact"
                          className="btn btn-primary text-xs px-5 py-2.5"
                        >
                          Connect Now →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}