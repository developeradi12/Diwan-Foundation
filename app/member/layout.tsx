"use client"
import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/lib/axios";


const MemberDashboardLayout = ({ children }: { children: React.ReactNode }) => {

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-100 bg-[#325E52]">
          <div className="flex items-center gap-2 px-3 text-white justify-between w-full">
            <div className="flex gap-2 items-center">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 h-4 bg-gray-100 text-gray-100"
              />

              <div className="frontend__links text-sm flex gap-4 text-gray-50">
                <Link href="/">Home</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/cntact-us">Contact Us</Link>
                <Link href="/">Donate</Link>
              </div>
            </div>

            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="/images/gallery/user-profile.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-100 w-[15rem] p-3 space-y-2">
                  <DropdownMenuItem>
                    <UserIcon />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <LogOutIcon />
                     <button onClick={handleLogout}>Logout</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="p-5">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MemberDashboardLayout;
