"use client"

import Header from "@/app/(admin)/_components/header"
import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"
import api from "@/lib/axios"
import { toast } from "sonner"

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isEditing, setIsEditing] = useState(false)

  // 🔹 Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/admin/profile")
        const data = res.data

        setForm((prev) => ({
          ...prev,
          name: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
        }))
      } catch (error: any) {
        console.error("Fetch error", error.response?.data || error.message)
      }
    }

    fetchProfile()
  }, [])

  // 🔹 Handle Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 🔹 Submit Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await api.put("/admin/profile", form)

      toast.success(res.data.message || "Profile updated ")

      setIsEditing(false)

      // Clear password fields
      setForm((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed ❌")
    }
  }

  // 🔹 Cancel Edit
  const handleCancel = () => {
    setIsEditing(false)
    setForm((prev) => ({
      ...prev,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="My Profile"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold">My Profile</h2>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-green-600 cursor-pointer"
              >
                <Pencil size={14} /> Edit
              </button>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div>

              {/* Name */}
              <Field
                label="Name"
                name="name"
                value={form.name}
                isEditing={isEditing}
                onChange={handleChange}
              />

              {/* Email */}
              <Field
                label="Email"
                name="email"
                value={form.email}
                isEditing={isEditing}
                onChange={handleChange}
              />

              {/* Phone */}
              <Field
                label="Phone"
                name="phone"
                value={form.phone}
                isEditing={isEditing}
                onChange={handleChange}
              />

              {/* Password (View Mode) */}
              {!isEditing && (
                <DisplayField label="Password" value="••••••••" />
              )}

              {/* Password Fields (Edit Mode) */}
              {isEditing && (
                <>
                  <Field
                    label="Old Password"
                    name="oldPassword"
                    type="password"
                    value={form.oldPassword}
                    onChange={handleChange}
                    isEditing
                  />

                  <Field
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={form.newPassword}
                    onChange={handleChange}
                    isEditing
                  />

                  <Field
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    isEditing
                  />
                </>
              )}
            </div>

            {/* Buttons */}
            {isEditing && (
              <div className="flex gap-3 p-4">
                <button className="flex-1 button cursor-pointer text-white py-2 rounded-lg">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 py-2 cursor-pointer rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

// 🔹 Reusable Field Component
function Field({
  label,
  name,
  value,
  onChange,
  isEditing,
  type = "text",
}: any) {
  return (
    <div className="flex items-center px-6 py-4 gap-4">
      <span className="w-32 text-sm text-gray-500">{label}</span>

      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 border border-gray-400 rounded-lg px-3 py-1.5"
        />
      ) : (
        <span className="flex-1 text-sm">{value || "—"}</span>
      )}
    </div>
  )
}

// 🔹 Display Only Field
function DisplayField({ label, value }: any) {
  return (
    <div className="flex items-center px-6 py-4 gap-4">
      <span className="w-32 text-sm text-gray-500">{label}</span>
      <span className="flex-1 text-sm">{value}</span>
    </div>
  )
}