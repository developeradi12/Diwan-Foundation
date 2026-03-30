"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Banner } from "@/types/banner"
import { Skeleton } from "@/components/ui/skeleton"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

export default function Hero() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/v1/admin/banner")
        const json = await res.json()
        setBanners(json.banners ?? [])
      } catch {
        console.error("Failed to fetch banners")
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  //  Detect mobile (client-side = accurate)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640

  //  Filter banners
  const filteredBanners = banners.filter((b) =>
    isMobile ? b.isMobile : !b.isMobile
  )

  /* Loading Skeleton */
  if (loading) {
    return (
      <section className="w-full h-[500px] sm:h-[300px] md:h-[380px] lg:h-[420px] xl:h-[520px]">
        <Skeleton className="w-full h-full rounded-none" />
      </section>
    )
  }

  /* No banners */
  if (!filteredBanners.length) return null

  const shouldLoop = filteredBanners.length >= 3

  return (
    <section className="w-full h-[500px] sm:h-[450px] md:h-[380px] lg:h-[420px] xl:h-[520px]">      <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={shouldLoop}
      navigation
      pagination={{ clickable: true }}
      className="h-full w-full"
    >
      {filteredBanners.map((slide) => (
        <SwiperSlide key={slide._id}>
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt="Banner"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </section>
  )
}