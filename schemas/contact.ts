import z from "zod"

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    message: z.string().min(5, "Message must be at least 5 characters"),
})

export type ContactFormData = z.infer<typeof contactSchema>