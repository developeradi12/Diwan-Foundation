import { z } from "zod"

export const donationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name  should be at least 4 characters"),

  email: z
    .string()
    .email("Enter a Valid email address "),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter 10 digit Valid phone number"),

  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => Number(val) >= 1, "Amount should not be less than 1 rupyee"),

  screenshot: z
    .any()
    .refine((file) => file instanceof File, "Screenshot is required").optional(),
})

export type DonationFormValues = z.infer<typeof donationSchema>

