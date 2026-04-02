"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

const PRESET_AMOUNTS = [100, 500, 1000, 5000]

interface Props {
  value: string
  onChange: (amount: string) => void
  error?: string
}

export default function AmountSelector({ value, onChange, error }: Props) {
  const [customMode, setCustomMode] = useState(false)

  const numericValue = value ? Number(value) : null
  const isPreset = numericValue !== null && PRESET_AMOUNTS.includes(numericValue)

  const handlePreset = (amt: number) => {
    setCustomMode(false)        //  exit custom mode
    onChange(String(amt))
  }

  const handleCustomToggle = () => {
    setCustomMode(true)         //  explicitly enter custom mode
    if (isPreset) onChange("")  // clear preset value when switching to custom
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Select Amount (₹)</p>

      <div className="flex flex-wrap gap-3">
        {PRESET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => handlePreset(amt)}
            className={`px-5 py-2.5 rounded-lg border cursor-pointer font-semibold text-sm transition-all
              ${numericValue === amt && !customMode
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                : "bg-white text-gray-700 border-gray-200 hover:border-[var(--color-accent)]"
              }`}
          >
            ₹{amt.toLocaleString("en-IN")}
          </button>
        ))}

        <button
          type="button"
          onClick={handleCustomToggle}
          className={`px-5 py-2.5 rounded-lg border font-semibold text-sm transition-all
            ${customMode
              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
              : "bg-white text-gray-700 border-gray-200 hover:border-[var(--color-accent)]"
            }`}
        >
          Custom
        </button>
      </div>

      {/*  Only shown when custom mode is explicitly active */}
      {customMode && (
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

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}