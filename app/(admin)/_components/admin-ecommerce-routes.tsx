"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface adminRoutes { icon: LucideIcon; label: string; href: string; }

const AdminEcommerceRouts = ({ icon: Icon, label, href }: adminRoutes) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          "text-(--color-text) hover:bg-(--color-border) px-5 rounded-sm font-medium",
          isActive && "bg-(--color-accent)/20 text-(--color-primary) font-semibold"
        )}
      >
        <Link href={href}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default AdminEcommerceRouts;