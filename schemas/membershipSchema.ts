// schemas/membershipSchema.ts
import { z } from "zod"

export const membershipSchema = z.object({
  membershipType: z.string().min(1, "Membership type is required"),
  membershipDuration: z.number().min(1, "Duration must be at least 1 month"), // ← coerce hatao
  membershipFee: z.number().min(1, "Fee is required"),            
  features : z.array(z.string()).optional()             
})

export type MembershipFormValues = z.infer<typeof membershipSchema>

