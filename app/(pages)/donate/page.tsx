"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DonationFormValues, donationSchema } from "@/schemas/donate"
import api from "@/lib/axios"
import AmountSelector from "./_components/amountSelector"
import DonorInfoFields from "./_components/formFields"
import { load } from "@cashfreepayments/cashfree-js"

const EMPTY_FORM: DonationFormValues = {
  fullName: "",
  email: "",
  phone: "",
  amount: "",
}

export default function DonateForm() {
  const [form, setForm] = useState<DonationFormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof DonationFormValues, string>>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof DonationFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const openCashfree = async (paymentSessionId: string) => {
    const cashfree = await load({
      mode:
        process.env.NEXT_PUBLIC_CASHFREE_MODE === "production"
          ? "production"
          : "sandbox",
    })

    if (!cashfree) {
      throw new Error("Payment SDK failed to load")
    }

    // redirects away — no return value needed
    await cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_self",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = donationSchema.safeParse(form)

    if (!result.success) {
      const newErrors: Partial<Record<keyof DonationFormValues, string>> = {}
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as keyof DonationFormValues] = issue.message
      })
      setErrors(newErrors)
      return
    }

    const toastId = toast.loading("Initiating payment...")  //  save toast id

    try {
      setLoading(true)

      const { data } = await api.post("/donations/initiate", form)
         
      if (!data?.payment_session_id) {
        toast.error("Payment session failed", { id: toastId })  //  replaces loading toast
        return
      }

      toast.loading("Redirecting to secure payment...", { id: toastId })
      await openCashfree(data.payment_session_id)  //  pass only what's needed

      // If we reach here, redirect didn't happen — dismiss toast
      toast.dismiss(toastId)

    } catch (err: any) {
      console.error(err)
      toast.error(err?.message || "Something went wrong", { id: toastId })  //  always dismisses loading
      setLoading(false)  //  only reset on actual error, not on successful redirect
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <Card className="shadow-xl rounded-2xl border-0">
        <CardContent className="p-10">
          <div className="text-center mb-10">
            <p className="text-sm text-[var(--color-accent)] font-semibold uppercase tracking-wider">
              Donate Now
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Make a Difference Today
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Your contribution helps provide food, education, and essential support.
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

            <div className="flex items-center justify-between pt-6 border-t">
              <div className="bg-muted px-6 py-3 rounded-lg font-semibold">
                Total{" "}
                <span className="text-[var(--color-accent)]">
                  ₹{form.amount ? Number(form.amount).toLocaleString("en-IN") : 0}
                </span>
              </div>

              <Button
                type="submit"
                disabled={loading || !form.amount}
                className="bg-[var(--color-accent)] px-8 py-6 hover:text-white cursor-pointer text-base"
              >
                {loading ? "Please wait…" : "Donate Now →"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}