"use client";

import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Loader2, Mail, Phone } from "lucide-react";

interface CreateUserFormData {
  fullName: string;
  email: string;
  role: "admin" | "donor" | "";
  phone:string,
  amount?: number;
}

const CreateUserForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<CreateUserFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      phone:"",
      amount: undefined,
    },
  });

  const selectedRole = form.watch("role");

  //  clear amount if role changes
  useEffect(() => {
    if (selectedRole !== "donor") {
      form.setValue("amount", undefined);
    }
  }, [selectedRole, form]);

  async function onSubmit(data: CreateUserFormData) {
    setLoading(true);

    try {
      await api.post("admin/users", {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        phone:data.phone,
        amount: data.role === "donor" ? data.amount : undefined,
      });

      toast.success("User created successfully");
      router.push("/admin/users");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error creating user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Create User
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add a new admin or donor account
          </p>
        </div>

        <div className="text-xs px-3 py-1 rounded-full bg-blue-50  font-medium">
          New
        </div>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">

        <form
          onSubmit={form.handleSubmit(
            (data) => {
              console.log("FORM DATA:", data);
              onSubmit(data);
            },
            (errors) => {
              console.log("FORM ERRORS:", errors);
            }
          )} className="space-y-6">

          {/* Section Title */}
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            <p className="font-medium text-gray-800">Personal Information</p>
          </div>

          {/* Fields */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Full Name */}
            <Controller
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      {...field}
                      className="pl-9 h-11 rounded-xl border-gray-200 "
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
            />
            {/*phone */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">
                    phone
                  </label>

                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      {...field}
                      className="pl-9 h-11 rounded-xl border-gray-200 "
                      placeholder="+91"
                    />
                  </div>
                </div>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      {...field}
                      className="pl-9 h-11 rounded-xl border-gray-200 "
                      placeholder="john@email.com"
                    />
                  </div>
                </div>
              )}
            />

            {/* Role */}
            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">
                    Role
                  </label>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>

                    <SelectContent className="mt-10 bg-white " >
                      <SelectItem value="donor">Donor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* 💰 Amount (highlighted UI) */}
            {selectedRole === "donor" && (
              <Controller
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs font-medium text-gray-600">
                      Donation Amount
                    </label>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        ₹
                      </span>

                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value))
                        }
                        className="pl-8 h-11 rounded-xl border-blue-200 bg-blue-50/30"
                        placeholder="Enter donation amount"
                      />
                    </div>

                    <p className="text-xs text-gray-400">
                      Required for donor accounts
                    </p>
                  </div>
                )}
              />
            )}

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="h-10 px-4 rounded-lg"
            >
              Reset
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-10 px-6 rounded-lg button"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create User"
              )}
            </Button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateUserForm;