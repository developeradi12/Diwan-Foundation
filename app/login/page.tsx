"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
const formSchema = z.object({
  email: z.string().min(1, "Email Id required!"),
  password: z.string().min(4, "password must be 4 character long"),
});

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await api.post("/admin/login", {
        email: data.email,
        password: data.password,
      })

      toast.success(res.data.message || "Login successful", {
        position: "top-center",
      })

      const role = res.data.user.role   // ← existingUser → user

      if (role === "donor") { router.replace("/donor/dashboard"); return }
      if (role === "member") { router.replace("/member"); return }
      if (role === "admin") { router.replace("/admin/dashboard"); return }

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed", {
        position: "top-center",
      })
    }
  }
  return (
    <div className="h-screen" >
      <Navbar />
      <div className="flex justify-center items-center py-16 bg-[linear-gradient(rgba(255,255,255,0.93),rgba(255,255,255,0.93)),url('/images/login.png')] bg-cover">
        <Card className="w-full sm:max-w-md border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription className="font-medium">
              Login to continue to dashboard!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="login-form-submit" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-5">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email Id."
                        autoComplete="On"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          id="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your password."
                          autoComplete="on"
                          className="pr-10"
                        />

                        {/* Eye Icon */}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500"
                        > {showPassword ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                        </button>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* 👇 ADD HERE */}
                <div className="w-full flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/forget")}
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-start">
            <Field orientation="horizontal">
              <Button
                type="submit"
                form="login-form-submit"
                className="rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E] cursor-pointer w-full"
              >
                Login
              </Button>
            </Field>
            <Link href="/" className="flex gap-2 text-sm border border-gray-200 rounded-md py-2 px-4 mt-4">
              <ArrowLeft className="w-5" />
              Back to home
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Footer />
    </div >
  );
};

export default AdminLogin;
