"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

export default function Crowdfunding() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
       
        <div>
          {/* Label */}
          <p className="uppercase text-sm tracking-widest text-(--color-accent) font-semibold mb-3">
            Crowdfunding for a Better Tomorrow
          </p>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-text) leading-tight mb-6">
            Empowering Change Through Crowdfunding
          </h2>

          {/* Description */}
          <p className="text-(--color-text-muted) text-base md:text-md mb-8">
            Crowdfunding is a powerful way to bring communities together for a
            meaningful cause. Through our platform, we enable individuals to
            contribute towards social welfare initiatives, support
            underprivileged communities, and create lasting impact. Every
            donation, no matter how small, plays a vital role in transforming
            lives and building a better future.
          </p>         

          {/* CTA + Stats */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Link href="/donate">
              <Button className="rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E] cursor-pointer">
                Donate Now 
              </Button>
            </Link>
           
          </div>
        </div>

        <div className="relative sm:gap-4">
          {/* Right Column: Image 2 & 3 stacked */}
          <div className="flex flex-col gap-4 sm:gap-6 mt-0 sm:mt-10">
            {/* Image 2 */}
            <div className="relative aspect-[16/10] sm:aspect-[4/2] rounded-2xl overflow-hidden ">
              <Image
                src="/QR.jpeg"
                alt="child eating"
                fill
                className="object-contain transition duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
