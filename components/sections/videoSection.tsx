"use client"

import { useEffect, useState, useRef } from "react"
import { Play } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, FreeMode, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/free-mode"

interface VideoItem {
  _id: string
  videoUrl: string
}

function getEmbedUrl(url: string) {
  // convert watch/shorts/youtu.be → embed
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match
    ? `https://www.youtube.com/embed/${match[1]}`
    : url
}

function VideoCard({ video, onPlay }: { video: VideoItem; onPlay?: () => void }) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
    onPlay?.()
  }

  const embedUrl = getEmbedUrl(video.videoUrl)

  return (
    <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden shadow-lg relative bg-black">

      {playing ? (
        <iframe
          src={`${embedUrl}?autoplay=1&rel=0`}
          title="Video"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="h-14 w-14 rounded-full bg-white flex items-center justify-center">
            <Play className="h-6 w-6 text-black" fill="currentColor" />
          </span>
        </button>
      )}

    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="aspect-[9/16] rounded-2xl bg-gray-200 animate-pulse w-full" />
  )
}

export default function ShortsSlider() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const swiperRef = useRef<any>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/v1/admin/video")
        const json = await res.json()
        setVideos(json.videos ?? [])
      } catch {
        console.error("Failed to fetch videos")
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (!loading && !videos.length) return null

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Watch & Learn
            </p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Community Videos
            </h2>
          </div>

          {/* Desktop arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button className="shorts-prev h-9 w-9 rounded-full border border-gray-400 cursor-pointer bg-white shadow flex items-center justify-center">
              ‹
            </button>
            <button className="shorts-next h-9 w-9 rounded-full border border-gray-400 cursor-pointer bg-white shadow flex items-center justify-center">
              ›
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, FreeMode, Autoplay]}
          navigation={{ prevEl: ".shorts-prev", nextEl: ".shorts-next" }}
          freeMode={{ enabled: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={16}
          slidesPerView="auto"
          grabCursor
          className="!pb-2"
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={i} style={{ width: 220 }}>
                <SkeletonCard />
              </SwiperSlide>
            ))
            : videos.map((v) => (
              <SwiperSlide key={v._id} style={{ width: 220 }}>
                <VideoCard
                  video={v}
                  onPlay={() => swiperRef.current?.autoplay?.stop()}
                />
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Mobile arrows */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
          <button className="shorts-prev h-9 w-9 rounded-full border bg-white shadow flex items-center justify-center">
            ‹
          </button>
          <button className="shorts-next h-9 w-9 rounded-full border bg-white shadow flex items-center justify-center">
            ›
          </button>
        </div>

      </div>
    </section>
  )
}