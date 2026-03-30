import * as React from "react";
import { Album, IdCardLanyard, LayoutDashboard, Medal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-[#325E52]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Image
                  src="/images/gallery/Diwan Logo-01.png"
                  width={150}
                  height={100}
                  alt="logo"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="space-y-2">

          <SidebarMenuItem className="text-white ">
            <SidebarMenuButton>
              <Link href="/member" className="flex gap-2 items-center bg-green-950 px-3 py-4 !rounded-lg w-full ">
                <div className="">
                  <LayoutDashboard className="w-5 text-[#E5B566]" />
                </div>

                <span className="text-md">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="text-white ">
            <SidebarMenuButton>
              <Link href="/member/certificate" className="flex gap-2 items-center hover:bg-green-950 px-3 py-4 rounded-md w-full ">
                <div className="">
                    <Album className="w-5 text-[#E5B566]" />                 
                </div>

                <span className="text-md">Certificate</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          
          <SidebarMenuItem className="text-white ">
            <SidebarMenuButton>
              <Link href="/member/id-card" className="flex gap-2 items-center hover:bg-green-950 px-3 py-4 rounded-md w-full ">
                <div className="">                 
                    <IdCardLanyard className="w-5 text-[#E5B566]"/>                
                </div>

                <span className="text-md">ID Card</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          
          <SidebarMenuItem className="text-white ">
            <SidebarMenuButton>
              <Link href="/member/achivement-certificate" className="flex gap-2 items-center hover:bg-green-950 px-3 py-4 rounded-lg! w-full ">
                <div className="">
                    <Medal className="w-5 text-[#E5B566]"/>                                 
                </div>

                <span className="text-md">Achievment Certificate</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>




         
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
