"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DonationFormValues, donationSchema } from "@/schemas/donate"
import api from "@/lib/axios"
import AmountSelector from "./_components/amountSelector"
import DonorInfoFields from "./_components/formFields"

const EMPTY_FORM: DonationFormValues = {
  fullName: "",
  email: "",
  phone: "",
  amount: "",
  screenshot: null,
}

export default function DonateForm() {
  const router = useRouter()

  const [form, setForm] = useState<DonationFormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof DonationFormValues, string>>>({})
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleChange = (field: keyof DonationFormValues, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleFileChange = (file: File | null) => {
    handleChange("screenshot", file)

    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = donationSchema.safeParse(form)

    if (!result.success) {
      const newErrors: any = {}
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message
      })
      setErrors(newErrors)
      return
    }

    if (!form.screenshot) {
      toast.error("Please upload payment screenshot")
      return
    }

    const toastId = toast.loading("Submitting donation...")

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("fullName", form.fullName)
      formData.append("email", form.email)
      formData.append("phone", form.phone)
      formData.append("amount", form.amount)
      formData.append("screenshot", form.screenshot)

      await api.post("/donations/manual", formData)

      toast.success("Donation submitted!", { id: toastId })

      //  REDIRECT
      router.push("/donate/success")

    } catch (err: any) {
      console.error(err)
      toast.error(err?.message || "Something went wrong", { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <Card className="shadow-xl rounded-2xl border-0">
        <CardContent className="p-10">

          {/* QR */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Scan & Pay</h2>
            <img src="/QR.jpeg" className="mx-auto w-48 h-48" />
            <p className="text-muted-foreground mt-2">
              Pay via UPI and upload screenshot below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            <AmountSelector
              value={form.amount}
              onChange={(val) => handleChange("amount", val)}
              error={errors.amount}
            />

            <DonorInfoFields
              values={{
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
              }}
              errors={errors}
              onChange={handleChange}
            />

            {/*  BETTER UPLOAD UI */}
           
            <div>
              <label className="block font-medium mb-2">
                Upload Payment Screenshot *
              </label>

              <div className="border-2 border-dashed rounded-xl p-6 text-center relative hover:bg-muted transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  className="hidden"
                  id="fileUpload"
                />

                <label htmlFor="fileUpload" className="cursor-pointer block">
                  {preview ? (
                    <div className="relative inline-block">

                      {/* ❌ REMOVE BUTTON */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFileChange(null)
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600"
                      >
                        ✕
                      </button>

                      <img
                        src={preview}
                        className="mx-auto h-40 object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Click to upload or drag image here
                    </p>
                  )}
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <div className="bg-muted px-6 py-3 rounded-lg font-semibold">
                ₹{form.amount ? Number(form.amount).toLocaleString("en-IN") : 0}
              </div>

              <Button type="submit" disabled={loading} className="button cursor-pointer">
                {loading ? "Submitting…" : "Submit Donation"}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}