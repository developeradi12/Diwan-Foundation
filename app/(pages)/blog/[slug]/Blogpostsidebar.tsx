"use client"

import { BlogsProps } from "@/types/blogs"

interface Props {
  current: BlogsProps
}

export default function BlogPostSidebar({ current }: Props) {
  return (
    <aside className="flex flex-col gap-6 blog-fade-in" style={{ animationDelay: "0.15s" }}>

      {/* Donate CTA */}
      <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "var(--color-primary)" }}>
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 pointer-events-none"
          style={{ background: "var(--color-accent)" }}
        />
        <div className="relative z-10 space-y-3">
          <p className="text-2xl">❤️</p>
          <h3
            className="text-base font-black leading-snug"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-inverse)" }}
          >
            Stories like this need your support.
          </h3>
          <p className="text-xs leading-relaxed opacity-65" style={{ color: "var(--color-text-inverse)" }}>
            Every donation — however small — keeps our programs running and our stories alive.
          </p>
          <a href="/donate" className="btn btn-primary text-sm w-full justify-center mt-2">
            Donate Now →
          </a>
        </div>
      </div>

      {/* Categories */}
      {current.categories.length > 0 && (
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-muted)" }}>
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {current.categories.map((cat) => (
              <a  // ✅ fixed — was missing opening <a tag
                key={cat._id ?? cat.value}
                href={`/blog?category=${encodeURIComponent(cat.value)}`}
                className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
                style={{
                  background: "color-mix(in oklch, var(--color-primary) 8%, white)",
                  color: "var(--color-primary)",
                  border: "1px solid color-mix(in oklch, var(--color-primary) 15%, white)",
                }}
              >
                {cat.value}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {current.tags.length > 0 && (
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-muted)" }}>
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {current.tags.map((tag) => (
              <span
                key={tag._id ?? tag.value}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: "color-mix(in oklch, var(--color-accent) 15%, white)",
                  color: "var(--color-primary)",
                }}
              >
                #{tag.value}
              </span>
            ))}
          </div>
        </div>
      )}

    </aside>
  )
}