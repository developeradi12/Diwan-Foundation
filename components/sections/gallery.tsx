"use client";

import Image from "next/image";
import { useState } from "react";
import { BadgeIndianRupee, MoveRight, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

//{todo} add api const { data } = await fetch("/api/gallery")
const galleryImages: GalleryImage[] = [
  { id: 1, src: "/images/gallery/photo10.jpeg", alt: "community work" },
  { id: 2, src: "/images/gallery/photo8.jpeg", alt: "charity event" },
  { id: 3, src: "/images/gallery/photo3.jpeg", alt: "helping children" },
  { id: 4, src: "/images/gallery/photo7.jpeg", alt: "volunteer activity" },
  { id: 5, src: "/images/gallery/photo2.jpeg", alt: "education program" },
  { id: 6, src: "/images/gallery/photo6.jpeg", alt: "food distribution" },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-(--color-accent) font-semibold uppercase tracking-wider">
            Our Gallery
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-(--color-text) mt-3">
            Moments of Impact
          </h2>

          <p className="text-(--color-text) max-w-2xl mx-auto mt-4">
            Explore our journey of compassion, service, and community
            transformation.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center pt-4">
          <Link href="/gallery">
            <Button className="rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E] cursor-pointer">
              View More <MoveRight />
            </Button>
          </Link>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={30} />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
