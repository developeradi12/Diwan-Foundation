"use client";

import Image from "next/image";
import { PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  title: string;
  category: string;
  images: string[];
}

const GalleryCard = ({ id, title, category, images }: Props) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      
      {/* Image Preview */}
      <div className="relative h-48 w-full">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-400 capitalize">{category}</p>

        <p className="text-xs mt-2 text-gray-500">
          {images.length} image{images.length > 1 ? "s" : ""}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Link href={`/admin/gallery/edit/${id}`}>
            <Button size="sm">
              <PencilIcon size={16} />
            </Button>
          </Link>

          <Button size="sm" variant="destructive">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;