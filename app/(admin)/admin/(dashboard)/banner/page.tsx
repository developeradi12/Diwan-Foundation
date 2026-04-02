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
import { Trash2, ImagePlus, LayoutGrid, MonitorSmartphone, Monitor, Upload, X } from "lucide-react";
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal";
import Header from "@/app/(admin)/_components/header";
import Image from "next/image";

export default function BannersPage() {
  const [banners, setBanners]       = useState<Banner[]>([]);
  const [loading, setLoading]       = useState(true);
  const [open, setOpen]             = useState(false);
  const [imageFile, setImageFile]   = useState<File | null>(null);
  const [preview, setPreview]       = useState("");
  const [saving, setSaving]         = useState(false);
  const [isMobile, setIsMobile]     = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);
  const [deleting, setDeleting]     = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

  const mobileBanners  = banners.filter((b) => b.isMobile);
  const desktopBanners = banners.filter((b) => !b.isMobile);

  /* ── open add ── */
  const openAdd = () => {
    setImageFile(null);
    setPreview("");
    setIsMobile(false);
    setOpen(true);
  };

  /* ── close / reset ── */
  const handleClose = () => {
    setOpen(false);
    setImageFile(null);
    setPreview("");
  };

  /* ── image pick ── */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageFile(null);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ── save ── */
  const handleSave = async () => {
    if (!imageFile) return toast.error("Please select a banner image");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("image", imageFile);
      fd.append("isMobile", String(isMobile));
      await api.post("admin/banner", fd);
      toast.success("Banner created");
      handleClose();
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

  /* ── banner card ── */
  const BannerCard = ({ banner, aspect }: { banner: Banner; aspect: string }) => (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={aspect}>
        <Image
          src={banner.image}
          alt="Banner"
          fill
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

      {/* Delete button — visible always on mobile, hover on desktop */}
      <button
        onClick={() => setDeleteTarget(banner)}
        className="
          absolute top-3 right-3
          flex items-center gap-1.5 px-3 py-1.5
          bg-white/90 backdrop-blur-sm text-red-600
          rounded-lg text-xs font-medium border border-red-100
          opacity-100 sm:opacity-0 group-hover:opacity-100
          transition-opacity hover:bg-red-50 cursor-pointer
        "
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
    </div>
  );

  /* ── section ── */
  const Section = ({
    title, icon, items, aspect, columns, emptyLabel,
  }: {
    title: string;
    icon: React.ReactNode;
    items: Banner[];
    aspect: string;
    columns: string;
    emptyLabel: string;
  }) => (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-500">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex items-center justify-center h-28 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-400">{emptyLabel}</p>
        </div>
      ) : (
        <div className={`grid ${columns} gap-4`}>
          {items.map((banner) => (
            <BannerCard key={banner._id} banner={banner} aspect={aspect} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header
          backlink="/admin/dashboard"
          pageName="Dashboard"
          currentPage="All Banners"
        />

        <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-10">

          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Media
              </p>
              <h1 className="text-3xl font-bold text-gray-900">Banners</h1>
            </div>

            <div className="flex items-center gap-3">
              {!loading && (
                <span className="text-sm text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full">
                  {banners.length} total
                </span>
              )}
              <Button onClick={openAdd} className="gap-1.5 cursor-pointer button">
                <ImagePlus className="h-4 w-4 " />
                Add Banner
              </Button>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="aspect-[9/16] rounded-2xl" />
                <Skeleton className="aspect-[9/16] rounded-2xl" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton className="aspect-[16/6] rounded-2xl" />
                <Skeleton className="aspect-[16/6] rounded-2xl" />
                <Skeleton className="aspect-[16/6] rounded-2xl" />
              </div>
            </div>
          ) : banners.length === 0 ? (
            /* Global empty state */
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <LayoutGrid className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-700 font-medium mb-1">No banners yet</p>
              <p className="text-sm text-gray-400 mb-5">
                Add your first banner to display on the homepage
              </p>
              <Button onClick={openAdd}  className="button gap-1.5 cursor-pointer">
                <ImagePlus className="h-4 w-4" />
                Add Banner
              </Button>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Mobile */}
              <Section
                title="Mobile Banners"
                icon={<MonitorSmartphone className="h-4 w-4" />}
                items={mobileBanners}
                aspect="aspect-[9/16]"
                columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                emptyLabel="No mobile banners added yet"
              />

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Desktop */}
              <Section
                title="Desktop Banners"
                icon={<Monitor className="h-4 w-4" />}
                items={desktopBanners}
                aspect="aspect-[16/6]"
                columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                emptyLabel="No desktop banners added yet"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Add Dialog ── */}
      <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Add Banner</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-1">

            {/* Upload zone — clicking anywhere triggers file input */}
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">
                Banner Image
              </Label>

              {/*  Fixed: label wraps the hidden input so clicking the zone works */}
              <label
                htmlFor="banner-file-input"
                className="
                  relative block w-full cursor-pointer rounded-xl
                  border-2 border-dashed border-gray-200
                  bg-gray-50 hover:bg-gray-100 hover:border-gray-300
                  transition-colors overflow-hidden
                "
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-64 object-contain"
                    />
                    {/* Clear button */}
                    <button
                      type="button"
                      onClick={clearImage}
                      className="
                        absolute top-2 right-2
                        p-1.5 rounded-lg bg-white/90 border border-gray-200
                        text-gray-600 hover:text-red-500 hover:border-red-200
                        transition-colors
                      "
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, WEBP supported
                    </p>
                  </div>
                )}
              </label>

              {/*  Fixed: id matches the label's htmlFor */}
              <Input
                id="banner-file-input"
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Banner type toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-800">Mobile banner</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Uses 9:16 portrait ratio on mobile devices
                </p>
              </div>
              {/* Toggle switch using checkbox */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMobile}
                  onChange={(e) => setIsMobile(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="
                  w-10 h-6 bg-gray-200 rounded-full
                  peer-checked:bg-black
                  peer-focus:ring-2 peer-focus:ring-gray-300
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                  after:bg-white after:rounded-full after:h-5 after:w-5
                  after:transition-all peer-checked:after:translate-x-4
                  transition-colors
                " />
              </label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            {/*  Fixed: clear visual hierarchy between Cancel and Save */}
            <Button variant="outline" onClick={handleClose} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading…
                </span>
              ) : (
                "Save Banner"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Banner?"
        description="This cannot be undone."
      />
    </>
  );
}