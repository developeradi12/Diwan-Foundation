"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import api from "@/lib/axios"
import { toast } from "sonner"

export default function ResetPasswordClient() {
  const params = useSearchParams()
  const router = useRouter()

  const token = params.get("token")

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await api.post("/auth/reset-password", {
        token,
        password,
      })

      toast.success("Password updated")
      router.push("/login")

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-[350px]">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </div>
    </div>
  )
}