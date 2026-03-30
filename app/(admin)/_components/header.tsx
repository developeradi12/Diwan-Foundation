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
    await api.post("/auth/logout")

    // redirect after logout
    window.location.href = "/login"
  } catch (error) {
    console.log("Logout error", error)
  }
}

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between px-4 border-b`">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 text-(--color-text)" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href={backlink}
                className="text-(--color-text-muted) hover:text-(--color-primary)"
              >
                {pageName}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-(--color-primary) font-medium">
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex gap-3 items-center">
        <Link href="/donate">
          <Button className="bg-(--color-primary) text-(--color-text-inverse) hover:opacity-90 cursor-pointer">
            <Spotlight /> Donations
          </Button>
        </Link>
        <Link href="#">
          <Button className="bg-(--color-success) text-white hover:opacity-90 cursor-pointer">
            <SquarePenIcon /> Blogs
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full w-10 h-10 border-(--color-border)"
            >
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3 bg-white w-[200px] text-md border-none">
            <DropdownMenuLabel className="text-md font-medium">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-md">
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
