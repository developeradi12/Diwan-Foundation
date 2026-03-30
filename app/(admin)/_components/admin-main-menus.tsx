"use client";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type SubmenuItem = {
  id: number;
  label: string;
  href: string;
  icon?: any;
};

type AdminRoutesProps = {
  icon: any;
  label: string;
  href?: string;
  multimenu?: boolean;
  submenus?: SubmenuItem[];
};

const AdminMainRouts = ({
  icon: Icon,
  label,
  href,
  multimenu,
  submenus = [],
}: AdminRoutesProps) => {
  const pathname = usePathname();

  const isActive =
    !!href &&
    ((pathname === "/" && href === "/") ||
      pathname === href ||
      pathname?.startsWith(`${href}/`));

  const isParentActive =
    multimenu && submenus.some((sub) => pathname === sub.href || pathname?.startsWith(`${sub.href}/`));

  // Auto-open if a child is active
  const [open, setOpen] = useState<boolean>(!!isParentActive);

  const baseBtn =
    "text-(--color-text) hover:bg-(--color-border) px-5 rounded-sm font-medium";
  const activeBtn =
    "bg-(--color-accent)/20 text-(--color-primary) font-semibold";

  /* ── Multimenu (parent + submenus) ── */
  if (multimenu && submenus.length > 0) {
    return (
      <SidebarMenu>
        {/* Parent toggle row */}
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setOpen((v) => !v)}
            className={cn(baseBtn, isParentActive && activeBtn, "cursor-pointer")}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span className="flex-1">{label}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Submenus — visible only when open */}
        {open && submenus.map((sub) => {
          const subIsActive =
            pathname === sub.href || pathname?.startsWith(`${sub.href}/`);
          return (
            <SidebarMenuItem key={sub.id}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "pl-10 text-(--color-text) hover:bg-(--color-border) rounded-sm font-medium",
                  subIsActive && activeBtn
                )}
              >
                <Link href={sub.href}>
                  {sub.icon && <sub.icon className="mr-2 h-4 w-4" />}
                  <span>{sub.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    );
  }

  /* ── Single menu item ── */
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(baseBtn, isActive && activeBtn)}
      >
        <Link href={href || "#"}>
          <Icon className="mr-2 h-4 w-4" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default AdminMainRouts;