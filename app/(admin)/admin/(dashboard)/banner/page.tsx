"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Banner } from "@/types/banner";

import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, ImagePlus, LayoutGrid, } from "lucide-react";
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal";
import Header from "@/app/(admin)/_components/header";

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  /* ── fetch ── */
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await api.get("admin/banner");
      setBanners(res.data.banners || []);
    } catch {
      toast.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  /* ── open add ── */
  const openAdd = () => {
    setImageFile(null);
    setPreview("");
    setIsMobile(false)
    setOpen(true);
  };

  /* ── image pick ── */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ── save ── */
  const handleSave = async () => {
    if (!imageFile) return toast.error("Please select a banner image");

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("image", imageFile);
      fd.append("isMobile", String(isMobile))
      await api.post("admin/banner", fd);
      toast.success("Banner created");
      setOpen(false);
      fetchBanners();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  /* ── delete ── */
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`admin/banner/${deleteTarget._id}`);
      toast.success("Banner deleted");
      setDeleteTarget(null);
      fetchBanners();
    } catch {
      toast.error("Failed to delete banner");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header
          backlink="/admin/dashboard"
          pageName="Dashboard"
          currentPage="All Banners"
        />

        <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">

          {/* ── Page header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Media
              </p>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Banners
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {!loading && (
                <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-600 font-medium shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {banners.length} banner{banners.length !== 1 ? "s" : ""}
                </div>
              )}
              <Button
                onClick={openAdd}
                className="h-9 px-4 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium transition-colors"
              >
                <ImagePlus className="h-4 w-4 mr-1.5" />
                Add Banner
              </Button>
            </div>
          </div>

          {/* ── Grid ── */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[16/6] rounded-2xl" />
              ))}
            </div>
          ) : banners.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <LayoutGrid className="h-7 w-7 text-gray-400" />
              </div>
              <p className="text-gray-800 font-semibold text-base mb-1">No banners yet</p>
              <p className="text-gray-400 text-sm max-w-xs">
                Upload your first banner image to display on the homepage.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {banners.map((banner) => (
                <div
                  key={banner._id}
                  className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="aspect-[16/6] overflow-hidden">
                    <img
                      src={banner.image}
                      alt="Banner"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Delete button overlay */}
                  <button
                    onClick={() => setDeleteTarget(banner)}
                    className="absolute top-2 right-2 p-2 cursor-pointer rounded-xl bg-white/90 backdrop-blur-sm shadow opacity-0 group-hover:opacity-100 transition-all duration-150 hover:bg-red-50 hover:text-red-500 text-gray-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Add Dialog ── */}
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-lg bg-white ">
          <DialogHeader>
            <DialogTitle>Add Banner</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Banner Image</Label>

              {/* Preview */}
              {preview ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-[16/6]">
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => { setPreview(""); setImageFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                    className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded-lg hover:bg-black/80 transition"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="banner-upload"
                  className="flex flex-col items-center justify-center aspect-[16/6] rounded-xl border-2 border-dashed border-gray-200 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Click to upload</p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP</p>
                </label>
              )}

              <Input
                id="banner-upload"
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isMobile"
                checked={isMobile}
                onChange={(e) => setIsMobile(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="isMobile">Is Mobile Banner</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !imageFile}
              className="rounded-xl bg-gray-900 hover:bg-gray-700 text-white"
            >
              {saving ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Uploading…
                </span>
              ) : (
                "Save Banner"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm ── */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Banner?"
        description="This banner will be permanently deleted. This cannot be undone."
      />
    </>
  );
}