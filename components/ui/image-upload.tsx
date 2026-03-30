"use client"

import { UploadCloud, X } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"

interface Props {
  file: File | null
  onChange: (file: File | null) => void
}

export function ImageUpload({ file, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped) onChange(dropped)
  }

  const preview = file ? URL.createObjectURL(file) : null

  return (
    <div>

      {/* Preview */}

      {preview ? (

        <div className="relative w-full max-w-xs">

          <Image
            src={preview}
            alt="Uploaded Screenshot"
            width={300}
            height={200}
            className="rounded-lg border object-cover"
          />

          {/* Remove Button */}

          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black"
          >
            <X size={16} />
          </button>

        </div>

      ) : (

        /* Upload Area */

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-(--color-border) rounded-xl p-8 text-center cursor-pointer hover:border-(--color-accent) transition"
        >

          <UploadCloud className="mx-auto mb-3 text-(--color-accent)" />

          <p className="text-sm text-(--color-text-muted)">
            Drag & Drop payment screenshot here
          </p>

          <p className="text-xs mt-1 opacity-70">
            or click to upload
          </p>

        </div>

      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) =>
          onChange(e.target.files?.[0] || null)
        }
      />

    </div>
  )
}