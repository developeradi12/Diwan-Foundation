"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import api from "@/lib/axios"

interface GalleryItem {
    _id: string
    image: string
}

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await api.get("/admin/gallery")

                // console.log("Gallery API ", res.data)

                setImages(res.data?.images || [])
            } catch (err) {
                console.error("Gallery fetch error ", err)
            } finally {
                setLoading(false)
            }
        }

        fetchGallery()
    }, [])


    return (
        <>
            <section
                className="relative overflow-hidden"
                style={{ background: "var(--color-primary)" }}
            >
                {/* Decorative blobs */}
                <div
                    className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
                    style={{ background: "var(--color-accent)" }}
                />
                <div
                    className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full opacity-5 pointer-events-none"
                    style={{ background: "var(--color-accent)" }}
                />
                {/* Dot grid texture */}
                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                <div className="container section">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-8 blog-fade-in">
                        <span
                            className="text-xs font-semibold uppercase tracking-widest opacity-50"
                            style={{ color: "var(--color-text-inverse)" }}
                        >
                            Home
                        </span>
                        <span
                            className="opacity-30"
                            style={{ color: "var(--color-text-inverse)" }}
                        >
                            /
                        </span>
                        <span
                            className="text-xs font-semibold uppercase tracking-widest"
                            style={{ color: "var(--color-accent)" }}
                        >
                            Gallery
                        </span>
                    </div>

                    <div
                        className="max-w-3xl blog-fade-in"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <h1
                            className="font-black leading-[1.05] tracking-tight mb-5"
                            style={{
                                fontFamily: "var(--font-display)",
                                color: "var(--color-text-inverse)",
                                fontSize: "clamp(36px, 5vw, 64px)",
                            }}
                        >
                            Our{" "}
                            <span
                                className="relative inline-block"
                                style={{ color: "var(--color-accent)" }}
                            >
                                Memories
                                <svg
                                    className="absolute -bottom-1 left-0 w-full"
                                    viewBox="0 0 260 8"
                                    fill="none"
                                >
                                    <path
                                        d="M2 6 C50 2, 120 2, 180 4 C220 6, 245 3, 258 2"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        <p
                            className="text-base leading-relaxed opacity-75 max-w-xl"
                            style={{ color: "var(--color-text-inverse)" }}
                        >
                            Take a look at the moments that define our work and community.                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 container mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-14">
                    <h1 className="text-5xl font-bold">Our Gallery</h1>
                    <p className="text-gray-600 mt-4">
                        Explore moments from our community initiatives,
                        donation drives and social programs.
                    </p>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full h-[280px] bg-gray-200 animate-pulse rounded-xl"
                            />
                        ))}
                    </div>
                ) : !images.length ? (
                    <p className="text-center text-gray-500">No images found</p>
                ) : (
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {images.map((img) => (
                            <div
                                key={img._id}
                                className="group relative overflow-hidden rounded-xl shadow-lg"
                            >
                                <Image
                                    src={img.image}
                                    alt={"Gallery Image"}
                                    width={500}
                                    height={500}
                                    className="w-full h-[280px] object-cover transition duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <p className="text-white text-lg font-semibold">
                                        {"Gallery Image"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </section>
        </>

    )
}