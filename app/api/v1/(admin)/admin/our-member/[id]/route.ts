import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { uploadImage } from "@/utils/uploadImage";
import OurMember from "@/models/Our-member";

type Params = { params: Promise<{ id: string }> };

/* ── PUT update member ── */
// export async function PUT(req: NextRequest, { params }: Params) {
//   try {
//     await connectToDatabase();

//     const { id } = await params;
//     const formData = await req.formData();

//     const name = formData.get("name") as string | null;
//     const designation = formData.get("designation") as string | null;
//     const file = formData.get("image") as File | null;

//     const update: Record<string, string> = {};
//     if (name) update.name = name;
//     if (designation) update.designation = designation;

//     // Only upload new image if one was provided
//     if (file && file.size > 0) {
//       update.image = await uploadImage(file);
//     }

//     const member = await OurMember.findByIdAndUpdate(id, update, { new: true });

//     if (!member) {
//       return NextResponse.json(
//         { success: false, message: "Member not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, member });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }

/* ── DELETE member ── */
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();

    const { id } =await params;
    const member = await OurMember.findByIdAndDelete(id);

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Member deleted" });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}