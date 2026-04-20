"use client"

import { useEffect, useState } from "react"
import { Pencil, X, CheckCircle, AlertCircle } from "lucide-react"
import { Eye, EyeOff } from "lucide-react"
// ─── Types ─────────────────────────────────────────────────────────────────
interface MembershipPlan {
  _id: string
  name: string
  price: number
  duration: string // e.g. "1 Year", "6 Months"
  features?: string[]
}

interface UserProfile {
  _id: string
  fullName: string
  email: string
  phone: string
  alternateMobile?: string
  role?: string
  professionalType?: string
  city?: string
  state?: string
  country?: string
  pincode?: string
  dob?: string
  aadhaar?: string
  gender?: string
  imageUrl?: string
  facebook?: string
  instagram?: string
  linkedin?: string
  twitter?: string
  whatsapp?: string
  membershipPlan?: MembershipPlan
  membershipStartDate?: string
  membershipEndDate?: string
  createdAt?: string
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function formatDate(d?: string | null) {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  })
}

// ─── Section heading ───────────────────────────────────────────────────────
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="px-6 pt-5 pb-2">
      <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">{title}</p>
    </div>
  )
}

// ─── Single row ────────────────────────────────────────────────────────────
function Row({
  label,
  name,
  type = "text",
  value,
  editing,
  onChange,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  value: string
  editing: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"

  return (
    <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-50 last:border-0">
      <span className="w-36 shrink-0 text-sm text-gray-400">{label}</span>

      {editing ? (
        <div className="flex-1 relative">
          <input
            type={isPassword ? (showPassword ? "text" : "password") : type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            className="w-full text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />

          {/* 👁️ Eye Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <Eye size={16} /> :<EyeOff size={16} />} 
            </button>
          )}
        </div>
      ) : (
        <span className="flex-1 text-sm text-gray-800">
          {isPassword ? "••••••••" : value || "—"}
        </span>
      )}
    </div>
  )
}
// ─── Main Page ─────────────────────────────────────────────────────────────
export default function MemberProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  // Editable form state
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    alternateMobile: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    dob: "",
    gender: "",
    aadhaar: "",
    professionalType: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    whatsapp: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // ── Fetch profile ──────────────────────────────────────────────────────
  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    try {
      setLoading(true)
      const res = await fetch("/api/v1/profile")
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setProfile(data.user)
      // Prefill form with DB data
      const u = data.user
      setForm({
        fullName: u.fullName || "",
        phone: u.phone || "",
        alternateMobile: u.alternateMobile || "",
        city: u.city || "",
        state: u.state || "",
        country: u.country || "",
        pincode: u.pincode || "",
        dob: u.dob ? u.dob.slice(0, 10) : "",
        gender: u.gender || "",
        aadhaar: u.aadhaar || "",
        professionalType: u.professionalType || "",
        facebook: u.facebook || "",
        instagram: u.instagram || "",
        linkedin: u.linkedin || "",
        twitter: u.twitter || "",
        whatsapp: u.whatsapp || "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err: any) {
      showToast("error", err.message || "Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  // ── Handle input change ────────────────────────────────────────────────
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ── Cancel edit ────────────────────────────────────────────────────────
  function handleCancel() {
    if (!profile) return
    setForm({
      fullName: profile.fullName || "",
      phone: profile.phone || "",
      alternateMobile: profile.alternateMobile || "",
      city: profile.city || "",
      state: profile.state || "",
      country: profile.country || "",
      pincode: profile.pincode || "",
      dob: profile.dob ? profile.dob.slice(0, 10) : "",
      gender: profile.gender || "",
      aadhaar: profile.aadhaar || "",
      professionalType: profile.professionalType || "",
      facebook: profile.facebook || "",
      instagram: profile.instagram || "",
      linkedin: profile.linkedin || "",
      twitter: profile.twitter || "",
      whatsapp: profile.whatsapp || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setIsEditing(false)
  }

  // ── Submit ─────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      return showToast("error", "New password and confirm password do not match")
    }
    try {
      setSaving(true)
      const res = await fetch("/api/v1/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setProfile(data.user)
      setIsEditing(false)
      showToast("success", "Profile updated successfully")
    } catch (err: any) {
      showToast("error", err.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  // ── Toast helper ───────────────────────────────────────────────────────
  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  // ─── Loading ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
            toast.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {toast.type === "success"
            ? <CheckCircle size={16} />
            : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-5">

        {/* ── Profile Card ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">Profile Details</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-sm cursor-pointer font-medium text-green-600 hover:text-green-700 transition"
              >
                <Pencil size={13} />
                Edit
              </button>
            )}
            {isEditing && (
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                <X size={14} />
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>

            {/* Personal Info */}
            <SectionTitle title="Personal Information" />
            <div className="divide-y divide-gray-50">
              <Row label="Full Name"        name="fullName"        value={form.fullName}        editing={isEditing} onChange={handleChange} />
              <Row label="Email"            name="email"           value={profile?.email || ""} editing={false}     onChange={handleChange} />
              <Row label="Phone"            name="phone"           value={form.phone}           editing={isEditing} onChange={handleChange} type="tel" />
              <Row label="Alternate Mobile" name="alternateMobile" value={form.alternateMobile} editing={isEditing} onChange={handleChange} type="tel" />
              <Row label="Date of Birth"    name="dob"             value={form.dob}             editing={isEditing} onChange={handleChange} type="date" />
              <Row label="Gender"           name="gender"          value={form.gender}          editing={isEditing} onChange={handleChange} />
              <Row label="Aadhaar No."      name="aadhaar"         value={form.aadhaar}         editing={isEditing} onChange={handleChange} />
              <Row label="Profession"       name="professionalType" value={form.professionalType} editing={isEditing} onChange={handleChange} />
            </div>

            {/* Address */}
            <SectionTitle title="Address" />
            <div className="divide-y divide-gray-50">
              <Row label="City"    name="city"    value={form.city}    editing={isEditing} onChange={handleChange} />
              <Row label="State"   name="state"   value={form.state}   editing={isEditing} onChange={handleChange} />
              <Row label="Country" name="country" value={form.country} editing={isEditing} onChange={handleChange} />
              <Row label="Pincode" name="pincode" value={form.pincode} editing={isEditing} onChange={handleChange} />
            </div>

            {/* Social Links */}
            <SectionTitle title="Social Links" />
            <div className="divide-y divide-gray-50">
              <Row label="WhatsApp"  name="whatsapp"  value={form.whatsapp}  editing={isEditing} onChange={handleChange} />
              <Row label="Facebook"  name="facebook"  value={form.facebook}  editing={isEditing} onChange={handleChange} />
              <Row label="Instagram" name="instagram" value={form.instagram} editing={isEditing} onChange={handleChange} />
              <Row label="LinkedIn"  name="linkedin"  value={form.linkedin}  editing={isEditing} onChange={handleChange} />
              <Row label="Twitter"   name="twitter"   value={form.twitter}   editing={isEditing} onChange={handleChange} />
            </div>

            {/* Change Password — only shown in edit mode */}
            {isEditing && (
              <>
                <SectionTitle title="Change Password" />
                <div className="divide-y divide-gray-50">
                  <Row label="Old Password"     name="oldPassword"     type="password" value={form.oldPassword}     editing={true} onChange={handleChange} placeholder="Enter current password" />
                  <Row label="New Password"     name="newPassword"     type="password" value={form.newPassword}     editing={true} onChange={handleChange} placeholder="Enter new password" />
                  <Row label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} editing={true} onChange={handleChange} placeholder="Confirm new password" />
                </div>
              </>
            )}

            {/* Submit — only in edit mode */}
            {isEditing && (
              <div className="px-6 py-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full button text-white text-sm font-medium py-2.5 rounded-xl cursor-pointer transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Member since */}
        {profile?.createdAt && (
          <p className="text-center text-xs text-gray-400">
            Member since {formatDate(profile.createdAt)}
          </p>
        )}
      </div>
    </div>
  )
}