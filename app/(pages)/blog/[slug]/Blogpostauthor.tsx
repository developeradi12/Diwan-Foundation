"use client"

import { BlogsProps } from "@/types/blogs"

interface Props {
  post: BlogsProps
}

export default function BlogPostAuthor({ post }: Props) {
  return (
    <div
      className="rounded-2xl p-6 md:p-8 flex gap-5 items-start blog-fade-in"
      style={{
        background: "var(--color-surface-alt)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
        animationDelay: "0.2s",
      }}
    >
      {/* Avatar — initials */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black shrink-0"
        style={{
          background: "color-mix(in oklch, var(--color-primary) 10%, white)",
          color: "var(--color-primary)",
          border: "2px solid color-mix(in oklch, var(--color-primary) 20%, white)",
        }}
      >
        {post.author?.charAt(0).toUpperCase() ?? "A"}
      </div>

      {/* Info */}
      <div className="min-w-0 space-y-1">
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--color-accent)" }}
        >
          Written by
        </p>
        <h3
          className="text-lg font-black"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
          }}
        >
          {post.author}
        </h3>
        <p
          className="text-xs font-semibold"
          style={{ color: "var(--color-text-muted)" }}
        >
          Author · HopeForward
        </p>
      </div>
    </div>
  )
}