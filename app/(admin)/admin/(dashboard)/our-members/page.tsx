"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Pencil, Trash2, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal";
import Header from "@/app/(admin)/_components/header";

interface Member {
  _id: string;
  name: string;
  designation: string;
  image: string;
}

/* ── Reusable form inside dialog ── */
function MemberForm({
  initial,
  onSave,
  saving,
}: {
  initial?: Partial<Member>;
  onSave: (data: FormData) => void;
  saving: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [designation, setDesignation] = useState(initial?.designation ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initial?.image ?? "");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!name.trim() || !designation.trim()) {
      toast.error("Name and designation are required");
      return;
    }
    if (!initial?._id && !imageFile) {
      toast.error("Please select an image");
      return;
    }
    const fd = new FormData();
    fd.append("name", name);
    fd.append("designation", designation);
    if (imageFile) fd.append("image", imageFile);
    onSave(fd);
  };

  return (
    <div className="space-y-4 py-2 ">
      <div className="space-y-1.5">
        <Label>Name</Label>
        <Input
          placeholder="e.g. Ayubsha Diwan"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1.5">
        <Label>Designation</Label>
        <Input
          placeholder="e.g. Director"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1.5">
        <Label>Photo</Label>
        {preview ? (
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={preview}
              alt="preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={() => {
                setPreview("");
                setImageFile(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ) : (
          <label
            htmlFor="member-img"
            className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 bg-gray-50 mx-auto transition-colors"
          >
            <UserPlus className="h-6 w-6 text-gray-400" />
          </label>
        )}
        <Input
          id="member-img"
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={saving}
        className="w-full rounded-xl bg-gray-900 hover:bg-gray-700 text-white"
      >
        {saving ? (
          <span className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Saving…
          </span>
        ) : (
          initial?._id ? "Save Changes" : "Add Member"
        )}
      </Button>
    </div>
  );
}

/* ── Member card ── */
function MemberCard({
  member,
  onEdit,
  onDelete,
}: {
  member: Member;
  onEdit: (m: Member) => void;
  onDelete: (m: Member) => void;
}) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col items-center text-center">
      <div className="relative w-20 h-20 mb-3">
        <img
          src={member.image}
          alt={member.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
        />
      </div>

      <p className="font-semibold text-gray-900 text-sm leading-tight">{member.name}</p>
      <p className="text-xs text-gray-400 mt-0.5">{member.designation}</p>

      {/* Actions — appear on hover */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {/* <button
          onClick={() => onEdit(member)}
          className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button> */}
        <button
          onClick={() => onDelete(member)}
          className="p-1.5 rounded-lg cursor-pointer bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 shadow-sm transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  /* Add dialog */
  const [addOpen, setAddOpen] = useState(false);
  const [addSaving, setAddSaving] = useState(false);

  /* Edit dialog */
  const [editTarget, setEditTarget] = useState<Member | null>(null);
  const [editSaving, setEditSaving] = useState(false);

  /* Delete dialog */
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/our-member");
      setMembers(res.data.members || []);
    } catch {
      toast.error("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  /* ADD */
  const handleAdd = async (fd: FormData) => {
    setAddSaving(true);
    try {
      await api.post("/admin/our-member", fd);
      toast.success("Member added");
      setAddOpen(false);
      fetchMembers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add member");
    } finally {
      setAddSaving(false);
    }
  };

  /* EDIT */
  const handleEdit = async (fd: FormData) => {
    if (!editTarget) return;
    setEditSaving(true);
    try {
      await api.put(`/admin/our-member/${editTarget._id}`, fd);
      toast.success("Member updated");
      setEditTarget(null);
      fetchMembers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update member");
    } finally {
      setEditSaving(false);
    }
  };

  /* DELETE */
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/admin/our-member/${deleteTarget._id}`);
      toast.success("Member deleted");
      setDeleteTarget(null);
      fetchMembers();
    } catch {
      toast.error("Failed to delete member");
    } finally {
      setDeleting(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50">
        <Header
          backlink="/admin/dashboard"
          pageName="Dashboard"
          currentPage="Our Members"
        />

        <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Team
            </p>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Members
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-600 font-medium shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {members.length} member{members.length !== 1 ? "s" : ""}
              </div>
            )}
            <Button
              onClick={() => setAddOpen(true)}
              className="h-9 px-4 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium"
            >
              <UserPlus className="h-4 w-4 mr-1.5" />
              Add Member
            </Button>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Users className="h-7 w-7 text-gray-400" />
            </div>
            <p className="text-gray-800 font-semibold text-base mb-1">No members yet</p>
            <p className="text-gray-400 text-sm max-w-xs">
              Add your first team member to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {members.map((m) => (
              <MemberCard
                key={m._id}
                member={m}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
          </DialogHeader>
          <MemberForm onSave={handleAdd} saving={addSaving} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      {/* <Dialog open={!!editTarget} onOpenChange={(v) => !v && setEditTarget(null)}>
        <DialogContent className="sm:max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          {editTarget && (
            <MemberForm
              initial={editTarget}
              onSave={handleEdit}
              saving={editSaving}
            />
          )}
        </DialogContent>
      </Dialog> */}

      {/* Delete Confirm */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Member?"
        description={`"${deleteTarget?.name}" will be permanently removed.`}
      />
    </div>
  );
}