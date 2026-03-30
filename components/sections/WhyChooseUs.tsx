"use client";

import Image from "next/image";
import {
  ShieldCheck,
  HandHeart,
  Users2,
  Globe,
  BadgeIndianRupee,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src="/images/gallery/why.jpeg"
            alt="charity helping community"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <p className="text-(--color-accent) font-semibold uppercase tracking-wider mb-3">
            Why Choose Us
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-(--color-text) mb-6">
            Creating meaningful change together
          </h2>

          <p className="text-(--color-text-muted) mb-8">
            Our mission is to uplift communities through compassion,
            transparency, and impactful initiatives that improve lives and
            create long-term sustainable change.
          </p>

          {/* Features */}
          <div className="space-y-6 ">
            <div className="flex gap-4 border border-gray-200 py-4 px-5  rounded-lg hover:scale-105 transition-transform ">
              <ShieldCheck className="text-(--color-accent)" size={28} />
              <div>
                <h4 className="font-semibold text-(--color-text)">
                  Trusted Organization
                </h4>
                <p className="text-(--color-text-muted)">
                  Transparent operations and accountable charity programs.
                </p>
              </div>
            </div>

            <div className="flex gap-4 border border-gray-200 py-4 px-5 rounded-lg hover:scale-105 transition-transform">
              <HandHeart className="text-(--color-accent)" size={28} />
              <div>
                <h4 className="font-semibold text-(--color-text)">
                  Compassion Driven
                </h4>
                <p className="text-(--color-text-muted)">
                  Every initiative is guided by empathy and care.
                </p>
              </div>
            </div>

            <div>
              <Link href="#">
                <Button className="rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E] cursor-pointer">
                  <BadgeIndianRupee /> Donate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
