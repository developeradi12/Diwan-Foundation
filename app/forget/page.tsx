"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Navbar from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import api from "@/lib/axios"

const formSchema = z.object({
  email: z.string().email("Valid email required"),
})

export default function ForgetPasswordPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await api.post("/auth/forgot-password", {
        email: data.email,
      })

      toast.success(res.data.message || "Reset link sent to email", {
        position: "top-center",
      })

      // optional redirect
      // router.push("/login")

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: "top-center",
      })
    }
  }

  return (
    <div className="h-screen">
      <Navbar />

      <div className="flex justify-center items-center py-16 bg-[linear-gradient(rgba(255,255,255,0.93),rgba(255,255,255,0.93)),url('/images/login.png')] bg-cover">
        
        <Card className="w-full sm:max-w-md border-gray-200 bg-white">
          
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Forgot Password
            </CardTitle>
            <CardDescription className="font-medium">
              Enter your email to receive reset link
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              
              <FieldGroup className="gap-5">

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

              </FieldGroup>

              <Button
                type="submit"
                className="mt-5 w-full rounded-full text-white text-md py-3 px-5 bg-[#E2AD56] hover:bg-[#0B402E]"
              >
                Send Reset Link
              </Button>

            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-start">
            
            <Link
              href="/login"
              className="flex gap-2 text-sm border border-gray-200 rounded-md py-2 px-4 mt-2"
            >
              <ArrowLeft className="w-5" />
              Back to Login
            </Link>

          </CardFooter>

        </Card>
      </div>

      <Footer />
    </div>
  )
}