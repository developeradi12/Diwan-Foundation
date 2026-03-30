"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import { Testimonial } from "@/types/testimonail";


function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);

  /* ── Fetch API ── */
  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/admin/testimonials"); // 👈 adjust if needed
      setTestimonials(res.data.testimonials || []);
    } catch {
      console.error("Failed to fetch testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ── Auto slide ── */
  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) return null;

  const t = testimonials[index];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Image */}
        <div className="relative">
          <Image
            src="/images/gallery/testimonial.png"
            alt="Helping children"
            width={500}
            height={400}
            className="rounded-3xl object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <p className="text-(--color-text) font-semibold uppercase tracking-wider mb-2">
            Testimonials
          </p>

          <h2 className="text-4xl font-bold mb-8">
            Stories from people who support our mission
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-md rounded-2xl border-none bg-white">
                <CardContent className="p-8">

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">

                      {/* Avatar */}
                      {t.image ? (
                        <Image
                          src={t.image}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0C3E2A] text-white text-lg font-bold">
                          {getInitials(t.name)}
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold">{t.name}</h4>
                        <p className="text-sm text-gray-500">{t.role || "Donor"}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 text-(--color-accent)">
                      {[...Array(Math.max(0, Math.floor(Number(t.rating) || 5)))].map((_, i) =>
                      (<Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>


                  <p className="text-gray-600 leading-relaxed">
                    {t.message}
                  </p>

                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex gap-2 mt-6">
            {testimonials.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full cursor-pointer transition-all ${i === index
                  ? "bg-[var(--color-primary)] w-5"
                  : "bg-gray-300 w-2"
                  }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}