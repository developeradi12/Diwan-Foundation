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
import { Eye, Trash2 } from "lucide-react"
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal"

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

  // delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // view modal state
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

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

  // DELETE FUNCTION
  const handleDelete = async () => {
    if (!selectedId) return

    try {
      setDeleteLoading(true)
      await api.delete(`/contact/${selectedId}`)

      setContacts((prev) => prev.filter((c) => c._id !== selectedId))
      setDeleteOpen(false)
    } catch (err) {
      console.error("Delete failed", err)
    } finally {
      setDeleteLoading(false)
    }
  }

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
          <div className="border border-gray-400 rounded-lg overflow-hidden">
            <div className="w-full overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow className="border-b border-gray-400">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Phone
                    </TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
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

                      <TableCell className="hidden md:table-cell">
                        {contact.phone}
                      </TableCell>

                      <TableCell className="max-w-[200px] truncate">
                        {contact.message}
                      </TableCell>

                      <TableCell className="text-sm whitespace-nowrap">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell>
                        <div className="flex items-center gap-3">

                          {/* VIEW */}
                          <button
                            onClick={() => {
                              setSelectedContact(contact)
                              setViewOpen(true)
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye size={18} />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => {
                              setSelectedId(contact._id)
                              setDeleteOpen(true)
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* DELETE MODAL */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete Contact?"
        description="This message will be permanently deleted."
      />

      {/* VIEW MODAL */}
      {viewOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg">

            <h2 className="text-xl font-bold mb-4">Contact Details</h2>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedContact.name}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>Phone:</strong> {selectedContact.phone}</p>
              <p><strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
              <p><strong>Message:</strong></p>
              <p className="border p-2 rounded bg-gray-50">
                {selectedContact.message}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setViewOpen(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}