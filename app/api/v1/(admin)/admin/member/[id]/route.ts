import connectToDatabase from "@/lib/mongodb"

import Member from "@/models/User"
import { deleteLocalImage } from "@/utils/deleteImage"
import { uploadImage } from "@/utils/uploadImage"
import { NextRequest, NextResponse } from "next/server"


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase()

    const { id } = await params

    const member = await Member.findById(id)
    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found",
        },
        { status: 404 }
      )
    }
    if (member.imageUrl) {
      await deleteLocalImage(member.imageUrl);
    }

    await Member.deleteOne();

    return NextResponse.json(
      {
        success: true,
        message: "Member deleted successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Delete member error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete member",
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    const formData = await req.formData();
    const removeImage = formData.get("removeImage");
    const updateData: any = {};

    formData.forEach((value, key) => {
      if (key !== "image" && key !== "removeImage") {
        updateData[key] = value;
      }
    });

    //  1. Get existing member
    const existingMember = await Member.findById(id);

    if (!existingMember) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    const file = formData.get("image")

    //  CASE 1: Remove image
    if (removeImage === "true") {
      if (existingMember.imageUrl) {
        await deleteLocalImage(existingMember.imageUrl);
      }
      updateData.imageUrl = null;
    }
    //  CASE 2: New image uploaded
    else if (file instanceof File && file.size > 0) {
      const newImageUrl = await uploadImage(file, "users");

      if (existingMember.imageUrl) {
        await deleteLocalImage(existingMember.imageUrl);
      }

      updateData.imageUrl = newImageUrl;
    }
    
    //  3. Update DB
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Member updated successfully",
        data: updatedMember,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE MEMBER ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Update API error" },
      { status: 500 }
    );
  }
}