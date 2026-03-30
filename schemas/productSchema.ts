import { stat } from "fs";
import * as z from "zod";

const MediaFileSchema = z.instanceof(File).refine(
  (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    return validTypes.includes(file.type)
  },
  "Only JPEG, PNG, WebP, and GIF images are allowed"
).refine(
  (file) => file.size <= 10 * 1024 * 1024, // 10MB
  "File size must be less than 10MB"
)

// Product Schema
const ProductSchema = z.object({
  id : z.string(),
  title: z.string().min(1, "Product title is required!"),
  short_description: z.string(),
  long_description : z.string(), 
  image: z.array(MediaFileSchema).optional().refine(
    (files) => files === undefined || files.length === 0 || files.length <= 20,
    "Maximum 20 images allowed"
  ),
  pricing: z.number(),
  compair_pricing: z.number(),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()),
  meta_title: z.string(),
  meta_description: z.string(),
  status: z.boolean(),
});

// Product Type Props
export type productProps = z.infer<typeof ProductSchema>

// Product Collection Schema
const ProductCollectionSchema = z.object({
  name: z.string().min(1, "Collection name is required!"),
  description: z.string(),
  image : MediaFileSchema.optional(),
  meta_title: z.string(),
  meta_description: z.string(),
  status: z.boolean(),
});

// Product Collection Type Props
export type productCollectionProps = z.infer<typeof ProductCollectionSchema>  


const ProductReviewsSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  title : z.string().min(1, "Title is required!"),
  rating: z.string(),
  comment: z.string().optional(),
  status: z.boolean(),
})

export type productReviewsProps = z.infer<typeof ProductReviewsSchema>  

export  { ProductSchema, ProductCollectionSchema, ProductReviewsSchema } ;