"use client";

import * as React from "react";
import {
  flexRender, getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel, useReactTable,
  type ColumnDef, type ColumnFiltersState,
  type SortingState, type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, SquarePen, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { Account } from "@/schemas/UserSchema";
import DeleteConfirmDialog from "@/app/(admin)/_components/deleteModal";
import api from "@/lib/axios";

interface UserTableProps {
  data: Account[]
}

/* ================= COLUMNS ================= */
const getColumns = (onDelete: (id: string) => void): ColumnDef<Account>[] => [

  // ── Name ──
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-primary)" }}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown size={12} />
      </button>
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.fullName}
              width={32} height={32}
              className="rounded-lg object-cover"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                background: "color-mix(in oklch, var(--color-primary) 10%, white)",
                color: "var(--color-primary)",
              }}
            >
              {user.fullName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
          <span
            className="text-sm font-medium truncate"
            style={{ color: "var(--color-primary)" }}
          >
            {user.fullName}
          </span>
        </div>
      );
    },
  },

  // ── Email ──
  {
    accessorKey: "email",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-primary)" }}>
        Email
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-gray-500">{row.original.email || "—"}</span>
    ),
  },

  // ── Phone ──
  {
    accessorKey: "phone",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-primary)" }}>
        Phone
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-gray-500 font-mono">
        {row.original.phone || "—"}
      </span>
    ),
  },

  // ── Role ──
  {
    accessorKey: "role",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-primary)" }}>
        Role
      </span>
    ),
    cell: ({ row }) => {
      const role = row.original.role;
      const styles: Record<string, { bg: string; color: string }> = {
        admin: {
          bg: "color-mix(in oklch, var(--color-danger) 10%, white)",
          color: "var(--color-danger)"
        },
        member: {
          bg: "color-mix(in oklch, var(--color-success) 12%, white)",
          color: "var(--color-success)"
        },
        user: {
          bg: "color-mix(in oklch, var(--color-primary) 8%, white)",
          color: "var(--color-primary)"
        },
      };
      const s = styles[role?.toLowerCase()] || styles.user;
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
          style={{ background: s.bg, color: s.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full"
            style={{ background: s.color }} />
          {role}
        </span>
      );
    },
  },

  // ── Membership Plan ──
  {
    accessorKey: "membershipPlan",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-primary)" }}>
        Plan
      </span>
    ),
    cell: ({ row }) => {
      const user = row.original;
      if (user.role === "member" && user.membershipPlan) {
        return (
          <span
            className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              background: "color-mix(in oklch, var(--color-accent) 20%, white)",
              color: "var(--color-primary)",
            }}
          >
            {user.membershipPlan?.membershipType}
          </span>
        );
      }
      return <span className="text-gray-400 text-sm">—</span>;
    },
  },

  // ── Joined ──
  {
    accessorKey: "createdAt",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-primary)" }}>
        Joined
      </span>
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt
        ? new Date(row.original.createdAt)
        : null;

      return (
        <span className="text-sm text-gray-500">
          {date
            ? date.toLocaleDateString("en-IN", {
              day: "2-digit", month: "short", year: "numeric"
            })
            : "—"}
        </span>
      );
    },
  },

  // ── Actions ──
  {
    id: "actions",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-primary)" }}>
        Actions
      </span>
    ),
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original._id;
      const role = row.original.role;
      return (
        <div className="flex gap-2">
          <Link href={
            role === "member"
              ? `/admin/members/edit/${id}`
              : `/admin/users/${id}`
          }>
            <button
              className="p-2 rounded-lg cursor-pointer border transition-all duration-150 hover:scale-105"
              style={{
                borderColor: "color-mix(in oklch, var(--color-primary) 20%, white)",
                color: "var(--color-primary)",
              }}
            >
              <SquarePen size={14} />
            </button>
          </Link>
          <button
            onClick={() => onDelete(id)}
            className="p-2 rounded-lg cursor-pointer border transition-all duration-150 hover:scale-105"
            style={{
              borderColor: "color-mix(in oklch, var(--color-danger) 30%, white)",
              color: "var(--color-danger)",
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      );
    },
  },
];

/* ================= MAIN ================= */
export function UserTable({ data }: UserTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [tableData, setTableData] = React.useState<Account[]>([]);

  React.useEffect(() => {
    if (Array.isArray(data)) {
      setTableData(data);
    }
  }, [data]);

  const handleDeleteClick = React.useCallback((id: string) => {
    setSelectedUserId(id);
    setDeleteOpen(true);
  }, []);

  const columns = React.useMemo(
    () => getColumns(handleDeleteClick),
    [handleDeleteClick]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: { pagination: { pageSize: 10 } },
  });

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      setLoading(true);

      await api.delete(`/admin/users/${selectedUserId}`);

      setTableData(prev =>
        prev.filter(user => user._id !== selectedUserId)
      );

      setDeleteOpen(false);
      setSelectedUserId(null);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">

      <div className="flex items-center gap-3">
        <Input
          placeholder="Search user..."
          value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("fullName")?.setFilterValue(e.target.value)}
          className="max-w-xs h-9 text-sm border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
        />
      </div>

      <div className="rounded-xl overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-100"
                style={{ background: "color-mix(in oklch, var(--color-primary) 4%, white)" }}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-3">
                    {header.isPlaceholder ? null :
                      flexRender(header.column.columnDef.header, header.getContext())}
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
                  className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
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
                      <Users size={20} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <p className="text-sm font-medium"
                      style={{ color: "var(--color-primary)" }}>
                      No users found
                    </p>
                    <p className="text-xs text-gray-400">
                      Try adjusting your search
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {table.getFilteredRowModel().rows.length} users total
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline" size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 rounded-lg border-gray-200 text-xs"
            style={{ color: "var(--color-primary)" }}
          >
            Previous
          </Button>
          <Button
            variant="outline" size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 rounded-lg border-gray-200 text-xs"
            style={{ color: "var(--color-primary)" }}
          >
            Next
          </Button>
        </div>
      </div>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleConfirmDelete}
        loading={loading}
        title="Delete User?"
        description="This user will be permanently deleted. This action cannot be undone."
      />
    </div>
  );
}