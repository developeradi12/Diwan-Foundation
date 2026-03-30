"use client";

import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useCallback } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Save, X, FileText,
  Tag, Hash, Search, Calendar, Image as ImageIcon, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage, FormDescription,
} from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";
import { blogFormSchema, BlogFormType } from "@/schemas/blogSchema";
import api from "@/lib/axios";
import Header from "@/app/(admin)/_components/header";
import { FormSection } from "@/app/(admin)/_components/formSection";

interface BlogFormProps {
  initialData?: BlogFormType & { _id?: string; slug?: string }  
  isEdit?: boolean
}

const inputClass = "h-10 border border-gray-200 focus:border-[var(--color-primary)] focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-0 rounded-xl text-sm pl-9 shadow-none"
const labelClass = "text-xs font-semibold uppercase tracking-wide"

const FORM_ID = "blog-form";

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.featured_image || "");

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: initialData ?? {
      title: "", slug: "", excerpt: "", content: "",
      featured_image: "", author: "", categories: [], tags: [],
      is_published: true,
      published_at: new Date().toISOString().split("T")[0],
      meta_title: "", meta_description: "",
    },
    mode: "onChange",
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control: form.control, name: "tags",
  });

  const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
    control: form.control, name: "categories",
  });

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue("title", val, { shouldValidate: true });
    if (!isEdit || !initialData?.slug) {
      const slug = val.toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      form.setValue("slug", slug, { shouldValidate: true });
    }
  }, [form, isEdit, initialData?.slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setImagePreview(dataUrl);
      form.setValue("featured_image", dataUrl, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<z.infer<typeof blogFormSchema>> = async (values) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("slug", values.slug)
      formData.append("excerpt", values.excerpt)
      formData.append("content", values.content)
      formData.append("author", values.author)
      formData.append("is_published", String(values.is_published))
      formData.append("published_at", values.published_at)
      formData.append("meta_title", values.meta_title || "")
      formData.append("meta_description", values.meta_description || "")
      formData.append("categories", JSON.stringify(values.categories))
      formData.append("tags", JSON.stringify(values.tags))

      const fileInput = fileInputRef.current
      if (fileInput?.files?.[0]) {
        formData.append("featured_image", fileInput.files[0])
      } else if (isEdit && values.featured_image) {
        formData.append("featured_image", values.featured_image)
      }

      //  Use initialData.slug for edit URL, not _id
      const url = isEdit && initialData?.slug
        ? `admin/blog/${initialData.slug}`
        : "admin/blog"

      await api({ method: isEdit ? "PUT" : "POST", url, data: formData })
      toast.success(isEdit ? "Blog updated successfully" : "Blog created successfully")
      router.push("/admin/blogs")
      router.refresh()

    } catch (err: any) {
      const message = err?.response?.data?.error || err?.message || "Something went wrong"
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50/50">
      <Header
        backlink="/admin/blogs"
        pageName="Blogs"
        currentPage={isEdit ? "Edit Post" : "Create Post"}
      />

      <div className="mx-auto px-6 space-y-6">

        {/* Page Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}>
              {isEdit ? "Edit Blog Post" : "Create New Post"}
            </p>
            <p className="text-sm mt-0.5 text-gray-400">
              {isEdit ? "Update your blog post content" : "Write and publish a new blog post"}
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/admin/blogs">
              <Button
                variant="outline"
                className="h-10 rounded-xl border-gray-200 text-sm font-semibold px-4"
                style={{ color: "var(--color-primary)" }}
              >
                <ArrowLeft size={15} className="mr-1.5" />
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              form={FORM_ID}
              disabled={isSubmitting || form.formState.isSubmitting}
              className="h-10 rounded-xl text-sm font-semibold px-5 transition-all hover:opacity-90 hover:scale-[1.01]"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-text-inverse)",
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save size={15} />
                  {isEdit ? "Update Post" : "Publish Post"}
                </span>
              )}
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="content" className="space-y-6">

              {/* Tab Triggers */}
              <TabsList
                className="h-10 rounded-xl p-1 border gap-4 border-gray-100"
                style={{ background: "color-mix(in oklch, var(--color-primary) 5%, white)" }}
              >
                <TabsTrigger
                  value="content"
                  className="rounded-lg text-sm text-white py-2 font-medium data-[state=active]:text-(--color-accent) bg-(--color-primary) px-5"
                  style={{ ["--tw-shadow" as any]: "none" }}
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="seo"
                  className="rounded-lg text-sm text-white py-2 font-medium px-5 data-[state=active]:text-(--color-accent) bg-(--color-primary)"
                >
                  SEO & Settings
                </TabsTrigger>
              </TabsList>

              {/* ── Content Tab ── */}
              <TabsContent value="content" className="space-y-6 mt-0">

                {/* Title + Slug + Author */}
                <FormSection title="Basic Information" icon={FileText}>
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                            Title *
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="My awesome blog post"
                              {...field}
                              onChange={(e) => { field.onChange(e); handleTitleChange(e); }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                            Slug *
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="my-awesome-blog-post"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                            Author *
                          </FormLabel>
                          <FormControl>
                            <Input className={inputClass} placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>

                {/* Featured Image */}
                <FormSection title="Featured Image" icon={ImageIcon}>
                  <FormField
                    control={form.control}
                    name="featured_image"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div>
                            {imagePreview ? (
                              <div className="relative group rounded-xl overflow-hidden border border-gray-100">
                                <div className="relative aspect-video w-full bg-gray-50">
                                  <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                    onError={() => setImagePreview("")}
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setImagePreview("");
                                    form.setValue("featured_image", "");
                                  }}
                                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                                  style={{ background: "var(--color-danger)", color: "white" }}
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <div
                                className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors"
                                style={{ background: "color-mix(in oklch, var(--color-primary) 2%, white)" }}
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <div
                                  className="p-3 rounded-xl mb-3"
                                  style={{ background: "color-mix(in oklch, var(--color-primary) 8%, white)" }}
                                >
                                  <ImageIcon size={20} style={{ color: "var(--color-primary)" }} />
                                </div>
                                <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                                  Click to upload image
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Recommended: 1200 × 630 px</p>
                              </div>
                            )}
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormSection>

                {/* Excerpt + Content */}
                <FormSection title="Content" icon={FileText}>
                  <div className="space-y-5">
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                            Excerpt *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className={`${inputClass} h-auto resize-none`}
                              placeholder="Short summary for listings..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-gray-400">
                            40–320 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                            Full Content *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className={`${inputClass} h-auto resize-none`}
                              placeholder="Write your full article here..."
                              rows={14}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>

                {/* Categories */}
                <FormSection title="Categories" icon={Tag}>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {categoryFields.map((field, index) => (
                        <span
                          key={field.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                          style={{
                            background: "color-mix(in oklch, var(--color-accent) 20%, white)",
                            color: "var(--color-primary)",
                          }}
                        >
                          {form.watch(`categories.${index}.value` as const)}
                          <button
                            type="button"
                            onClick={() => removeCategory(index)}
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center hover:opacity-70"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <Input
                      className={inputClass}
                      placeholder="Type category and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val) {
                            const current = form.getValues("categories") || [];
                            if (!current.some((c) => c.value === val)) appendCategory({ value: val });
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                    <p className="text-xs text-gray-400">Press Enter to add a category</p>
                    {form.formState.errors.categories?.message && (
                      <p className="text-xs" style={{ color: "var(--color-danger)" }}>
                        {form.formState.errors.categories.message}
                      </p>
                    )}
                  </div>
                </FormSection>

                {/* Tags */}
                <FormSection title="Tags" icon={Hash}>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {tagFields.map((field, index) => (
                        <span
                          key={field.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                          style={{
                            borderColor: "color-mix(in oklch, var(--color-primary) 20%, white)",
                            color: "var(--color-primary)",
                            background: "color-mix(in oklch, var(--color-primary) 5%, white)",
                          }}
                        >
                          # {form.watch(`tags.${index}.value` as const)}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center hover:opacity-70"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <Input
                      className={inputClass}
                      placeholder="Type tag and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val) {
                            const current = form.getValues("tags") || [];
                            if (!current.some((c) => c.value === val)) appendTag({ value: val });
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                    <p className="text-xs text-gray-400">Press Enter to add a tag</p>
                  </div>
                </FormSection>

              </TabsContent>

              {/* ── SEO Tab ── */}
              <TabsContent value="seo" className="space-y-6 mt-0">

                <FormSection title="SEO Settings" icon={Search}>
                  <div className="space-y-5">
                    <FormField
                      control={form.control}
                      name="meta_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                            Meta Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="SEO title (optional)"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meta_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                            Meta Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className={`${inputClass} h-auto resize-none`}
                              placeholder="SEO description (optional)"
                              rows={4}
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>

                <FormSection title="Publishing" icon={Calendar}>
                  <div className="space-y-5">

                    <FormField
                      control={form.control}
                      name="is_published"
                      render={({ field }) => (
                        <FormItem
                          className="flex items-center justify-between p-4 rounded-xl border border-gray-100"
                          style={{ background: "color-mix(in oklch, var(--color-primary) 2%, white)" }}
                        >
                          <div>
                            <FormLabel className="text-sm font-semibold"
                              style={{ color: "var(--color-primary)" }}>
                              Publish this post
                            </FormLabel>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {field.value ? "Publicly visible" : "Saved as draft"}
                            </p>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="published_at"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                            Published Date
                          </FormLabel>
                          <FormControl>
                            <Input className={inputClass} type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>

              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  );
}