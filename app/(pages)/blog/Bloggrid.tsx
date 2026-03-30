"use client"

import Link from "next/link"
import { BlogsProps, BlogCategory } from "@/types/blogs"
import { useState } from "react"
import Image from "next/image"

export default function BlogGrid({ posts }: { posts: BlogsProps[] }) {
  const [active, setActive] = useState<string | "All">("All")

  const filtered =
    active === "All"
      ? posts
      : posts.filter((p) => p.categories?.[0]?.value === active)

  return (
    <section className="section" style={{ background: "var(--color-surface)" }}>
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest">
              All Articles
            </span>
            <h2 className="text-3xl font-black mt-1">
              Browse Blogs
            </h2>
          </div>

          <p className="text-sm">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Categories (dynamic) */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...new Set(posts.map(p => p.categories?.[0]?.value).filter(Boolean))].map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat as string | "All")}
              className="px-4 py-2 rounded-full text-sm border border-gray-400"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-xl overflow-hidden border border-gray-300 hover:shadow-md transition"
            >
              {/* Image */}
              <div className="h-40 relative bg-gray-100">
                {post.featured_image ? (
                  <div className="relative w-full h-40">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    📝
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <p className="text-xs text-gray-500">
                  {new Date(post.published_at).toLocaleDateString("en-IN")}
                </p>

                <h3 className="font-bold line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-3">
                  {post.excerpt}
                </p>

                <span className="text-xs font-semibold text-blue-600 mt-auto">
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