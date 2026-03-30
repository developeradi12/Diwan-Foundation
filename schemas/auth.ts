import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(10, "Enter valid phone"),
  password: z.string().min(8),
  confirm: z.string()
}).refine((data) => data.password === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
})

export type SignupFormValues = z.infer<typeof signupSchema>