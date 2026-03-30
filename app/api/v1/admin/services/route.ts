import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Services";
import { uploadImage } from "@/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

//  GET ALL SERVICES
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get("isActive");

    const filter: Record<string, any> = {};
    if (isActive !== null) filter.isActive = isActive === "true";

    const services = await Service.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}

//  CREATE SERVICE
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const isActive = formData.get("isActive") === "true";

    const file = formData.get("image") as File;

    // Validation
    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title & description required" },
        { status: 400 }
      );
    }

    //  Upload image (if exists)
   
    const imageUrl = await uploadImage(file);
    

    //  Create service
    const service = await Service.create({
      title,
      description,
      shortDescription,
      image: imageUrl,
      isActive,
    });

    return NextResponse.json(
      { success: true, data: service },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}