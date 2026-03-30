"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import api from "@/lib/axios"
import { toast } from "sonner"

function SuccessContent() {
  const params = useSearchParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<"success" | "failed">("success")
  const [called, setCalled] = useState(false)

  useEffect(() => {
    if (called) return
    setCalled(true)

    const verifyPayment = async () => {
      try {
        const order_id = params.get("order_id")

        if (!order_id) {
          setStatus("failed")
          toast.error("Invalid payment")
          return
        }

        const res = await api.post("/donations/verify", { order_id })

        if (res.data.status === "success") {
          setStatus("success")
          toast.success("Payment successful 🎉")
        } else {
          setStatus("failed")
          toast.error("Payment failed")
        }
      } catch {
        setStatus("failed")
        toast.error("Payment verification failed")
      } finally {
        setLoading(false)
      }
    }

    verifyPayment()
  }, [called, params])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Verifying payment...</h1>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      {status === "success" ? (
        <>
          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful 🎉
          </h1>
          <p>Thank you for your donation ❤️</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600">
            Payment Failed ❌
          </h1>
          <button
            onClick={() => router.push("/donate")}
            className="px-6 py-2 bg-black text-white rounded"
          >
            Try Again
          </button>
        </>
      )}
    </div>
  )
}

export default SuccessContent