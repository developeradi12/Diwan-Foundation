import {
  Award,
  Boxes,
  Briefcase,
  ChartNoAxesCombined,
  Home,
  IdCardLanyard,
  Image,
  ImagePlus,
  LayoutDashboard,
  MessageSquare,
  PenSquareIcon,
  Trophy,
  User,
  Users,
  UserStar,
  Video,
  Spotlight,
  Contact,
} from "lucide-react";

const adminMainRoutes = [
  {
    id: "1",
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
    multimenu: false,
    submenus: [],
  },
  {
    id: "2",
    icon: PenSquareIcon,
    label: "Blogs",
    href: "/admin/blogs",   // ✅ single link — no submenus
    multimenu: false,
    submenus: [],
  },
];

const adminAppRoutes = [
  {
    id: 1,
    icon: Spotlight,
    label: "Members",
    href: "/admin/members",
  },
  {
    id: 2,
    icon: Boxes,
    label: "Memberships",
    href: "/admin/memberships",
  },
  {
    id: 3,
    icon: UserStar,
    label: "Donations",
    href: "/admin/donations",
  },
  {
    id: 5,
    icon: User,
    label: "Users",
    href: "/admin/users",
  },
  {
    id: 8,
    icon: Trophy,
    label: "Members Certificate",
    href: "/admin/member-certificate",
  },
  {
    id: 9,
    icon: IdCardLanyard,
    label: "Members Id Card",
    href: "/admin/member-id-card",
  },
  {
    id: 10,
    icon: Award,
    label: "Achievement Certificate",
    href: "/admin/achievement-certificate",
  },
];

// ✅ All 6 home page sections here — no duplicates in adminMainRoutes
const adminHomeRoutes = [
  {
    id: 1,
    icon: Home,
    label: "Home",
    href: "#",
    multimenu: true,
    submenus: [
      {
        id: 11,
        icon: Image,
        label: "Banner",
        href: "/admin/banner",
      },
      {
        id: 12,
        icon: Briefcase,
        label: "Services",
        href: "/admin/services",
      },
      {
        id: 13,
        icon: MessageSquare,
        label: "Testimonials",
        href: "/admin/testimonials",
      },
      // {
      //   id: 14,
      //   icon: Users,
      //   label: "Our Members",
      //   href: "/admin/our-members",
      // },
      {
        id: 15,
        icon: ImagePlus,
        label: "Gallery",
        href: "/admin/gallery",
      },
      {
        id: 16,
        icon: Video,
        label: "Videos",
        href: "/admin/videos",
      },
      {
        id:17,
        icon:Contact,
        label:"Contact",
        href:"/admin/contact"
      }
    ],
  },
];

export { adminMainRoutes, adminAppRoutes, adminHomeRoutes };