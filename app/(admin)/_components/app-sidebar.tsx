"use client";
import * as React from "react";
import { NavUser } from "@/app/(admin)/_components/nav-user";
import { TeamSwitcher } from "@/app/(admin)/_components/team-switcher";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarRail,
} from "@/components/ui/sidebar";
import AdminMainRouts from "./admin-main-menus";
import { adminMainRoutes, adminAppRoutes, adminHomeRoutes } from "../admin-sidebar-routes";
import AdminEcommerceRouts from "./admin-ecommerce-routes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-white"
      style={{ backgroundColor: "white" }}
      {...props}
    >
      <SidebarHeader className="bg-white">
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent className="bg-white" >
        {/* ── Main ── */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            {adminMainRoutes.map((item) => (
              <AdminMainRouts
                key={item.id}
                icon={item.icon}
                label={item.label}
                href={item.href}
                multimenu={item.multimenu}
                submenus={item.submenus}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* ── App ── */}
        <SidebarGroup>
          <SidebarGroupLabel>App</SidebarGroupLabel>
          <SidebarMenu>
            {adminAppRoutes.map((item) => (
              <AdminEcommerceRouts
                key={item.id}
                icon={item.icon}
                label={item.label}
                href={item.href}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* ── Settings → Home ── */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            {adminHomeRoutes.map((item) => (
              <AdminMainRouts
                key={item.id}
                icon={item.icon}
                label={item.label}
                href={item.href}
                multimenu={item.multimenu}
                submenus={item.submenus}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-white">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}