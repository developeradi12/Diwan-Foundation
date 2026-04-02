"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, User, MapPin, Phone, Briefcase, CreditCard, Instagram, Linkedin, Twitter, Facebook, X } from "lucide-react";
import { FormSection } from "@/app/(admin)/_components/formSection";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { MemberFormValues } from "@/schemas/UserSchema";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface Plan {
  _id: string;
  membershipType: string;
}

type Props = {
  form: UseFormReturn<MemberFormValues>;
  onSubmit: (data: MemberFormValues, removeImage: boolean) => void;
  isSubmitting: boolean;
  plans: Plan[];
  mode: "create" | "edit";
  existingImage?: string; // "/uploads/abc.jpg" from server
};

export default function MemberForm({ form, onSubmit, isSubmitting, plans, mode, existingImage }: Props) {
  const [removeImage, setRemoveImage] = useState(false);
  const [preview, setPreview] = useState<string | null>(existingImage ?? null);
  // console.log("existingimage", existingImage);

  useEffect(() => {
    setPreview(existingImage ?? null);
    setRemoveImage(false);
  }, [existingImage]);

  const inputClass = "h-10 border border-gray-200 focus:border-[var(--color-primary)] focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] rounded-xl text-sm";
  const selectTriggerClass = "h-10 w-full rounded-xl border border-gray-200 px-3 text-sm";
  const selectContentClass = "rounded-xl border border-gray-100 bg-white shadow-lg mt-12";
  const selectItemClass = "rounded-lg text-sm cursor-pointer px-3 py-2";
  const labelClass = "text-xs font-semibold uppercase tracking-wide mb-1.5";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          // console.log("FORM DATA:", data);
          // console.log("REMOVE IMAGE:", removeImage);

          onSubmit(data, removeImage);
        })}
        className="space-y-6"
      >

        <div>
          <p className="text-2xl font-bold text-[var(--color-primary)]">
            {mode === "edit" ? "Edit Member" : "Add New Member"}
          </p>
        </div>

        {/* ── Personal Details ── */}
        <FormSection title="Personal Details" icon={User}>
          <div className="grid md:grid-cols-3 gap-5">

            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Full Name</FormLabel>
                <FormControl><Input className={inputClass} placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Email</FormLabel>
                <FormControl><Input className={inputClass} placeholder="john@email.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Phone</FormLabel>
                <FormControl><Input className={inputClass} placeholder="+91 9000000000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={selectContentClass}>
                    <SelectItem className={selectItemClass} value="Male">Male</SelectItem>
                    <SelectItem className={selectItemClass} value="Female">Female</SelectItem>
                    <SelectItem className={selectItemClass} value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="dob" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Date of Birth</FormLabel>
                <FormControl><Input className={inputClass} type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* ── Image Field ── */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                    Profile Photo
                  </FormLabel>

                  {/* Preview — shows existingImage path OR new file blob URL */}
                  {preview && (
                    <div className="relative w-32 h-32 mb-3">
                      <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setRemoveImage(true);
                          field.onChange(undefined); // clear form file value
                        }}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  <FormControl>
                    <Input
                      className={inputClass}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        if (file.size > 5 * 1024 * 1024) {
                          toast.error("Image must be less than 5MB.");
                          e.target.value = "";
                          return;
                        }

                        field.onChange(file);
                        setPreview(URL.createObjectURL(file)); // new file preview
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-3">
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Address</FormLabel>
                  <FormControl>
                    <Textarea className={`${inputClass} resize-none`} placeholder="Street address..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

          </div>
        </FormSection>

        {/* ── Location ── */}
        <FormSection title="Location" icon={MapPin}>
          <div className="grid md:grid-cols-2 gap-5">

            <FormField control={form.control} name="country" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Country</FormLabel>
                <FormControl><Input className={inputClass} placeholder="India" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="state" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>State</FormLabel>
                <FormControl><Input className={inputClass} placeholder="Gujarat" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>City</FormLabel>
                <FormControl><Input className={inputClass} placeholder="Ahmedabad" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="pincode" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Pincode</FormLabel>
                <FormControl><Input className={inputClass} placeholder="380001" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

          </div>
        </FormSection>

        {/* ── Contact & Social ── */}
        <FormSection title="Contact & Social" icon={Phone}>
          <div className="grid md:grid-cols-2 gap-5">

            <FormField control={form.control} name="alternateMobile" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Alternate Mobile</FormLabel>
                <FormControl><Input className={inputClass} placeholder="+91 9000000000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="whatsapp" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>WhatsApp</FormLabel>
                <FormControl><Input className={inputClass} placeholder="+91 9000000000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="aadhaar" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Aadhaar Number</FormLabel>
                <FormControl><Input className={inputClass} placeholder="XXXX XXXX XXXX" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="instagram" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                  <span className="flex items-center gap-1.5"><Instagram size={12} /> Instagram</span>
                </FormLabel>
                <FormControl><Input className={inputClass} placeholder="@username" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="facebook" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                  <span className="flex items-center gap-1.5"><Facebook size={12} /> Facebook</span>
                </FormLabel>
                <FormControl><Input className={inputClass} placeholder="facebook.com/username" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="twitter" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                  <span className="flex items-center gap-1.5"><Twitter size={12} /> X (Twitter)</span>
                </FormLabel>
                <FormControl><Input className={inputClass} placeholder="@handle" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="linkedin" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>
                  <span className="flex items-center gap-1.5"><Linkedin size={12} /> LinkedIn</span>
                </FormLabel>
                <FormControl><Input className={inputClass} placeholder="linkedin.com/in/username" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

          </div>
        </FormSection>

        {/* ── Professional Details ── */}
        <FormSection title="Professional Details" icon={Briefcase}>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField control={form.control} name="professionalType" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Professional Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent sideOffset={4} className={selectContentClass}>
                    <SelectItem className={selectItemClass} value="Occupation">Occupation</SelectItem>
                    <SelectItem className={selectItemClass} value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </FormSection>

        {/* ── Membership Plan ── */}
        <FormSection title="Membership Plan" icon={CreditCard}>
          <div className="grid md:grid-cols-2 gap-5">

            <FormField control={form.control} name="membershipPlan" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Plan</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent sideOffset={4} className={selectContentClass}>
                    {plans.map((plan) => (
                      <SelectItem key={plan._id} value={plan._id} className={selectItemClass}>
                        {plan.membershipType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="membershipStartDate" render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass} style={{ color: "var(--color-primary)" }}>Start Date</FormLabel>
                <FormControl><Input className={inputClass} type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

          </div>
        </FormSection>

        {/* ── Submit ── */}
        <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl cursor-pointer text-white">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              {mode === "edit" ? "Updating..." : "Creating..."}
            </span>
          ) : mode === "edit" ? "Update Member" : "Create Member"}
        </Button>

      </form>
    </Form>
  );
}