"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";

export default function ServiceForm({ initialData }: any) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    shortDescription: initialData?.shortDescription || "",
    image: null as File | null, //  store file
    preview: initialData?.image || "", //  preview URL
    isActive: initialData?.isActive ?? true,
  });

  const [loading, setLoading] = useState(false);

  //  Handle Input Change
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //  Handle Image Select
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file), // ✅ instant preview
    }));
  };

  // 🚀 Submit Form
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("shortDescription", form.shortDescription || "");
      formData.append("isActive", String(form.isActive));

      //  send file if selected
      if (form.image) {
        formData.append("image", form.image);
      }

      if (initialData) {
        await api.put(`/admin/services/${initialData._id}`, formData);
      } else {
        await api.post(`/admin/services`, formData); //  FIXED
      }

      router.push("/admin/services");
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl space-y-6 bg-white p-6 rounded-xl border border-gray-300 shadow-sm"
    >
      {/* Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      {/* Category */}
      {/* <div className="space-y-1">
        <label className="text-sm font-medium">Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div> */}

      {/* Short Description */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Short Description</label>
        <input
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2 flex flex-col">
        <label className="text-sm font-medium">Service Image</label>

        <input type="file" onChange={handleImageChange} />

        {form.preview && (
          <img
            src={form.preview}
            alt="preview"
            className="w-40 h-40 object-cover rounded-lg gap-6 border mt-2"
          />
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        <label className="text-sm">Active</label>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? "Saving..."
          : initialData
          ? "Update Service"
          : "Create Service"}
      </Button>
    </form>
  );
}