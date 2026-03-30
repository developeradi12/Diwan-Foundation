export interface BlogCategory {
  _id?: string
  value: string
}

export interface BlogsProps {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  author: string
  categories: BlogCategory[]
  tags: BlogCategory[]
  is_published: boolean
  published_at: string
  meta_title: string
  meta_description: string
  created_at?: string
  updated_at?: string
}

export interface BlogsCategoryProps {
  name: string
  description: string
  meta_title: string
  meta_description: string
  status: boolean
  image: string
}

export interface BlogReviewsProps {
  blog_id: string
  user_id: string
  title: string
  review: string
  rating: string
  status: boolean
}