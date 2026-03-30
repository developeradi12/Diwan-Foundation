"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Member } from "@/schemas/UserSchema"
import { columns } from "./columns"
import React from "react"
import api from "@/lib/axios"
import { toast } from "sonner"
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal"

type Props = { data: Member[] }

export function MembersTable({ data }: Props) {
  const [tableData, setTableData] = React.useState<Member[]>(data);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  //  open modal
  const openDeleteDialog = (member: Member) => {
    setSelectedMember(member);
    setDeleteDialogOpen(true);
  };

  //  actual delete (modal confirm pe chalega)
  const handleDelete = async () => {
    if (!selectedMember) return;

    try {
      setIsDeleting(true);

      await api.delete(`admin/member/${selectedMember._id}`);

      setTableData((prev) =>
        prev.filter((m) => m._id !== selectedMember._id)
      );

      toast.success("Member deleted");

      setDeleteDialogOpen(false);
      setSelectedMember(null);

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };


  const table = useReactTable({
    data: tableData,
    columns: columns(openDeleteDialog),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        loading={isDeleting}
        title="Delete Member?"
        description={`Are you sure you want to delete ${selectedMember?.fullName ?? "this member"}?`}
      />
      <div className="rounded-xl overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-100"
                style={{ background: "color-mix(in oklch, var(--color-primary) 4%, white)" }}
              >
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-semibold uppercase tracking-wide py-3"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-50 transition-colors duration-150 hover:bg-gray-50/80"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-16">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "color-mix(in oklch, var(--color-primary) 8%, white)" }}
                    >
                      <span className="text-2xl">👥</span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                      No members found
                    </p>
                    <p className="text-xs text-gray-400">Add your first member to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}