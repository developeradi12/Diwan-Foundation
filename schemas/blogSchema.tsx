import { z } from "zod";


export const blogFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).min(5, { message: "Title must be at least 5 characters" }).max(120).trim(),

  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .min(3, { message: "Slug must be at least 3 characters" })
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug can only contain lowercase letters, numbers and hyphens" })
    .trim(),

  excerpt: z.string().min(1, { message: "Excerpt is required" }).min(40).max(320).trim(),

  content: z.string().min(1, { message: "Content is required" }).min(200),

  featured_image: z.string().min(1, { message: "Featured image is required" }),

  author: z.string().min(1, { message: "Author is required" }).min(2).max(80).trim(),

  tags: z.array(
    z.object({
      value: z.string().min(2).max(30)
    })
  ).default([]),

  categories: z.array(
    z.object({
      value: z.string().min(2).max(40)
    })
  ).min(1, { message: "At least one category is required" }),

  is_published: z.boolean().default(true),

  published_at: z
    .string()
    .min(1, { message: "Published date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format (use YYYY-MM-DD)" })
    .refine((val) => {
      const d = new Date(val);
      return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === val;
    }, { message: "Invalid date" }),

  meta_title: z.string().max(70, { message: "Meta title too long" }).default(""),

  meta_description: z.string().max(170, { message: "Meta description too long" }).default(""),
});

export type BlogFormType = z.infer<typeof blogFormSchema>;