import { z } from "zod"

export const donationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name at least 2 characters hona chahiye"),

  email: z
    .string()
    .email("Valid email daalo"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Valid 10 digit Indian phone number daalo"),

  amount: z
    .string()
    .min(1, "Amount select karo")
    .refine((val) => Number(val) >= 1, "Amount ₹1 se kam nahi ho sakta"),
})

export type DonationFormValues = z.infer<typeof donationSchema>

// export type Donor = {
//   _id: string
//   userId: {                    // ✅ populated object
//     _id: string
//     fullName: string
//     email?: string
//     phone?: string
//   }|null
//   amount: string
//   message?: string
//   screenshotUrl?: string
//   transactionId: string
//   donatedAt?: string         // ← required for date column
//   createdAt?: string
//   updatedAt?: string
// }