"use client"

import {
  GraduationCap,
  HeartPulse,
  Briefcase,
  Users,
  AlertTriangle,
  Sprout,
  BookOpen,
  Droplet
} from "lucide-react"

const items = [
  {
    title: "Education",
    desc: "Providing quality learning opportunities for underprivileged communities.",
    icon: GraduationCap
  },
  {
    title: "Healthcare",
    desc: "Delivering essential healthcare support to vulnerable families.",
    icon: HeartPulse
  },
  {
    title: "Livelihoods",
    desc: "Helping families build sustainable income opportunities.",
    icon: Briefcase
  },
  {
    title: "Women Empowerment",
    desc: "Supporting women with skills and leadership opportunities.",
    icon: Users
  },
  {
    title: "Disaster Response",
    desc: "Providing rapid relief and recovery support during disasters.",
    icon: AlertTriangle
  },
  {
    title: "Empowering Grassroots",
    desc: "Strengthening local communities through grassroots initiatives.",
    icon: Sprout
  },
  {
    title: "Child Education",
    desc: "Ensuring every child gets access to education.",
    icon: BookOpen
  },
  {
    title: "Blood Donation",
    desc: "Organizing blood donation drives to save lives.",
    icon: Droplet
  }
]

export default function WhatWeDo() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center mb-14">
          <p className="text-(--color-accent) font-semibold uppercase tracking-wider">
            What We Do
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-(--color-text) mt-3">
            Our Key Areas of Impact
          </h2>

          <p className="text-(--color-text-muted) max-w-2xl mx-auto mt-4">
            We focus on empowering communities through education, healthcare,
            disaster response, and sustainable development initiatives.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {items.map((item, i) => {
            const Icon = item.icon

            return (
              <div
                key={i}
                className="bg-(--color-surface-alt) p-6 rounded-xl text-center hover:shadow-lg transition"
              >

                <div className="flex justify-center mb-4 text-(--color-accent)">
                  <Icon size={36} />
                </div>

                <h3 className="font-semibold text-lg text-(--color-text)">
                  {item.title}
                </h3>

                <p className="text-(--color-text-muted) text-sm mt-2">
                  {item.desc}
                </p>

              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}