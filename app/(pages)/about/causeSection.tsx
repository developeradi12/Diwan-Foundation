"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/axios";

interface Service {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
}

export default function CausesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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
    <section className="section" style={{ background: "var(--color-surface)" }}>
      <div className="container">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-(--color-accent)">
            What We Do
          </span>
          <h2 className="mt-2 text-4xl font-black leading-tight text-(--color-text)">
            Eight Causes,{" "}
            <span style={{ color: "var(--color-primary)" }}>One Heart.</span>
          </h2>
          <p className="mt-4 text-sm text-(--color-text-muted)">
            We don't believe in narrow focus. Real change requires tackling
            interconnected challenges together.
          </p>
        </div>

        {/* Skeleton */}
        {loading ? (
          <div className="grid md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-100 animate-pulse">
                <div className="w-12 h-12 bg-gray-300 rounded-xl mb-4" />
                <div className="h-5 bg-gray-300 mb-3 w-32" />
                <div className="h-4 bg-gray-300 mb-2 w-full" />
                <div className="h-4 bg-gray-300 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* First Row */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {services.slice(0, 4).map((s, i) => (
                <CauseCard key={s._id} service={s} delay={i * 0.08} />
              ))}
            </div>

            {/* Second Row */}
            <div className="grid md:grid-cols-4 gap-4">
              {services.slice(4).map((s, i) => (
                <CauseCard key={s._id} service={s} delay={(i + 3) * 0.08} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ── Card ── */
function CauseCard({
  service,
  delay,
}: {
  service: Service;
  delay: number;
}) {
  return (
    <div
      className="rounded-2xl p-7 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
      style={{
        background: "var(--color-surface-alt)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
        animationDelay: `${delay}s`,
      }}
    >
      {/* IMAGE instead of icon */}
      <div className="w-12 h-12 relative rounded-xl overflow-hidden">
        <Image
          src={service.image || "/fallback.png"}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-(--color-text)">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-(--color-text-muted)">
        {service.shortDescription}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-1 pt-2">
        <Link href="/donate" className="text-xs font-semibold hover:scale-95">
          Donate →
        </Link>
      </div>
    </div>
  );
}