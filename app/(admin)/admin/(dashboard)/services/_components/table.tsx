"use client";

import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import api from "@/lib/axios";
import { useState } from "react";
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal";
import { toast } from "sonner";

export default function ServiceTable({ services, loading, refetch }: any) {
  const router = useRouter();
  const columnHelper = createColumnHelper<any>();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  }

  //  Delete Handler
  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      setDeleting(true);
      await api.delete(`/admin/services/${selectedId}`);
      toast.success("Delete Successfully")
      // refresh
      refetch?.();
      
      setOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    // columnHelper.accessor("category", {
    //   header: "Category",
    //   cell: (info) => info.getValue() || "-",
    // }),
    columnHelper.accessor("isActive", {
      header: "Status",
      cell: (info) => (info.getValue() ? "Active" : "Inactive"),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const service = info.row.original;

        return (
          <div className="flex items-center gap-3">
            {/*  Edit */}
            <button
              onClick={() =>
                router.push(`/admin/services/${service._id}`)
              }
              className="text-blue-600 cursor-pointer hover:scale-110 transition"
            >
              <Pencil size={18} />
            </button>

            {/* 🗑 Delete */}
            <button
              onClick={() => openDeleteModal(service._id)}
              className="text-red-600 cursor-pointer hover:scale-110 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: services || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <p className="p-4">Loading...</p>;

  return (
      <>
      <div className="border-gray-300 border rounded-lg overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 text-left font-medium">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No services found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-300 hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/*  Delete Modal */}
      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleConfirmDelete}
        loading={deleting}
        title="Delete Service?"
        description="This service will be permanently deleted."
      />
    </>
  );
}