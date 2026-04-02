"use client";

import { toast } from "sonner";
import api from "@/lib/axios";
import type { EditMember, MemberFormValues } from "@/schemas/UserSchema";
import { memberSchema } from "@/schemas/UserSchema";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import MemberForm from "../../create/MemberForm";

interface Plan {
  _id: string;
  membershipType: string;
}

export default function EditMemberP({ initialData }: { initialData: EditMember }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      fullName: "", email: "", phone: "", address: "",
      country: "", state: "", city: "", pincode: "",
      dob: "", gender: "", alternateMobile: "", whatsapp: "",
      aadhaar: "", instagram: "", facebook: "", twitter: "",
      linkedin: "", professionalType: "", membershipPlan: "",
      role: "member", membershipStartDate: "", image: undefined,
    },
  });

  useEffect(() => {
    api.get("/admin/membership")
      .then((res) => setPlans(res.data.data || []))
      .catch(() => toast.error("Failed to load membership plans"));

    if (initialData) {
      form.reset({
        ...initialData,
        dob: initialData.dob?.split("T")[0] ?? "",
        membershipStartDate: initialData.membershipStartDate?.split("T")[0] ?? "",
        membershipPlan: initialData.membershipPlan?._id ?? "",
        imageUrl: initialData.imageUrl ?? undefined, // always clear — image is handled via existingImage prop
      });
    }
  }, [initialData, form]);

  async function onSubmit(data: MemberFormValues, removeImage: boolean) {
    console.log("form data", data);
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image" && value != null && value !== "") {
          formData.append(key, String(value));
        }
      });

      if (removeImage) {
        formData.append("removeImage", "true");
      }
      // if no new file, backend keeps the existing image as-is

      const res = await api.put(`/admin/member/${initialData._id}`, formData);
      toast.success(res.data?.message || "Member updated successfully");
      router.back();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update member");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MemberForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      plans={plans}
      mode="edit"
      existingImage={initialData.imageUrl}
    />
  );
}