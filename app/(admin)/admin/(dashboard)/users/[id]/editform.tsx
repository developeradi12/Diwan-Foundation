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

interface EditUserFormData {
    _id: string
    fullName: string;
    email: string;
    role: "admin" | "donor" | "";
    phone: string;
    amount?: string;
}

interface Props {
    initialData: EditUserFormData; //  edit data
}

const EditUserForm = ({ initialData }: Props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<EditUserFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            role: initialData.role,
            phone: "",
            amount: initialData.amount,
        },
    });

    const selectedRole = form.watch("role");

    //  PREFILL DATA
    useEffect(() => {
        if (initialData) {
            form.reset({
                fullName: initialData.fullName || "",
                email: initialData.email || "",
                role: initialData.role || "",
                phone: initialData.phone || "",
                amount: initialData.amount,
            });
        }
    }, [initialData, form]);

    // clear amount if role changes
    useEffect(() => {
        if (selectedRole !== "donor") {
            form.setValue("amount", undefined);
        }
    }, [selectedRole, form]);

    async function onSubmit(data: EditUserFormData) {
        setLoading(true);

        try {
            await api.put(`/admin/users/${initialData._id}`, {
                fullName: data.fullName,
                email: data.email,
                role: data.role,
                phone: data.phone,
                amount: data.role === "donor" ? data.amount : undefined,
            });

            toast.success("User updated successfully");
            router.push("/admin/users");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error updating user");
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
                        Edit User
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Update user details
                    </p>
                </div>

                <div className="text-xs px-3 py-1 rounded-full bg-yellow-50 font-medium">
                    Edit
                </div>
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    {/* SAME UI BELOW — unchanged */}

                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-600" />
                        <p className="font-medium text-gray-800">Personal Information</p>
                    </div>

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
                                        <Input {...field} className="pl-9 h-11 rounded-xl border-gray-200" />
                                    </div>
                                </div>
                            )}
                        />

                        {/* Phone */}
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field }) => (
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">
                                        Phone
                                    </label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <Input {...field} className="pl-9 h-11 rounded-xl border-gray-200" />
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
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            {...field}
                                            disabled
                                            className="pl-9 h-11 rounded-xl border-gray-200" />
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
                                        <SelectTrigger className="h-11 rounded-xl border-gray-200">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent className="mt-10 bg-white">
                                            <SelectItem value="donor">Donor</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        />

                        {/* Amount */}
                        {selectedRole === "donor" && (
                            <Controller
                                name="amount"
                                control={form.control}
                                render={({ field }) => (
                                    <div className="space-y-1 col-span-2">
                                        <label className="text-xs font-medium text-gray-600">
                                            Donation Amount
                                        </label>
                                        <Input
                                            type="number"
                                            value={field.value ?? ""}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className="h-11 rounded-xl border-blue-200 bg-blue-50/30"
                                        />
                                    </div>
                                )}
                            />
                        )}

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update User"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditUserForm;