"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

export default function AboutSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* LEFT SIDE IMAGES */}
        <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
          {/* Left Column: Image 1 */}
          <div className="relative aspect-[3/4] sm:aspect-[2/2.5] rounded-2xl overflow-hidden">
            <Image
              src="/images/gallery/photo2.jpeg"
              alt="children helping"
              fill
              className="object-cover transition duration-500 hover:scale-110"
            />
          </div>

          {/* Right Column: Image 2 & 3 stacked */}
          <div className="flex flex-col gap-4 sm:gap-6 mt-0 sm:mt-10">
            {/* Image 2 */}
            <div className="relative aspect-[16/10] sm:aspect-[4/2] rounded-2xl overflow-hidden">
              <Image
                src="/images/gallery/photo1.jpeg"
                alt="child eating"
                fill
                className="object-cover transition duration-500 hover:scale-110"
              />
            </div>

            {/* Image 3 */}
            <div className="relative aspect-[16/10] sm:aspect-[4/2] rounded-2xl overflow-hidden">
              <Image
                src="/images/gallery/photo6.jpeg"
                alt="child eating"
                fill
                className="object-cover transition duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>

        <div>
          {/* Label */}
          <p className="uppercase text-sm tracking-widest text-(--color-accent) font-semibold mb-3">
            About Us
          </p>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-text) leading-tight mb-6">
            United in compassion,
            <br />
            changing lives
          </h2>

          {/* Description */}
          <p className="text-(--color-text-muted) text-base md:text-lg mb-8">
            Driven by compassion and a shared vision, we work hand-in-hand with
            communities to create meaningful change through education,
            healthcare, and sustainable development.
          </p>

          {/* Feature */}
          <div className="flex gap-3 sm:gap-4 mb-8">
            <div className="text-(--color-accent)">
              <HeartHandshake size={32} />
            </div>

            <div>
              <h4 className="font-semibold text-lg text-(--color-text)">
                Healthcare Support
              </h4>

              <p className="text-(--color-text-muted)">
                Providing essential healthcare services and resources to
                underserved communities.
              </p>
            </div>
          </div>

          {/* CTA + Stats */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Link href="/about">
              <Button className="rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E] cursor-pointer">
                About Us →
              </Button>
            </Link>

            {/* Stats Card */}
            {/* <Card className="shadow-md">
              <CardContent className="px-8 py-6 text-center">

                <div className="text-(--color-accent) text-2xl font-bold">
                  75,958
                </div>

                <p className="font-semibold text-(--color-text)">
                  Helped Fund
                </p>

                <p className="text-sm text-(--color-text-muted)">
                  Supporting growth through community funding
                </p>

              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  );
}