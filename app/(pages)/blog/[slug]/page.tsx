import { notFound } from "next/navigation";
import BlogPostHero from "./BlogpostHero";
import BlogPostBody from "./Blogpostbody";
import BlogPostAuthor from "./Blogpostauthor";
import BlogPostSidebar from "./Blogpostsidebar";
import RelatedPosts from "./Relatedposts";
import { BlogsProps } from "@/types/blogs";


interface Props {
  params: Promise<{ slug: string }>
}


export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params
  if (!slug) notFound();
  let data: BlogsProps;
  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/admin/blog/${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log("Fetch failed with status:", res.status);
      return notFound();
    }

    const json = await res.json();
    data = json.data;
    // console.log("data", data);
    if (!data) notFound()
  } catch (err) {
    console.log(err)
    return notFound();
  }

  return (
    <main>
      {/* Hero */}
      <BlogPostHero post={data} />

      {/* Body + Sidebar */}
      <section className="section" style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 xl:gap-14 items-start">

            {/* Left — article */}
            <article className="min-w-0 flex flex-col gap-8">
              <BlogPostBody post={data} />
              <BlogPostAuthor post={data} />

              {/* Back link */}
              <div className="pt-2">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                  style={{ color: "var(--color-accent)" }}
                >
                  ← Back to all stories
                </a>
              </div>
            </article>

            {/* Right — sticky sidebar */}
            <div className="lg:sticky lg:top-24">
              <BlogPostSidebar current={data} />
            </div>

          </div>
        </div>
      </section>

      {/* Related posts */}
      <RelatedPosts post={data} />
    </main>

  );
}