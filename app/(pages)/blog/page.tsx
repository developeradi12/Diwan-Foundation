import BlogGrid from "./Bloggrid"
import FeaturedPost from "./Featuredpost"
import HeroBlog from "./HeroBlog"
import { BlogsProps } from "@/types/blogs"

export default async function BlogPage() {
  let posts: BlogsProps[] = []

  try {
    const res = await fetch( `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/admin/blog?limit=20`, {
      method: "GET",
      cache: "no-store",
    })

    if (res.ok) {
      const json = await res.json()
      posts = json.blogs ?? []
    }
  } catch {
    console.log("blogs api error");
  }

  return (
    <main>
      <HeroBlog />

      {/* pass posts */}
      <FeaturedPost posts={posts} />
      <BlogGrid posts={posts} />

      {/* <NewsletterSection /> */}
    </main>
  )
}