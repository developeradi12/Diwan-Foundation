"use client";

import { FormSection } from "@/app/(admin)/_components/formSection";
import { ChessQueen, Minus, Plus } from "lucide-react";
import {
  MembershipFormValues,
  membershipSchema,
} from "@/schemas/membershipSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

const EditMembershipForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const form = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      membershipType: "",
      membershipDuration: 0,
      membershipFee: 0,
      features: [],
    },
  });

  const features = form.watch("features") || [];

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const res = await api.get(`/admin/membership/${id}`);
        const data = res.data.data;

        form.reset({
          membershipType: data.membershipType,
          membershipDuration: data.membershipDuration,
          membershipFee: data.membershipFee,
          features: data.features?.length ? data.features : [""],
        });
      } catch (e) {
        toast.error("Failed to load membership");
      }
    };

    if (id) fetchMembership();
  }, [id]);

  return (
    <div className="p-5">
      <div className="container mx-auto  space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}
            >
              Add New Membership
            </p>
            <p className="text-sm mt-0.5 text-gray-400">
              Fill in the details to add membership for member
            </p>
          </div>
          <div
            className="text-xs font-medium px-3 py-1.5 rounded-full"
            style={{
              background: "color-mix(in oklch, var(--color-accent) 20%, white)",
              color: "var(--color-primary)",
            }}
          >
            New Member
          </div>
        </div>

        <div>
          <FormSection
            title="Membership/Subscription Details"
            icon={ChessQueen}
          >
            <div className="">
              <form
                id="form-rhf-demo"
              >
                <FieldGroup className="grid grid-cols-3 gap-4">
                  <Controller
                    name="membershipType"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Membership Type
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Example : Gold, Silver, Premium"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-700"
                          />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="membershipDuration"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Membership Duration (in month)
                        </FieldLabel>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          value={field.value ?? ""}
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Like: 1,3,5"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-700"
                          />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="membershipFee"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Membership Amount in ₹
                        </FieldLabel>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          value={field.value ?? ""}
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Like: ₹200"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-700"
                          />
                        )}
                      </Field>
                    )}
                  />

                  {features.map((feature, index) => (
                    <Controller
                      key={index}
                      name={`features.${index}`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel htmlFor="form-rhf-demo-title">
                            Feature
                          </FieldLabel>
                          <div
                            style={{ marginBottom: 10 }}
                            className="flex gap-2"
                          >
                            <Input
                              {...field}
                              placeholder={`Feature ${index + 1}`}
                              aria-invalid={fieldState.invalid}
                              onChange={(e) => field.onChange(e.target.value)}
                            />

                            <Button
                              type="button"
                              onClick={() => {
                                const updated = features.filter(
                                  (_, i) => i !== index,
                                );
                                form.setValue("features", updated);
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <Minus />
                            </Button>
                          </div>
                          {fieldState.invalid && (
                            <FieldError
                              errors={[fieldState.error]}
                              className="text-red-700"
                            />
                          )}
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
                  <Button
                    type="submit"
                    form="form-rhf-demo"
                    className="text-white px-5"
                  >
                    Submit
                  </Button>
                </Field>
              </form>
            </div>
          </FormSection>
        </div>
      </div>
    </div>
  );
};

export default EditMembershipForm;
