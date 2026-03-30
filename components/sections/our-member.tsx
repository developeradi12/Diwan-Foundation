"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import api from "@/lib/axios"

interface Member {
  _id: string
  name: string
  designation: string
  image: string
}

export default function OurMembers() {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/admin/our-member")
        setMembers(res.data.members || [])
      } catch (err) {
        console.error("Error fetching members ", err)
      }
    }

    fetchMembers()
  }, [])

  return (
    <div className="py-14 text-center bg-(--color-surface-alt)">
      <h2 className="text-3xl md:text-4xl font-bold text-(--color-text) mb-5">
        Our Members
      </h2>

      <div className="container mx-auto grid md:grid-cols-3 gap-10">

        {members.map((member) => (
          <div
            key={member._id}
            className="flex flex-col items-center border-gray-200 border py-16 rounded-lg bg-white"
          >
            {/* Image */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Name */}
            <h3 className="mt-4 text-xl font-semibold">
              {member.name}
            </h3>

            {/* Designation */}
            <p className="text-gray-500">
              {member.designation}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}