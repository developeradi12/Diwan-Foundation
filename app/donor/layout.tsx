"use client"


import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  LogOutIcon,
  UserIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import api from "@/lib/axios"
import { AppSidebar } from "./_components/app-sidebar"

const MemberDashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await api.post("/logout")
      router.push("/login") //  better than window.location
    } catch (error) {
      console.log("Logout error", error)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* HEADER */}
        <header className="flex h-16 items-center border-b border-gray-100 bg-[#325E52]">
          <div className="flex items-center justify-between w-full px-3 text-white">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              <SidebarTrigger />

              <Separator
                orientation="vertical"
                className="h-4 bg-gray-200"
              />

              <div className="flex gap-4 text-sm">
                <Link href="/">Home</Link>
                <Link href="/about">About Us</Link>
                <Link href="/blog">Blogs</Link>
                <Link href="/contact">Contact Us</Link>
                <Link href="/donate">Donate</Link>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="/images/gallery/user-profile.jpg"
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white border-gray-100 w-[15rem] p-2">
                
                <DropdownMenuItem asChild>
                  <Link href="/donor/profile" className="flex items-center gap-2">
                    <UserIcon size={16} />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 cursor-pointer"
                >
                  <LogOutIcon size={16} />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </header>

        {/* MAIN */}
        <main className="p-5">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MemberDashboardLayout