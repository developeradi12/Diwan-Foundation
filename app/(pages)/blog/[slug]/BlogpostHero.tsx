"use client"

import Image from "next/image"
import { BlogsProps } from "@/types/blogs"
import Link from "next/link"

interface Props {
  post: BlogsProps
}

export default function BlogPostHero({ post }: Props) {
  const primaryCategory = post.categories?.[0]?.value ?? "Blog"

  return (
    <section className="relative overflow-hidden">
      {/* Background featured image */}
      {post.featured_image && (
        <div className="absolute inset-0 -z-20">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10" style={{ background: "rgba(0,0,0,0.55)" }} />
      {/* Dot texture */}
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container section">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 blog-fade-in text-xs">
          <Link
            href="/"
            className="font-semibold uppercase tracking-widest opacity-50 hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-inverse)" }}
          >
            Home
          </Link>

          <span className="opacity-30" style={{ color: "var(--color-text-inverse)" }}>
            /
          </span>

          <Link
            href="/blog"
            className="font-semibold uppercase tracking-widest opacity-50 hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-inverse)" }}
          >
            Blog
          </Link>

          <span className="opacity-30" style={{ color: "var(--color-text-inverse)" }}>
            /
          </span>

          <span
            className="font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-accent)" }}
          >
            {primaryCategory}
          </span>
        </nav>

        <div className="max-w-3xl space-y-5">
          {/* Category badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold blog-fade-in"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
              animationDelay: "0.05s",
            }}
          >
            {primaryCategory}
          </div>

          {/* Title */}
          <h1
            className="font-black leading-tight blog-fade-in"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-inverse)",
              fontSize: "clamp(28px, 4vw, 52px)",
              animationDelay: "0.1s",
            }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            className="text-base leading-relaxed opacity-80 blog-fade-in"
            style={{ color: "var(--color-text-inverse)", animationDelay: "0.15s" }}
          >
            {post.excerpt}
          </p>

          {/* Author + Date */}
          <div
            className="flex flex-wrap items-center gap-4 blog-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}
              >
                {post.author?.charAt(0).toUpperCase()}
              </div>
              <p
                className="text-sm font-bold leading-none"
                style={{ color: "var(--color-text-inverse)" }}
              >
                {post.author}
              </p>
            </div>

            <div
              className="flex items-center gap-3 text-xs opacity-60"
              style={{ color: "var(--color-text-inverse)" }}
            >
              <span>
                📅{" "}
                {new Date(post.published_at).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div
              className="flex flex-wrap gap-2 blog-fade-in"
              style={{ animationDelay: "0.25s" }}
            >
              {post.tags.map((t) => (
                <span
                  key={t._id ?? t.value}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  #{t.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}