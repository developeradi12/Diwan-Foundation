"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, RefreshCw, MoreHorizontal, FileText, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import api from "@/lib/axios"
import Header from "@/app/(admin)/_components/header"


interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  author: string
  categories: Array<string | { value: string; _id?: string }>
  tags: Array<string | { value: string; _id?: string }>
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

interface PaginationData {
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0, page: 1, limit: 10, totalPages: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 600)
    return () => clearTimeout(handler)
  }, [searchTerm])

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get("admin/blog", {
        params: { page: pagination.page, limit: pagination.limit, search: debouncedSearch },
      })
      setBlogs(response.data.blogs || [])
      setPagination(response.data.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 })
    } catch {
      toast.error("Failed to fetch blogs")
    } finally {
      setIsLoading(false)
    }
  }, [pagination.page, pagination.limit, debouncedSearch])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [debouncedSearch])

  const handleDeleteClick = (blog: Blog) => {
    setBlogToDelete(blog)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!blogToDelete) return
    setIsDeleting(true)
    try {
      await api.delete(`/admin/blog/${blogToDelete.slug}`)
      toast.success("Blog deleted successfully")
      fetchBlogs()
    } catch {
      toast.error("Failed to delete blog")
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setBlogToDelete(null)
    }
  }

  const publishedCount = blogs.filter(b => b.is_published).length
  const draftCount = blogs.filter(b => !b.is_published).length

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Blogs"
      />

      <div className="px-6  max-w-screen-xl mx-auto space-y-6">

        {/* Page Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}>
              Blog Posts
            </p>
            <p className="text-sm mt-0.5 text-gray-400">
              Manage and publish all blog content
            </p>
          </div>

          <Link
            href="/admin/blogs/add"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg w-fit"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-primary)",
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Add New Post
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-primary) 10%, white)" }}>
              <BookOpen size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">Total Posts</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: "var(--color-primary)" }}>
                {pagination.total}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-success) 12%, white)" }}>
              <FileText size={20} style={{ color: "var(--color-success)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">Published</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: "var(--color-primary)" }}>
                {publishedCount}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-warning) 15%, white)" }}>
              <FileText size={20} style={{ color: "var(--color-warning)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">Drafts</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: "var(--color-primary)" }}>
                {draftCount}
              </p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Card Header with Search */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full" style={{ background: "var(--color-accent)" }} />
              <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                All Posts
              </p>
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  background: "color-mix(in oklch, var(--color-primary) 8%, white)",
                  color: "var(--color-primary)",
                }}
              >
                {pagination.total} total
              </span>
            </div>

            {/* Search */}
            <div className="flex gap-2">
              <div className="relative">
                <Input
                  placeholder="Search by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9 w-64 text-sm border-gray-200 rounded-lg pr-8 focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
                />
                {isLoading && searchTerm && (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                )}
              </div>
              {searchTerm && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-lg border-gray-200 text-xs"
                  onClick={() => { setSearchTerm(""); setDebouncedSearch("") }}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow
                  className="border-b border-gray-100"
                  style={{ background: "color-mix(in oklch, var(--color-primary) 4%, white)" }}
                >
                  <TableHead className="text-xs font-semibold uppercase tracking-wide py-3 w-72"
                    style={{ color: "var(--color-primary)" }}>
                    Blog Post
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--color-primary)" }}>
                    Author
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--color-primary)" }}>
                    Categories
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--color-primary)" }}>
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right"
                    style={{ color: "var(--color-primary)" }}>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="h-6 w-6 animate-spin"
                          style={{ color: "var(--color-primary)" }} />
                        <p className="text-sm text-gray-400">Fetching posts...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : blogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: "color-mix(in oklch, var(--color-primary) 8%, white)" }}
                        >
                          <BookOpen size={20} style={{ color: "var(--color-primary)" }} />
                        </div>
                        <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                          No blog posts found
                        </p>
                        <p className="text-xs text-gray-400">Create your first post to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  blogs.map((blog) => (
                    <TableRow
                      key={blog._id}
                      className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
                    >
                      <TableCell className="py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-sm truncate max-w-[260px]"
                            style={{ color: "var(--color-primary)" }}>
                            {blog.title}
                          </span>
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="text-xs hover:underline"
                            style={{ color: "var(--color-accent)" }}
                          >
                            view live →
                          </Link>
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-gray-500 py-3">
                        {blog.author}
                      </TableCell>

                      <TableCell className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {blog.categories?.slice(0, 2).map((cat, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{
                                background: "color-mix(in oklch, var(--color-accent) 20%, white)",
                                color: "var(--color-primary)",
                              }}
                            >
                              {typeof cat === "string" ? cat : cat.value}
                            </span>
                          ))}
                        </div>
                      </TableCell>

                      <TableCell className="py-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            background: blog.is_published
                              ? "color-mix(in oklch, var(--color-success) 12%, white)"
                              : "color-mix(in oklch, var(--color-warning) 15%, white)",
                            color: blog.is_published
                              ? "var(--color-success)"
                              : "var(--color-warning)",
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: blog.is_published
                                ? "var(--color-success)"
                                : "var(--color-warning)"
                            }}
                          />
                          {blog.is_published ? "Published" : "Draft"}
                        </span>
                      </TableCell>

                      <TableCell className="text-right py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl shadow-lg border border-gray-100">
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/admin/blogs/${blog.slug}/edit`}
                                className="flex items-center gap-2 text-sm"
                                style={{ color: "var(--color-primary)" }}
                              >
                                <Edit className="h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-sm"
                              style={{ color: "var(--color-danger)" }}
                              onClick={() => handleDeleteClick(blog)}
                            >
                              <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Page {pagination.page} of {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                  className="h-8 rounded-lg border-gray-200 text-xs"
                  style={{ color: "var(--color-primary)" }}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                  className="h-8 rounded-lg border-gray-200 text-xs"
                  style={{ color: "var(--color-primary)" }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle style={{ color: "var(--color-primary)" }}>
              Delete Blog Post?
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              This will permanently delete{" "}
              <span className="font-semibold" style={{ color: "var(--color-primary)" }}>
                {blogToDelete?.title}
              </span>.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="rounded-xl border-gray-200"
              style={{ color: "var(--color-primary)" }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="rounded-xl"
              style={{
                background: "var(--color-danger)",
                color: "white",
              }}
            >
              {isDeleting ? "Deleting..." : "Delete Permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}