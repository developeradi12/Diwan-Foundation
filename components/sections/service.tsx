"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import api from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";

interface Service {
  _id: string;
  title: string;
  shortDescription: string;
  image: string;
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  /* ── Fetch Services ── */
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/services");
      // console.log("res", res);
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
    <section className="py-20 bg-(--color-surface-alt)">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-(--color-accent) font-semibold uppercase tracking-wider">
            Our Services
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-(--color-text) mt-3">
            Creating Impact Through Action
          </h2>

          <p className="text-(--color-text-muted) max-w-2xl mx-auto mt-4">
            We work across multiple sectors to empower communities and bring
            meaningful change to people's lives.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
              >
                {/* Image Skeleton */}
                <Skeleton className="w-28 h-28 rounded-full mb-6" />

                {/* Title */}
                <Skeleton className="h-5 w-32 mb-3" />

                {/* Description */}
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-4 w-36 mb-5" />

                {/* Button */}
                <Skeleton className="h-10 w-28 rounded-full" />
              </div>
            ))
            : services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-between text-center hover:shadow-lg transition"
              >
                <div className="flex flex-col items-center">

                  {/* Image */}
                  <div className="relative w-28 h-28 rounded-full overflow-hidden mb-6 border-4 border-(--color-accent)">
                    <Image
                      src={service.image || "/fallback.png"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-(--color-text)">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-(--color-text-muted) mt-1 mb-5">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Button */}
                <Link href="/services">
                  <Button className="rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E] cursor-pointer">
                    View More
                  </Button>
                </Link>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
}