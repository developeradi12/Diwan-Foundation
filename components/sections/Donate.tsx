"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BadgeIndianRupee, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function DonateSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <p className="text-(--color-text) font-semibold uppercase mb-2">
            Support Our Mission
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Your donation can change a life today
          </h2>

          <p className="text-black mb-8 leading-relaxed">
            Every contribution helps us provide education, healthcare, and
            emergency relief to people who need it the most. Together we can
            create lasting change.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button
              className="rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E] cursor-pointer"
              asChild
            >
              <Link href={"/donate"}>
                <BadgeIndianRupee /> Donate
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <Image
            src="/images/gallery/photo7.jpeg"
            alt="donation"
            width={550}
            height={500}
            className="rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
