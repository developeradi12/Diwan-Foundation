import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import Banner from "@/models/banner";
import { uploadImage } from "@/utils/uploadImage";

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectToDatabase();
//     const {id} =await params;
//     const banner = await Banner.findById(id);
//     if (!banner) {
//       return NextResponse.json(
//         { success: false, message: "Banner not found" },
//         { status: 404 }
//       );
//     }

//     const formData = await req.formData();

//     const title       = formData.get("title") as string | null;
//     const subtitle    = formData.get("subtitle") as string | null;
//     const imageFile   = formData.get("image") as File | null;

//     if (title)       banner.title       = title;
//     if (subtitle    !== null) banner.subtitle    = subtitle    || undefined;

//     // Replace image if new one uploaded
//     if (imageFile && imageFile.size > 0) {
//       // Delete old image from public folder
//       if (banner.image) {
//         try {
//           const oldPath = path.join(process.cwd(), "public", banner.image);
//           await fs.unlink(oldPath);
//         } catch {
//           // Old file missing — ignore
//         }
//       }
//       const newPath = await uploadImage(imageFile, "banners");
//       if (newPath) banner.image = newPath;
//     }

//     await banner.save();

//     return NextResponse.json({ success: true, banner });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message || "Failed to update banner" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
   const {id} = await params
    const banner = await Banner.findById(id);
    if (!banner) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    // Delete image file from public folder
    if (banner.image) {
      try {
        const filePath = path.join(process.cwd(), "public", banner.image);
        await fs.unlink(filePath);
      } catch {
        // File missing — ignore
      }
    }

    await banner.deleteOne();

    return NextResponse.json({ success: true, message: "Banner deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete banner" },
      { status: 500 }
    );
  }
}