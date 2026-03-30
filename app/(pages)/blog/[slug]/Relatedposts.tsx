"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { BlogsProps } from "@/types/blogs"
import Link from "next/link"

interface Props {
  post: BlogsProps
}

export default function RelatedPosts({ post }: Props) {
  const [related, setRelated] = useState<BlogsProps[]>([])

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const category = post.categories?.[0]?.value ?? ""
        const res = await fetch(
          `/api/v1/admin/blog?limit=4&search=${encodeURIComponent(category)}`
        )
        const json = await res.json()
        const filtered = (json.blogs ?? [])
          .filter((b: BlogsProps) => b.slug !== post.slug)
          .slice(0, 3)
        setRelated(filtered)
      } catch {
        // non-critical — silently fail
      }
    }
    fetchRelated()
  }, [post.slug, post.categories])

  if (!related.length) return null

  return (
    <section className="py-16" style={{ background: "var(--color-surface-alt)" }}>
      <div className="container">
        <div className="mb-8 blog-fade-in">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--color-accent)" }}
          >
            Keep Reading
          </span>
          <h2
            className="text-2xl font-black mt-1"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            You Might Also Like
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-2xl overflow-hidden group flex flex-col blog-fade-in transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
                textDecoration: "none",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {/* Thumbnail */}
              <div className="h-36 relative overflow-hidden bg-gray-100">
                {p.featured_image ? (
                  <Image
                    src={p.featured_image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-4xl"
                    style={{
                      background: "color-mix(in oklch, var(--color-primary) 8%, white)",
                    }}
                  >
                    📝
                  </div>
                )}
                {p.categories?.[0] && (
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {p.categories[0].value}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {new Date(p.published_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h3
                  className="text-sm font-bold leading-snug group-hover:opacity-75 transition-opacity line-clamp-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text)",
                  }}
                >
                  {p.title}
                </h3>
                <span
                  className="text-xs font-bold mt-auto pt-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}