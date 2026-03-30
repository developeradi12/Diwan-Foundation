"use client"

import { BlogsProps } from "@/types/blogs"

interface Props {
  post: BlogsProps
}

export default function BlogPostBody({ post }: Props) {
  return (
    <div
      className="flex flex-col gap-6 blog-fade-in"
      style={{ animationDelay: "0.1s" }}
    >
      <div
        className="prose prose-base max-w-none"
        style={{
          color: "var(--color-text)",
          whiteSpace: "pre-wrap",
          lineHeight: "1.85",
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}