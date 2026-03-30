import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Services";
import { uploadImage } from "@/utils/uploadImage";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectToDatabase();

//     const { id } = await params;

//     const service = isValidObjectId(id)
//       ? await Service.findById(id)
//       : await Service.findOne({ slug: id });

//     if (!service) {
//       return NextResponse.json(
//         { success: false, message: "Service not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: service },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message || "Failed to fetch service",
//       },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const category = formData.get("category") as string;
    const isActive = formData.get("isActive") === "true";

    const file = formData.get("image") as File | null;

    //  Find  (id or slug)
    const existingService = isValidObjectId(id)
      ? await Service.findById(id)
      : await Service.findOne({ slug: id });

    if (!existingService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    // Upload new image 
    let imageUrl = existingService.image;

    if (file && file.size > 0) {
      imageUrl = await uploadImage(file);
    }

    //  Update fields
    existingService.title = title || existingService.title;
    existingService.description = description || existingService.description;
    existingService.shortDescription =
      shortDescription || existingService.shortDescription;
    existingService.category = category || existingService.category;
    existingService.image = imageUrl;
    existingService.isActive = isActive;

    await existingService.save();

    return NextResponse.json(
      { success: true, data: existingService },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update service",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }
    // Delete image file from public folder
    if (service.image) {
      try {
        const filePath = path.join(process.cwd(), "public", service.image);
        await fs.unlink(filePath);
      } catch {
        // File missing — ignore
      }
    }
    await Service.deleteOne();

    return NextResponse.json(
      { success: true, message: "Delete successdully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "delete api error" },
      { status: 500 },
    )
  }
}