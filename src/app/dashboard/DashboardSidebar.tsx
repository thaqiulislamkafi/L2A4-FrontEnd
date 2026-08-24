"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  Star,
  MessageSquareText,
  ShoppingCart,
  ListOrdered,
  Settings,
  UserCircle,
  ChefHat,
  Wallet,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { Badge } from "@/components/ui/badge";

type UserRole = "admin" | "provider" | "user";

interface DashboardNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

/* -------------------------------------------------------------------------- */
/* Admin Navigation                                                            */
/* -------------------------------------------------------------------------- */

const adminNavItems: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "All Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "All Meals",
    href: "/dashboard/admin/meals",
    icon: UtensilsCrossed,
  },
  {
    title: "All Reviews",
    href: "/dashboard/admin/reviews",
    icon: Star,
  },
  {
    title: "All Meal Reviews",
    href: "/dashboard/admin/meal-reviews",
    icon: MessageSquareText,
  },
  {
    title: "All Orders",
    href: "/dashboard/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "All Order Items",
    href: "/dashboard/admin/order-items",
    icon: ListOrdered,
  },
  {
    title: "App Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
  {
    title: "My Profile",
    href: "/dashboard/admin/profile",
    icon: UserCircle,
  },
];

/* -------------------------------------------------------------------------- */
/* Provider Navigation                                                         */
/* -------------------------------------------------------------------------- */

const providerNavItems: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/provider",
    icon: LayoutDashboard,
  },
  {
    title: "My Meals",
    href: "/dashboard/provider/meals",
    icon: ChefHat,
  },
  {
    title: "My Orders",
    href: "/dashboard/provider/orders",
    icon: ShoppingCart,
  },
  {
    title: "My Order Items",
    href: "/dashboard/provider/order-items",
    icon: ListOrdered,
  },
  {
    title: "My Revenues",
    href: "/dashboard/provider/revenues",
    icon: Wallet,
  },
  {
    title: "My Profile",
    href: "/dashboard/provider/profile",
    icon: UserCircle,
  },
];

/* -------------------------------------------------------------------------- */
/* User Navigation                                                             */
/* -------------------------------------------------------------------------- */

const userNavItems: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    title: "My Orders",
    href: "/dashboard/user/orders",
    icon: ShoppingCart,
  },
  {
    title: "My Order Items",
    href: "/dashboard/user/order-items",
    icon: ListOrdered,
  },
  {
    title: "My Reviews",
    href: "/dashboard/user/reviews",
    icon: Star,
  },
  {
    title: "My Profile",
    href: "/dashboard/user/profile",
    icon: UserCircle,
  },
];

/* -------------------------------------------------------------------------- */
/* Helper Functions                                                            */
/* -------------------------------------------------------------------------- */

function getNavItems(role?: UserRole): DashboardNavItem[] {
  switch (role) {
    case "admin":
      return adminNavItems;

    case "provider":
      return providerNavItems;

    case "user":
      return userNavItems;

    default:
      return [];
  }
}

function getRoleLabel(role?: UserRole) {
  switch (role) {
    case "admin":
      return "Administrator";

    case "provider":
      return "Provider";

    case "user":
      return "User";

    default:
      return "";
  }
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);

  const navItems = getNavItems(
    user?.role as UserRole | undefined
  );

  const profileHref =
    navItems.find((item) => item.title === "My Profile")?.href ??
    "/dashboard";

  return (
    <Sidebar
      collapsible="icon"
      className=" border-orange-200/80 bg-orange-50/70 text-orange-950 dark:border-orange-900/40 dark:bg-orange-950/10 dark:text-orange-50
      "
    >

      <SidebarHeader className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/dashboard" />}
              size="lg"
              tooltip="FoodHub Dashboard"
              className="h-12 rounded-xl text-orange-700 transition-all duration-200 hover:bg-orange-100 hover:text-orange-700 dark:text-orange-400 dark:hover:bg-orange-950/40 dark:hover:text-orange-300 group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:p-2! group-data-[collapsible=icon]:justify-center
              "
            >
              {/* Logo */}
              <div
                className=" flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm shadow-orange-500/25 transition-transform duration-200 group-hover/menu-button:scale-105 
                "
              >
                <UtensilsCrossed className="size-4" />
              </div>

              {/* Brand Information */}
              <div
                className=" grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden
                "
              >
                <span
                  className=" truncate font-bold tracking-tight text-orange-600 dark:text-orange-400
                  "
                >
                  FoodHub
                </span>

                <span
                  className=" truncate text-[11px] font-medium tracking-wide text-orange-500/70 dark:text-orange-400/60
                  "
                >
                  Dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="bg-orange-200/80 dark:bg-orange-900/40" />

      <SidebarContent className="px-1.5">
        <SidebarGroup className="py-3">
          <SidebarGroupLabel
            className=" mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-orange-500/80 dark:text-orange-400/80 group-data-[collapsible=icon]:hidden 
            "
          >
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.href} >
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className={` relative h-10 rounded-lg px-4 transition-all duration-200 ease-out group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! group-data-[collapsible=icon]:h-10! group-data-[collapsible=icon]:justify-center  [&>svg]:size-[18px] [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-200
                        ${
                          isActive
                            ? ` bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600 hover:text-white dark:bg-orange-600 dark:text-white dark:hover:bg-orange-500 [&>svg]:text-white
                            `
                            : ` font-medium text-orange-800 hover:bg-orange-100 hover:text-orange-700 dark:text-orange-200 dark:hover:bg-orange-950/40 dark:hover:text-orange-300 [&>svg]:text-orange-500 dark:[&>svg]:text-orange-400 hover:[&>svg]:scale-105
                            `
                        }
                      `}
                    >
                      <Icon />

                      <span className=" truncate group-data-[collapsible=icon]:hidden
                        "
                      >
                        {item.title}
                      </span>

                      {/* Active Indicator */}
                      {isActive && (
                        <span
                          className=" absolute right-2 size-1.5 rounded-full bg-white opacity-90 group-data-[collapsible=icon]:hidden
                          "
                        />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="bg-orange-200/80 dark:bg-orange-900/40" />

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href={profileHref} />}
              size="lg"
              tooltip={user?.name ?? "My Profile"}
              className=" h-12 rounded-xl text-orange-800 transition-all duration-200 hover:bg-orange-100 hover:text-orange-700 dark:text-orange-200 dark:hover:bg-orange-950/40 dark:hover:text-orange-300 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! group-data-[collapsible=icon]:justify-center
              "
            >
              {/* User Information */}
              <div
                className=" grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden
                "
              >
                <span
                  className=" truncate text-sm font-semibold tracking-tight text-orange-900 dark:text-orange-100
                  "
                >
                  {user?.name ?? "User"}
                </span>

                <span
                  className=" mt-0.5 truncate text-[11px] font-medium text-orange-600/70 dark:text-orange-300/70
                  "
                >
                  {user?.email ?? ""}
                </span>
              </div>

              {/* Role Badge */}
              <Badge
                variant="secondary"
                className=" rounded-full border border-orange-200 bg-orange-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-700 transition-colors hover:bg-orange-200 group-data-[collapsible=icon]:hidden dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300 dark:hover:bg-orange-900/50
                "
              >
                {getRoleLabel(
                  user?.role as UserRole | undefined
                )}
              </Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}