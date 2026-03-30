"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, ImagePlus, Images } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal";
import Header from "@/app/(admin)/_components/header";

interface GalleryImage {
  _id: string;
  image: string;
  createdAt?: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await api.get("admin/gallery");
      setImages(res.data.images || []);
    } catch {
      toast.error("Failed to fetch gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const openAdd = () => {
    setImageFile(null);
    setPreview("");
    setOpen(true);
  };

  const handleSave = async () => {
    if (!imageFile) return toast.error("Please select an image");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("image", imageFile);
      await api.post("admin/gallery", fd);
      toast.success("Image uploaded");
      setOpen(false);
      fetchImages();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`admin/gallery/${deleteTarget._id}`);
      toast.success("Image deleted");
      setDeleteTarget(null);
      fetchImages();
    } catch {
      toast.error("Failed to delete image");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Gallery"
      />

      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">

        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-primary)" }}>
              Gallery
            </p>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)", opacity: 0.7 }}>
              Manage homepage gallery images
            </p>
          </div>
          <Button onClick={openAdd} className="w-fit flex items-center gap-2">
            <ImagePlus size={16} /> Upload Image
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: "color-mix(in oklch, var(--color-primary) 10%, white)" }}>
              <Images size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">Total Images</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: "var(--color-primary)" }}>
                {loading ? <Skeleton className="h-7 w-10" /> : images.length}
              </p>
            </div>
          </div>
        </div>

        {/* Image Grid card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full" style={{ background: "var(--color-accent)" }} />
              <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>All Images</p>
            </div>
            <span className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: "color-mix(in oklch, var(--color-primary) 8%, white)", color: "var(--color-primary)" }}>
              {images.length} total
            </span>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-16">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "color-mix(in oklch, var(--color-primary) 8%, white)" }}>
                  <Images size={22} style={{ color: "var(--color-primary)" }} />
                </div>
                <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>No images yet</p>
                <p className="text-xs text-gray-400">Upload your first image to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {images.map((img) => (
                  <div key={img._id} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-100">
                    <img
                      src={img.image}
                      alt="gallery"
                      className="w-full h-full object-cover"
                    />
                    {/* Delete on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setDeleteTarget(img)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {preview && (
              <img src={preview} alt="preview"
                className="w-full h-48 object-cover rounded-md border border-border/40" />
            )}
            <div className="space-y-2">
              <Label>Select Image <span className="text-destructive">*</span></Label>
              <Input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Uploading…" : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Image?"
        description="This image will be permanently deleted from the gallery."
      />
    </div>
  );
}