import connectToDatabase from "@/lib/mongodb";
import Donation from "@/models/Donation";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    //  find user first 
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "user not found" },
        { status: 404 }
      );
    }

    //  delete all donations linked to this user
    await Donation.deleteMany({ user: user._id });

    //  delete user
    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "User and related donations deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "user not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { fullName, email, role, phone, amount } = body;

    // validations
    if (!fullName || !email || !role) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    if (role !== "admin" && !phone) {
      return NextResponse.json(
        { success: false, message: "Phone required for non-members" },
        { status: 400 }
      );
    }

    if (role === "donor" && !amount) {
      return NextResponse.json(
        { success: false, message: "Amount required for donor" },
        { status: 400 }
      );
    }

    // update user
    user.fullName = fullName;
    user.email = email;
    user.role = role;
    user.phone = phone || null;

    if (role === "donor") {
      user.amount = amount;

      //  create/update donation
      await Donation.findOneAndUpdate(
        { user: user._id }, // find by user
        {
          user: user._id,
          amount: amount,
          paymentStatus: "success",
          cashfreeOrderId: "add by admin",
          paidAt: new Date(),
        },
        {
          new: true,
          upsert: true, // create if not exists
        }
      );

    } else {
      user.amount = undefined;

      //  remove donation if user is no longer donor
      await Donation.findOneAndDelete({ userId: user._id });
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}