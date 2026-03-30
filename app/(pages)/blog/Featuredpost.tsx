import Link from "next/link"
import { BlogsProps } from "@/types/blogs"

export default function FeaturedPost({ posts }: { posts: BlogsProps[] }) {
  if (!posts.length) return null
  
  const post = posts.find((p) => p.featured_image) ?? posts[0]

  return (
    <section className="section" style={{ background: "var(--color-surface-alt)" }}>
      <div className="container">
        <div className="flex items-center justify-between mb-8 blog-fade-in">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Editor's Pick
            </span>
            <h2
              className="text-2xl font-black mt-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              Featured Story
            </h2>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="grid lg:grid-cols-2 rounded-2xl overflow-hidden group blog-fade-in transition-all duration-300 hover:-translate-y-1"
          style={{
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-md)",
            animationDelay: "0.1s",
          }}
        >
          {/* Cover */}
          <div className="min-h-64 lg:min-h-auto flex items-center justify-center relative overflow-hidden bg-gray-100">
            <span className="text-7xl">📝</span>

            {/* Category */}
            {post.categories?.[0] && (
              <div
                className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {post.categories[0].value}
              </div>
            )}

            {/* Featured badge */}
            <div
              className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                background: "var(--color-accent)",
                color: "#fff",
              }}
            >
              Featured
            </div>
          </div>

          {/* Content */}
          <div
            className="p-8 md:p-10 flex flex-col justify-between gap-6"
            style={{ background: "var(--color-surface)" }}
          >
            <div className="space-y-4">
              {/* Meta */}
              <div
                className="flex flex-wrap items-center gap-3 text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                <span>{post.author}</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-40" />
                <span>
                  {new Date(post.published_at).toLocaleDateString("en-IN")}
                </span>
              </div>

              <h2
                className="text-2xl md:text-3xl font-black leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                {post.title}
              </h2>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {post.excerpt}
              </p>
            </div>

            <div
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              Read Full Story →
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}