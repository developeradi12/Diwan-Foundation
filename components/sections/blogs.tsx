"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import api from "@/lib/axios";
import Image from "next/image";

/* ================= TYPES ================= */

// API may return categories/tags as plain strings OR as objects { value, _id }
type CategoryItem = string | { value?: string; name?: string; _id?: string };

interface Blog {
  _id: string;
  title: string;
  slug: string
  featured_image?: string;
  categories?: CategoryItem[];
  tags?: CategoryItem[];
  content?: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  author?: string;
  createdAt?: string;
  status?: boolean;
}

/* ================= HELPERS ================= */

// Safely extract a display string from either a raw string or an API object { value, _id }
function getLabel(item: CategoryItem): string {
  if (typeof item === "string") return item;
  return item.value || item.name || "";
}

/* ================= SKELETON CARD ================= */

function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <Skeleton className="w-full h-52" />
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="px-5 pb-5 flex justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </CardFooter>
    </Card>
  );
}

/* ================= BLOG CARD ================= */

function BlogCard({ blog }: { blog: Blog }) {
  const [imgSrc, setImgSrc] = useState(blog.featured_image || "/placeholder.jpg");

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : null;

  const description =
    blog.excerpt?.trim() ||
    blog.meta_description?.trim() ||
    blog.content?.replace(/<[^>]+>/g, "").slice(0, 160).trim() ||
    "No description available.";

  return (
    <Card className="group overflow-hidden h-full flex flex-col hover:shadow-xl border-0 transition-shadow duration-300">

      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-muted flex-shrink-0">
        <Image
          src={imgSrc}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgSrc("/placeholder.jpg")}
        />
        {blog.categories?.length ? (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {blog.categories.slice(0, 2).map((cat, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-xs backdrop-blur-sm bg-white/90 text-primary"
              >
                {getLabel(cat)}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      {/* Content */}
      <CardContent className="p-5 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-base leading-snug line-clamp-2 text-foreground">
          {blog.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-5 pb-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{blog.author || "Admin"}</span>
          {formattedDate && <span>·</span>}
          {formattedDate && <time>{formattedDate}</time>}
        </div>
        <Button
          variant="link"
          size="sm"
          className="p-0 cursor-pointer h-auto text-xs font-semibold"
          onClick={() => (window.location.href = `/blog/${blog.slug}`)}
        >
          Read more →
        </Button>
      </CardFooter>

    </Card>
  );
}

/* ================= MAIN ================= */

export default function BlogSlider() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("admin/blog");
      const all: Blog[] = res.data.blogs || [];
      // Only show published / active blogs
      setBlogs(all.filter((b) => b.status !== false));
    } catch {
      setError(true);
      toast.error("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <section className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Latest Blogs
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Stay updated with our newest insights
          </p>
        </div>

        {/* Loading skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <BlogCardSkeleton key={n} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-20 text-muted-foreground">
            <span className="text-4xl">⚠️</span>
            <p className="text-sm">Failed to load blogs.</p>
            <Button variant="outline" onClick={fetchBlogs}>
              Retry
            </Button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
            <span className="text-4xl">📭</span>
            <p className="text-sm">No published blogs found.</p>
          </div>
        ) : (
          <Swiper
            className="!pb-12"
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            navigation
            pagination={{ clickable: true }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog._id} className="!h-auto">
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
}