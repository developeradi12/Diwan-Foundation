// import { Suspense } from "react"
// import SuccessContent from "./successContent"

// export default function SuccessPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="h-screen flex items-center justify-center">
//           <h1 className="text-xl font-semibold">Loading...</h1>
//         </div>
//       }
//     >
//       <SuccessContent />
//     </Suspense>
//   )
// }
export default function SuccessPage() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Thank You!
      </h1>
      <p className="mt-4 text-muted-foreground">
        Your donation has been submitted successfully.
      </p>
    </div>
  )
}