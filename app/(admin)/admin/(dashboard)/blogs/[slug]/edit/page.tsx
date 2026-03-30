"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import BlogForm from "../../_components/BlogForm"
import { toast } from "sonner"
import { blogFormSchema, BlogFormType } from "@/schemas/blogSchema"
import api from "@/lib/axios"

interface Params {
  slug: string
}

export default function EditBlogPage({ params }: { params: Promise<Params> }) {
  const { slug } = use(params)
  const router = useRouter()

  const [blogData, setBlogData] = useState<(BlogFormType & { _id: string }) | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(`admin/blog/${slug}`)
        const blog = response.data?.data

        const validatedData = blogFormSchema.parse({
          title:            blog.title,
          slug:             blog.slug,
          excerpt:          blog.excerpt,
          content:          blog.content,
          featured_image:   blog.featured_image,
          author:           blog.author,
          categories: (blog.categories || []).map((c: any) =>
            typeof c === "string" ? { value: c } : { value: c.value ?? "" }
          ),
          tags: (blog.tags || []).map((t: any) =>
            typeof t === "string" ? { value: t } : { value: t.value ?? "" }
          ),
          is_published:     blog.is_published,
          published_at:     blog.published_at
            ? new Date(blog.published_at).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          meta_title:       blog.meta_title || "",
          meta_description: blog.meta_description || "",
        })

        setBlogData({ ...validatedData, _id: blog._id })

      } catch (err: any) {
        const message = err?.response?.data?.error || err?.message || "Something went wrong"
        setError(message)
        toast.error(message)
        setTimeout(() => router.push("/admin/blogs"), 2000)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [slug, router]) 

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-500">Loading blog...</p>
      </div>
    )
  }

  if (error || !blogData) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <p className="text-red-500">{error || "Blog not found"}</p>
      </div>
    )
  }

  return <BlogForm initialData={blogData} isEdit />
}