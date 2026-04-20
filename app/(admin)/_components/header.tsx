"use client"
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spotlight, SquarePenIcon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/axios";

interface BreadcrumbProps {
  backlink: string;
  pageName: string;
  currentPage: string;
}

const Header = ({ backlink, pageName, currentPage }: BreadcrumbProps) => {

  const handleLogout = async () => {
    try {
      await api.post("/admin/logout")
      window.location.href = "/login"
    } catch (error) {
      console.log("Logout error", error)
    }
  }

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 sm:px-4 py-2 sm:h-16 ">

      {/* LEFT */}
      <div className="flex items-center gap-2 flex-wrap">
        <SidebarTrigger className="-ml-1 text-(--color-text)" />

        <Separator
          orientation="vertical"
          className="hidden sm:block mr-2 h-4"
        />

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden sm:block">
              <BreadcrumbLink
                href={backlink}
                className="text-(--color-text-muted) hover:text-(--color-primary)"
              >
                {pageName}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="hidden sm:block" />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-(--color-primary) font-medium text-sm sm:text-base">
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">

        {/* Donations Button */}
        <Link href="/admin/donations">
          <Button className="bg-(--color-primary) text-(--color-text-inverse) hover:opacity-90 flex items-center gap-1 px-3 py-2 text-xs sm:text-sm">
            <Spotlight size={16} />
            <span className="hidden sm:inline">Donations</span>
          </Button>
        </Link>

        {/* Blogs Button */}
        <Link href="/admin/blogs">
          <Button className="bg-(--color-success) text-white hover:opacity-90 flex items-center gap-1 px-3 py-2 text-xs sm:text-sm">
            <SquarePenIcon size={16} />
            <span className="hidden sm:inline">Blogs</span>
          </Button>
        </Link>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-(--color-border)"
            >
              <User size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mr-2 bg-white w-[180px] sm:w-[200px] border-0">
            <DropdownMenuLabel>
              <Link href="/admin/my-account" className="block w-full">
                My Account
              </Link>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
};

export default Header;