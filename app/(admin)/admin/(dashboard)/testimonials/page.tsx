"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2, MessageSquare, Star, Users } from "lucide-react";
import { Testimonial } from "@/types/testimonail";
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal";
import { StatCard } from "@/app/(admin)/_components/stats-card";
import Header from "@/app/(admin)/_components/header";

/* ── empty form ── */
const EMPTY = { name: "", role: "", message: "", rating: "" };

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* ── fetch ── */
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/testimonials");
      setTestimonials(res.data.testimonials || []);
    } catch {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  /* ── stats ── */
  const avgRating =
    testimonials.filter((t) => t.rating).length > 0
      ? (
        testimonials.reduce((s, t) => s + (t.rating || 0), 0) /
        testimonials.filter((t) => t.rating).length
      ).toFixed(1)
      : "—";

  const withPhoto = testimonials.filter((t) => t.image).length;

  /* ── open add ── */
  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setImageFile(null);
    setPreview("");
    setOpen(true);
  };

  /* ── open edit ── */
  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      name: t.name,
      role: t.role || "",
      message: t.message,
      rating: t.rating ? String(t.rating) : "",
    });
    setImageFile(null);
    setPreview(t.image || "");
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
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.message.trim()) return toast.error("Message is required");

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("role", form.role);
      fd.append("message", form.message);
      fd.append("rating", form.rating);
      if (imageFile) fd.append("image", imageFile);

      if (editing) {
        await api.put(`admin/testimonials/${editing._id}`, fd);
        toast.success("Testimonial updated");
      } else {
        await api.post("admin/testimonials", fd);
        toast.success("Testimonial created");
      }
      setOpen(false);
      fetchTestimonials();
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
      await api.delete(`admin/testimonials/${deleteTarget._id}`);
      toast.success("Testimonial deleted");
      setDeleteTarget(null);
      fetchTestimonials();
    } catch {
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleting(false);
    }
  };

  /* ── render ── */
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <Header
          backlink="/admin/dashboard"
          pageName="Dashboard"
          currentPage="All Members"
        />

        <div className="px-6  max-w-screen-xl mx-auto space-y-6">

          {/* page title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-primary)" }}>
                Testimonials
              </p>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)", opacity: 0.7 }}>
                Manage community testimonials shown on the homepage
              </p>
            </div>
            <Button onClick={openAdd} className="w-fit button cursor-pointer">+ Add Testimonial</Button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={<MessageSquare size={20} />}
              label="Total"
              value={testimonials.length}
            />
            <StatCard
              icon={<Star size={20} />}
              label="AVG Rating"
              value={avgRating}
            />
            <StatCard
              icon={<Users size={20} />}
              label="With Photo"
              value={withPhoto}
            />
          </div>

          {/* Table card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 rounded-full" style={{ background: "var(--color-accent)" }} />
                <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                  All Testimonials
                </p>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  background: "color-mix(in oklch, var(--color-primary) 8%, white)",
                  color: "var(--color-primary)",
                }}>
                {testimonials.length} total
              </span>
            </div>

            <div className="p-4">
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <Table>
                  <TableHeader>
                    <TableRow
                      className="border-b border-gray-100"
                      style={{ background: "color-mix(in oklch, var(--color-primary) 4%, white)" }}
                    >
                      <TableHead className="text-xs font-semibold uppercase tracking-wide py-3" style={{ color: "var(--color-primary)" }}>Person</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide py-3" style={{ color: "var(--color-primary)" }}>Role</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide py-3" style={{ color: "var(--color-primary)" }}>Message</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide py-3" style={{ color: "var(--color-primary)" }}>Rating</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide py-3 text-right" style={{ color: "var(--color-primary)" }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <TableRow key={i} className="border-b border-gray-50">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : testimonials.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-16">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ background: "color-mix(in oklch, var(--color-primary) 8%, white)" }}>
                              <span className="text-2xl">💬</span>
                            </div>
                            <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                              No testimonials yet
                            </p>
                            <p className="text-xs text-gray-400">Add your first testimonial to get started</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      testimonials.map((t) => (
                        <TableRow key={t._id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                          {/* Person */}
                          <TableCell className="py-3">
                            <div className="flex items-center gap-3">
                              {t.image ? (
                                <img src={t.image} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                              ) : (
                                <div className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold"
                                  style={{
                                    background: "color-mix(in oklch, var(--color-primary) 12%, white)",
                                    color: "var(--color-primary)",
                                  }}>
                                  {t.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="font-medium text-sm">{t.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500 py-3">{t.role || "—"}</TableCell>
                          <TableCell className="text-sm text-gray-600 py-3 max-w-xs">
                            <p className="line-clamp-2">{t.message}</p>
                          </TableCell>
                          <TableCell className="py-3">
                            {t.rating ? (
                              <span className="flex items-center gap-1 text-sm font-medium text-amber-500">
                                <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
                                {t.rating}
                              </span>
                            ) : "—"}
                          </TableCell>
                          <TableCell className="py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost" size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => setDeleteTarget(t)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        {/* ── Add / Edit Dialog ── */}
        <Dialog open={open} onOpenChange={setOpen} >
          <DialogContent className="sm:max-w-lg bg-white border-0 shadow-none ring-0 outline-none">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2 ">
              {/* Photo */}
              <div className="space-y-2">
                <Label>Photo (optional)</Label>
                {preview && (
                  <img src={preview} alt="preview"
                    className="h-16 w-16 rounded-full object-cover" />
                )}
                <Input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange} />
              </div>

              {/* Name + Role */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Name <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g. Ahmed Shaikh"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Role / Designation</Label>
                  <Input placeholder="e.g. Community Elder"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })} />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label>Message <span className="text-destructive">*</span></Label>
                <Textarea placeholder="Write testimonial message..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Rating (1–5)</Label>
                <Input type="number" min={1} max={5} placeholder="e.g. 5"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })} />
              </div>
            </div>

            <DialogFooter>
              <Button className="button cursor-pointer" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-(--color-primary)/80 text-white hover:scale-105 transition cursor-pointer" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : editing ? "Update" : "Create"}
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
          title="Delete Testimonial?"
          description={`"${deleteTarget?.name}" ka testimonial permanently delete ho jayega.`}
        />
      </div>
    </>
  );
}