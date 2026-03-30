// components/donate/DonorInfoFields.tsx

"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DonationFormValues } from "@/schemas/donate"

const inputClass = `
  shadow-none border-gray-200 rounded-lg
  focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]
  focus-visible:ring-offset-0
`

interface Props {
  values: Omit<DonationFormValues, "amount">
  errors: Partial<Record<keyof DonationFormValues, string>>
  onChange: (field: keyof DonationFormValues, value: string) => void
}

export default function DonorInfoFields({ values, errors, onChange }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* Full Name */}
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input
          className={inputClass}
          placeholder="John Doe"
          value={values.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          className={inputClass}
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2 md:col-span-2">
        <Label>Phone</Label>
        <Input
          className={inputClass}
          placeholder="9876543210"
          maxLength={10}
          value={values.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}
      </div>

    </div>
  )
}