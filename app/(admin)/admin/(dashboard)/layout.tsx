import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../../_components/app-sidebar"
import { ReactNode } from "react"
import type { CSSProperties } from "react"   

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "18rem",
        "--sidebar-width-icon": "3rem",
          "--sidebar-background": "0 0% 100%",
      } as CSSProperties}
    >
      <AppSidebar/>
      <SidebarInset>
        <div className="bg-gray-100">
          {children}
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}