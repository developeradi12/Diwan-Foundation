"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  Heart,
  Eye,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DonationDTO } from "@/types/donation";
import api from "@/lib/axios";
import { toast } from "sonner";
import Image from "next/image";



// ─────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────

const donorColumns = (
  onView: (donor: DonationDTO) => void,
  onDelete: (donor: DonationDTO) => void,
  onPreview: (url: string) => void
): ColumnDef<DonationDTO>[] => [
    {
      accessorKey: "user.Name",
      id: "userName",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-primary)" }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Donor <ArrowUpDown size={12} />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background:
                "color-mix(in oklch, var(--color-accent) 25%, white)",
              color: "var(--color-primary)",
            }}
          >
            {row.original.user?.Name?.charAt(0)?.toUpperCase() ?? "?"}
          </div>

          <div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              {row.original.user?.Name ?? "Anonymous"}
            </p>
            <p className="text-xs text-gray-400">
              {row.original.user?.email ?? ""}
            </p>
          </div>
        </div>
      ),
    },

    {
      id: "phone",
      header: () => (
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-primary)" }}
        >
          Phone
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-gray-500 font-mono">
          {row.original.user?.phone ?? "—"}
        </span>
      ),
    },

    {
      accessorKey: "amount",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-primary)" }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount <ArrowUpDown size={12} />
        </button>
      ),
      cell: ({ row }) => (
        <span
          className="text-sm font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          ₹{row.original.amount.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      accessorKey: "screenshot",
      header: () => (
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-primary)" }}
        >
          ScreenShot
        </span>
      ),
      cell: ({ row }) => {
        const screenshotUrl = row.original.screenshot;

        if (!screenshotUrl) {
          return <span className="text-gray-400 text-xs">—</span>;
        } return (
          <button
            onClick={() => onPreview(screenshotUrl)}
            className="p-2 rounded-lg border hover:scale-105 transition cursor-pointer"
            style={{
              borderColor:
                "color-mix(in oklch, var(--color-primary) 20%, white)",
              color: "var(--color-primary)",
            }}
          >
            <Eye size={14} />
          </button>
        );
      },
    },
    {
      id: "date",
      header: () => (
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-primary)" }}
        >
          Date
        </span>
      ),
      cell: ({ row }) => {
        const date = row.original.paidAt ?? row.original.createdAt;

        return (
          <span className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        );
      },
    },

    // ACTIONS BACK
    {
      id: "actions",
      header: () => (
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-primary)" }}
        >
          Actions
        </span>
      ),
      cell: ({ row }) => (
        <div className="flex gap-2">
          {/* <button
            onClick={() => onView(row.original)}
            className="p-2 rounded-lg border hover:scale-105 cursor-pointer transition"
            style={{
              borderColor:
                "color-mix(in oklch, var(--color-primary) 20%, white)",
              color: "var(--color-primary)",
            }}
          >
            <Eye size={14} />
          </button> */}

          <button
            onClick={() => onDelete(row.original)}
            className="p-2 rounded-lg border hover:scale-105 cursor-pointer transition"
            style={{
              borderColor:
                "color-mix(in oklch, var(--color-danger) 30%, white)",
              color: "var(--color-danger)",
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const DonorTable = ({ data }: { data: DonationDTO[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [tableData, setTableData] = React.useState<DonationDTO[]>(data);

  const handleView = (donor: DonationDTO) => {
    console.log("VIEW", donor);
    //  yaha modal / details open kar sakta hai
  };

  const handleDelete = async (donor: DonationDTO) => {
    try {
      await api.delete(`/donations/${donor._id}`);

      // UI instantly update
      setTableData((prev) =>
        prev.filter((d) => d._id !== donor._id)
      );

      toast.success("Donation deleted successfully");

    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Delete failed"
      );
    }
  };

  const table = useReactTable({
    data: tableData,
    columns: donorColumns(handleView, handleDelete, setPreviewImage),
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        {/*  Search */}
        <Input
          placeholder="Search donor..."
          value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("userName")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        {/* Status Filter */}
        {/* <select
          value={(table.getColumn("paymentStatus")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("paymentStatus")?.setFilterValue(e.target.value || undefined)
          }
          className="border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
        >
          <option value="">All</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select> */}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-gray-200/60 backdrop-blur-sm">
        <Table className="border-separate border-spacing-0 ">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                style={{
                  background:
                    "color-mix(in oklch, var(--color-primary) 4%, white)",
                }}
              >
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50/80 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16">
                  <div className="flex flex-col items-center gap-2">
                    <Heart />
                    <p>No donations found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      {
        previewImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPreviewImage(null)}
          >
            {/* Container */}
            <div
              className="relative w-full max-w-4xl h-[70vh] sm:h-[80vh] bg-transparent"
              onClick={(e) => e.stopPropagation()} // prevent close on image click
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-10 right-0 text-white cursor-pointer text-sm bg-black/60 px-3 py-1 rounded-md hover:bg-black/80"
              >
                ✕ Close
              </button>

              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={previewImage}
                  alt="Screenshot"
                  fill
                  className="object-contain rounded-xl shadow-2xl"
                  sizes="(max-width: 640px) 100vw, 800px"
                />
              </div>
            </div>
          </div>
        )
      }
    </div >


  );
};

