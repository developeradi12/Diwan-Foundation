import { z } from "zod";

export const userBaseSchema = z.object({
  _id: z.string().optional(),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter valid phone")
    .or(z.literal("")) // allow empty
    .optional(),
  role: z.enum(["admin", "member", "user", "donor"]),
  image: z.instanceof(File).optional(),
  address: z.string().optional(),
  password: z.string().optional(), //change it mandatory
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),

  imageUrl: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),

  // Additional Details

  alternateMobile: z.string().optional(),
  whatsapp: z.string().optional(),
  aadhaar: z.string().optional(),
  createdAt: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),

  professionalType: z.string().optional(),
});
//user Schema
// export const userSchema = userBaseSchema.extend({
//   role: z.literal("donor")
// })

// //member schema
export const memberSchema = userBaseSchema.extend({
  role: z.literal("member"),
  fullName: z.string().min(2, "Full name is required"),

  email: z.string().email("Invalid email"),

  membershipPlan: z.string().min(1, "Select membership plan"),

  membershipStartDate: z.string().min(1, "Fill start date"),
  
});

// //admin schema
export const adminSchema = userBaseSchema.extend({
  role: z.literal("admin"),
});

export const accountSchema = z.discriminatedUnion("role", [
  memberSchema,
  adminSchema,
]);

//types

export type UserFormValues = z.infer<typeof userBaseSchema>;
export const userSchema = userBaseSchema;

export type MemberFormValues = z.infer<typeof memberSchema>;

export type AdminFormValues = z.infer<typeof adminSchema>;

export type Account = {
  _id: string;
  fullName: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  role: string;
  membershipPlan?: {
    _id: string;
    membershipType: string;
    membershipDuration: number;
  } | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Member = {
  _id: string;
  fullName: string;
  phone?: string;

  imageUrl?: string;

  membershipPlan?: {
    _id: string;
    membershipType: string;
    membershipDuration: string;
  } | null;

  membershipStartDate?: string;
};
export type EditMember = Omit<MemberFormValues, "membershipPlan"> & {
  _id: string;
  imageUrl?: string;
  membershipPlan?: {
    _id: string;
    membershipType: string;
    membershipDuration: number;
  } | null;

  createdAt?: string;
  updatedAt?: string;
};