"use client"

import { ContactFormData, contactSchema } from "@/schemas/contact"
import { motion } from "framer-motion"
import React, { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // handle Submit

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData)

    /*safeParse is a Zod method used to validate data without 
    throwing an error. It returns a result object that tells you 
    whether validation passed or failed.*/

    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {}

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})

    /* ---------------------------------
    TODO: Add API call in future
    Example:
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData)
    })
 -----------------------------------*/

    console.log("Form Submitted", formData)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 grid gap-12">

      {/* Left Side Text */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Get In <span className="text-(--color-accent)">Touch</span>
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Have questions or need help? Fill out the form and our team will
          contact you shortly. We are here to assist you with anything you need.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="space-y-4 bg-white shadow-lg rounded-xl p-8"
      >

        {/* Name */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Your Name"
          className="w-full border p-3 rounded-md outline-none focus:border-orange-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}

        {/* Email */}
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email Address"
          className="w-full border p-3 rounded-md outline-none focus:border-orange-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        {/* Phone */}
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          placeholder="+91 Phone Number"
          className="w-full border p-3 rounded-md outline-none focus:border-orange-500"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}

        {/* Message */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Message"
          className="w-full border p-3 rounded-md outline-none focus:border-orange-500"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}

        <button className="button px-6 py-3 rounded-md">
          Send Message
        </button>

      </motion.form>
    </div>
  )
}