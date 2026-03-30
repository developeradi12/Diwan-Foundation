"use client";
import Header from "@/app/(admin)/_components/header";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BookOpen, Download, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";
import { toast } from "sonner";

interface MemberCertificate {
  _id: string;
  userName: string;
  certificateNo: string;
  createdAt: string;
  fileUrl: string;
}

const ITEMS_PER_PAGE = 10;

const MemberCertificate = () => {
  const [certificates, setCertificates] = useState<MemberCertificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // reset to page 1 on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch certificates
  useEffect(() => {
    setMounted(true);
    const fetchCertificate = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/achivement-certificate");
        setCertificates(res.data.data ?? []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch certificates");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCertificate();
  }, []);

  // Client-side filtered + paginated data
  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();
    if (!q) return certificates;
    return certificates.filter(
      (c) =>
        c.userName?.toLowerCase().includes(q) ||
        c.certificateNo?.toLowerCase().includes(q)
    );
  }, [certificates, debouncedSearch]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Open confirmation dialog
  const confirmDelete = (id: string) => {
    setCertificateToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Actual delete
  const handleDelete = async () => {
    if (!certificateToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/achivement-certificate/${certificateToDelete}`);
      setCertificates((prev) => prev.filter((c) => c._id !== certificateToDelete));
      toast.success("Certificate deleted successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setCertificateToDelete(null);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!mounted) return null;

  return (
    <div>
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Achievement Certificate"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog  open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-400">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certificate?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The certificate will be permanently
              deleted from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="p-6 container mx-auto space-y-6 bg-transparent">
        {/* Page Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}
            >
              Member Achievement Certificate
            </p>
            <p className="text-sm mt-0.5 text-gray-400">
              Manage and publish all members achievement certificate
            </p>
          </div>
          <Button
            onClick={() => router.push("/admin/achievement-certificate/generate")}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg w-fit"
            style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Generate Achievement Certificate
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div
              className="p-3 rounded-xl"
              style={{ background: "color-mix(in oklch, var(--color-primary) 10%, white)" }}
            >
              <BookOpen size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-medium text-gray-400">
                Total Certificates
              </p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: "var(--color-primary)" }}>
                {certificates.length}
              </p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Card Header with Search */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full" style={{ background: "var(--color-accent)" }} />
              <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                All Achievement Certificates
              </p>
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  background: "color-mix(in oklch, var(--color-primary) 8%, white)",
                  color: "var(--color-primary)",
                }}
              >
                {filtered.length}
              </span>
            </div>

            {/* Search */}
            <div className="flex gap-2">
              <div className="relative">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or certificate ID..."
                  className="h-9 w-64 text-sm border-gray-200 rounded-lg pr-8 focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
                />
                {searchTerm !== debouncedSearch && (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                )}
              </div>
              {searchTerm && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-lg border-gray-200 text-xs"
                  onClick={() => setSearchTerm("")}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow
                  className="border-b border-gray-100"
                  style={{ background: "color-mix(in oklch, var(--color-primary) 4%, white)" }}
                >
                  <TableHead
                    className="text-xs font-semibold uppercase tracking-wide py-3 w-72 px-6"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Member Name
                  </TableHead>
                  <TableHead
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Certificate ID
                  </TableHead>
                  <TableHead
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Created Date
                  </TableHead>
                  <TableHead
                    className="text-xs font-semibold uppercase tracking-wide text-right px-6"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw
                          className="h-6 w-6 animate-spin"
                          style={{ color: "var(--color-primary)" }}
                        />
                        <p className="text-sm text-gray-400">Fetching certificates...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: "color-mix(in oklch, var(--color-primary) 8%, white)" }}
                        >
                          <BookOpen size={20} style={{ color: "var(--color-primary)" }} />
                        </div>
                        <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                          {debouncedSearch ? "No results found" : "No certificates found"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {debouncedSearch
                            ? "Try a different search term"
                            : "Generate your first certificate to get started"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((certificate) => (
                    <TableRow
                      key={certificate._id}
                      className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
                    >
                      <TableCell className="text-sm text-gray-900 py-3 px-5 capitalize">
                        {certificate.userName}
                      </TableCell>
                      <TableCell className="py-3 text-sm text-gray-600">
                        {certificate.certificateNo}
                      </TableCell>
                      <TableCell className="py-3 text-sm text-gray-600">
                        {formatDate(certificate.createdAt)}
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <div className="flex justify-end gap-2 pr-5">
                          <Link
                            href={certificate.fileUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="text-white cursor-pointer"
                              style={{ background: "var(--color-primary)" }}
                            >
                              <Download size={15} />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            onClick={() => confirmDelete(certificate._id)}
                            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Page {currentPage} of {totalPages} &nbsp;·&nbsp; {filtered.length} results
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="h-8 rounded-lg border-gray-200 text-xs"
                  style={{ color: "var(--color-primary)" }}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="h-8 rounded-lg border-gray-200 text-xs"
                  style={{ color: "var(--color-primary)" }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCertificate;