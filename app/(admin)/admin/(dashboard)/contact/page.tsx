"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import Header from "@/app/(admin)/_components/header"

type Contact = {
  _id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contact")
      setContacts(res.data.data)
    } catch (error) {
      console.error("Error fetching contacts", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Contact"
      />

      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          Contact Messages
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : contacts.length === 0 ? (
          <p>No messages found</p>
        ) : (
          //  Responsive wrapper
          <div className="border border-gray-400 rounded-lg overflow-hidden">
            
            {/*  Horizontal scroll for mobile */}
            <div className="w-full overflow-x-auto">
              <Table className="min-w-[700px]">
                
                <TableHeader>
                  <TableRow className="border-b border-gray-400">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Phone
                    </TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow
                      key={contact._id}
                      className="border-b border-gray-400 last:border-0"
                    >
                      <TableCell className="font-medium">
                        {contact.name}
                      </TableCell>

                      <TableCell className="text-sm break-all">
                        {contact.email}
                      </TableCell>

                      {/*  Hide on small screens */}
                      <TableCell className="hidden md:table-cell">
                        {contact.phone}
                      </TableCell>

                      <TableCell className="max-w-[200px] md:max-w-[300px] truncate">
                        {contact.message}
                      </TableCell>

                      <TableCell className="text-sm whitespace-nowrap">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}