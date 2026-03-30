"use client";

import api from "@/lib/axios";
import { MemberFormValues, memberSchema } from "@/schemas/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MemberForm from "./MemberForm";

interface Plan {
  _id: string;
  membershipType: string;
}

export default function CreateMember() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      dob: "",
      gender: "",
      alternateMobile: "",
      whatsapp: "",
      aadhaar: "",
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      professionalType: "",
      membershipPlan: "",
      role: "member",
      membershipStartDate: "",
      image: undefined,
    },
  });

  useEffect(() => {
    api
      .get("/admin/membership")
      .then((res) => setPlans(res.data.data || []))
      .catch(() => toast.error("Failed to load membership plans"));
  }, []);

  async function onSubmit(data: MemberFormValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image" && value != null && value !== "") {
          formData.append(key, String(value));
        }
      });

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      await api.post("admin/member", formData);

      toast.success("Member created successfully");
      router.push("/admin/members");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create member");
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
      mode="create"
    />
  );
}