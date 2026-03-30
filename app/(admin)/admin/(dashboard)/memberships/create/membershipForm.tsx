"use client";

import { FormSection } from "@/app/(admin)/_components/formSection";
import { ChessQueen, Minus, Plus } from "lucide-react";
import { MembershipFormValues, membershipSchema } from "@/schemas/membershipSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  initialData?: MembershipFormValues & { _id?: string }; // for edit mode
}

const MembershipForm = ({ initialData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isEdit = !!initialData?._id;

  const form = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      membershipType: initialData?.membershipType || "",
      membershipDuration: initialData?.membershipDuration || undefined,
      membershipFee: initialData?.membershipFee || undefined,
      features: initialData?.features?.length ? initialData.features : [""],
    },
  });

  const handleSubmitForm = async (data: MembershipFormValues) => {
    setIsSubmitting(true);
    try {
      const cleanData = {
        ...data,
        features: (data.features || []).filter((f) => f.trim() !== ""),
      };

      if (isEdit) {
        await api.put(`/admin/membership/${initialData._id}`, cleanData); // ✅ edit
        toast.success("Membership plan updated!");
      } else {
        await api.post("/admin/membership", cleanData); // ✅ was sending `data` — bug fixed
        toast.success("Membership plan created!");
      }

      router.push("/admin/memberships");
    } catch (error) {
      toast.error("Failed to save plan. Try again.");
      console.error("Error saving membership:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = form.watch("features") || [];

  return (
    <div className="p-5">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold tracking-tight" style={{ color: "var(--color-primary)" }}>
              {isEdit ? "Edit Membership" : "Add New Membership"}
            </p>
            <p className="text-sm mt-0.5 text-gray-400">
              Fill in the details to {isEdit ? "update" : "add"} membership plan
            </p>
          </div>
          <div
            className="text-xs font-medium px-3 py-1.5 rounded-full"
            style={{
              background: "color-mix(in oklch, var(--color-accent) 20%, white)",
              color: "var(--color-primary)",
            }}
          >
            {isEdit ? "Edit Plan" : "New Plan"}
          </div>
        </div>

        <FormSection title="Membership/Subscription Details" icon={ChessQueen}>
          <form id="membership-form" onSubmit={form.handleSubmit(handleSubmitForm)}>
            <FieldGroup className="grid grid-cols-3 gap-4">

              <Controller
                name="membershipType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Membership Type</FieldLabel>
                    <Input {...field} placeholder="Gold, Silver, Premium" autoComplete="off" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-700" />}
                  </Field>
                )}
              />

              <Controller
                name="membershipDuration"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Duration (in months)</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value ?? ""}
                      placeholder="1, 3, 6, 12"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-700" />}
                  </Field>
                )}
              />

              <Controller
                name="membershipFee"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Amount (₹)</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value ?? ""}
                      placeholder="₹200"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-700" />}
                  </Field>
                )}
              />

              {features.map((_, index) => (
                <Controller
                  key={index}
                  name={`features.${index}`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Feature {index + 1}</FieldLabel>
                      <div className="flex gap-2">
                        <Input {...field} placeholder={`Feature ${index + 1}`} />
                        <Button
                          type="button"
                          onClick={() => form.setValue("features", features.filter((_, i) => i !== index))}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Minus />
                        </Button>
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-700" />}
                    </Field>
                  )}
                />
              ))}

            </FieldGroup>

            <Field orientation="horizontal" className="mt-5">
              <Button
                type="button"
                onClick={() => form.setValue("features", [...features, ""])}
                className="text-white"
              >
                <Plus /> Add Feature
              </Button>
              <Button type="submit" disabled={isSubmitting} className="text-white px-5">
                {isSubmitting ? "Saving..." : isEdit ? "Update Plan" : "Create Plan"}
              </Button>
            </Field>
          </form>
        </FormSection>
      </div>
    </div>
  );
};

export default MembershipForm;