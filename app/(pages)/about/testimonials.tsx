"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  message: string;
  image?: string;
  rating?: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/admin/testimonials");
      setTestimonials(res.data.testimonials || []);
    } catch {
      console.error("Failed to fetch testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            What our supporters say
          </h2>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id}>
              <Card className="h-full shadow-md rounded-2xl border-none bg-white hover:shadow-lg transition">
                <CardContent className="p-6">

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      {t.image ? (
                        <Image
                          src={t.image}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#0C3E2A] text-white font-bold">
                          {getInitials(t.name)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role || "Donor"}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 text-[var(--color-accent)] mb-4">
                      {[...Array(Math.max(0, Math.floor(Number(t.rating) || 5)))].map((_, i) =>(
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {t.message}
                  </p>

                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}