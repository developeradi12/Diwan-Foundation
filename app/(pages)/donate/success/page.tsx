import { Suspense } from "react"
import SuccessContent from "./successContent"

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-xl font-semibold">Loading...</h1>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}