// components/donate/AmountSelector.tsx

"use client"

import { Input } from "@/components/ui/input"

const PRESET_AMOUNTS = [100, 500, 1000, 5000]

interface Props {
  value: string
  onChange: (amount: string) => void
  error?: string
}

export default function AmountSelector({ value, onChange, error }: Props) {
  const isPreset = PRESET_AMOUNTS.map(String).includes(value)
  const isCustom = value !== "" && !isPreset

  return (
    <div className="space-y-3">

      <p className="text-sm font-medium">Select Amount (₹)</p>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-3">
        {PRESET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => onChange(String(amt))}
            className={`px-5 py-2.5 rounded-lg border cursor-pointer font-semibold text-sm transition-all
              ${
                value === String(amt)
                  ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[var(--color-accent)]"
              }`}
          >
            ₹{amt.toLocaleString("en-IN")}
          </button>
        ))}

        {/* Custom toggle button */}
        <button
          type="button"
          onClick={() => onChange("")}    // clear kar do taaki input show ho
          className={`px-5 py-2.5 rounded-lg border font-semibold text-sm transition-all
            ${
              isCustom || value === ""
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                : "bg-white text-gray-700 border-gray-200 hover:border-[var(--color-accent)]"
            }`}
        >
          Custom
        </button>
      </div>

      {/* Custom amount input — sirf tab dikhao jab koi preset select nahi */}
      {!isPreset && (
        <Input
          type="number"
          min={1}
          placeholder="Enter custom amount in ₹"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="max-w-xs shadow-none border-gray-200 rounded-lg
            focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]
            focus-visible:ring-offset-0"
        />
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

    </div>
  )
}