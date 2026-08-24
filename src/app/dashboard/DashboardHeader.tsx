"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronRight,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

import {
  SidebarTrigger,
  //   Separator,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Geist } from "next/font/google";


interface PageInfo {
  title: string;
  description?: string;
}

const pageMap: Record<string, PageInfo> = {

  "/dashboard/admin": {
    title: "Dashboard",
    description: "Overview of your FoodHub application.",
  },

  "/dashboard/admin/users": {
    title: "All Users",
    description: "Manage all users of the platform.",
  },

  "/dashboard/admin/meals": {
    title: "All Meals",
    description: "Manage all meals available on FoodHub.",
  },

  "/dashboard/admin/reviews": {
    title: "All Reviews",
    description: "Manage platform reviews.",
  },

  "/dashboard/admin/meal-reviews": {
    title: "All Meal Reviews",
    description: "Manage reviews submitted for meals.",
  },

  "/dashboard/admin/orders": {
    title: "All Orders",
    description: "Manage all customer orders.",
  },

  "/dashboard/admin/order-items": {
    title: "All Order Items",
    description: "View and manage order items.",
  },

  "/dashboard/admin/settings": {
    title: "App Settings",
    description: "Manage application settings.",
  },

  "/dashboard/admin/profile": {
    title: "My Profile",
    description: "Manage your profile information.",
  },

  "/dashboard/provider": {
    title: "Dashboard",
    description: "Overview of your provider account.",
  },

  "/dashboard/provider/meals": {
    title: "My Meals",
    description: "Manage the meals you provide.",
  },

  "/dashboard/provider/orders": {
    title: "My Orders",
    description: "View orders containing your meals.",
  },

  "/dashboard/provider/order-items": {
    title: "My Order Items",
    description: "View your meal order items.",
  },

  "/dashboard/provider/revenues": {
    title: "My Revenues",
    description: "Track your earnings and revenues.",
  },

  "/dashboard/provider/profile": {
    title: "My Profile",
    description: "Manage your profile information.",
  },


  "/dashboard/user": {
    title: "Dashboard",
    description: "Overview of your FoodHub account.",
  },

  "/dashboard/user/orders": {
    title: "My Orders",
    description: "View your order history.",
  },

  "/dashboard/user/order-items": {
    title: "My Order Items",
    description: "View items from your orders.",
  },

  "/dashboard/user/reviews": {
    title: "My Reviews",
    description: "Manage your submitted reviews.",
  },

  "/dashboard/user/profile": {
    title: "My Profile",
    description: "Manage your profile information.",
  },
};


function getPageInfo(pathname: string): PageInfo {
  if (pageMap[pathname]) {
    return pageMap[pathname];
  }

  const matchingPath = Object.keys(pageMap).find((path) =>
    pathname.startsWith(`${path}/`)
  );

  return (
    (matchingPath && pageMap[matchingPath]) || {
      title: "Dashboard",
      description: "Welcome to your FoodHub dashboard.",
    }
  );
}

function getRoleLabel(role?: string) {
  switch (role) {
    case "admin":
      return "Administrator";

    case "provider":
      return "Provider";

    case "user":
      return "User";

    default:
      return "User";
  }
}

function getProfileHref(role?: string) {
  switch (role) {
    case "admin":
      return "/dashboard/admin/profile";

    case "provider":
      return "/dashboard/provider/profile";

    case "user":
      return "/dashboard/user/profile";

    default:
      return "/dashboard";
  }
}

const geist = Geist({ subsets: ["latin"] });

export default function DashboardHeader() {
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.clearUser);

  const pageInfo = getPageInfo(pathname);

  const profileHref = getProfileHref(user?.role);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className={`${geist.className} sticky top-0 z-30 flex h-16.25 w-full shrink-0 items-center border-b border-orange-200/70 bg-orange-50/80 backdrop-blur-xl supports-backdrop-filter:bg-orange-50/60 dark:border-orange-900/40 dark:bg-orange-950/10 dark:supports-backdrop-filter:bg-orange-950/20
      `}
    >
      <div className="flex h-full w-full min-w-0 items-center justify-between gap-3 px-3 sm:px-4"
      >

        <div className="flex min-w-0 flex-1 items-center gap-2"
        >

          {/* Sidebar Trigger */}

          <SidebarTrigger
            className="size-9 shrink-0 rounded-lg text-orange-700 transition-all duration-200 hover:bg-orange-100 hover:text-orange-600 dark:text-orange-300 dark:hover:bg-orange-950/40 dark:hover:text-orange-200"
          />

          <Separator
            orientation="vertical"
            className="mx-2  shrink-0 bg-orange-200 dark:bg-orange-900/50
            "
          />

          { /*Page Information */}

          <div className=" hidden min-w-0 flex-1 sm:block">
            <div className=" flex min-w-0 items-center gap-2"
            >
              {/* Orange indicator */}
              <span
                className="size-1.5 shrink-0 rounded-full bg-orange-500 shadow-sm shadow-orange-500/40
                "
              />

              {/* Page title */}
              <span
                className="min-w-0 truncate text-lg font-bold tracking-tight text-orange-950 dark:text-orange-50
                "
              >
                {pageInfo.title}
              </span>
            </div>

            {/* Page description */}
            {pageInfo.description && (
              <p
                className="mt-0.5 hidden max-w-lg truncate pl-3.5 text-[11px] font-medium leading-4 text-orange-700/60 lg:block dark:text-orange-300/60
                "
              >
                {pageInfo.description}
              </p>
            )}
          </div>
        </div>


        {/* Right Side  */}

        <div
          className=" flex shrink-0 items-center gap-1.5 sm:gap-2">

          {/* Notifications */}

          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative size-9 shrink-0 rounded-lg text-orange-700 transition-all duration-200 hover:bg-orange-100 hover:text-orange-600 hover:shadow-sm dark:text-orange-300 dark:hover:bg-orange-950/40 dark:hover:text-orange-200
            "
          >
            <Bell
              className="size-[18px] transition-transform duration-200
              "
            />

            {/* Notification indicator */}
            <span
              className="absolute right-2 top-2 size-1.5 rounded-full bg-orange-500 ring-2 ring-orange-50 dark:ring-orange-950
              "
            />
          </Button>

          {/* User Dropdown */}

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-10 shrink-0 gap-2 rounded-xl px-2 text-orange-900 transition-all duration-200 hover:bg-orange-100 hover:text-orange-700 dark:text-orange-100 dark:hover:bg-orange-950/40 dark:hover:text-orange-200
                  "
                />
              }
            >
              {/* User information */}
              <div
                className="hidden min-w-0 text-left md:grid
                "
              >
                <span
                  className="max-w-32 truncate text-sm font-semibold tracking-tight
                  "
                >
                  {user?.name ?? "User"}
                </span>

                <span
                  className="max-w-32 truncate text-[11px] font-medium text-orange-600/60 dark:text-orange-300/60
                  "
                >
                  {user?.email ?? ""}
                </span>
              </div>

              {/* Chevron */}
              <ChevronRight
                className="hidden size-4 rotate-90 text-orange-500/70 transition-transform duration-200 md:block
                "
              />

              {/* Mobile user icon */}
              <UserCircle
                className="size-[18px] text-orange-500 md:hidden
                "
              />
            </DropdownMenuTrigger>

            {/* Dropdown Content  */}

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-64 rounded-xl border border-orange-200/80 bg-white/95 p-1.5 shadow-xl shadow-orange-950/5 backdrop-blur-xl dark:border-orange-900/50 dark:bg-orange-950/95
              "
            >

              {/* User Information  */}

              <DropdownMenuGroup>
                <DropdownMenuLabel className="p-2.5">
                  <div className="flex items-center gap-3">
                    {/* User Initial */}
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600 ring-1 ring-orange-200 transition-transform duration-200 dark:bg-orange-950/60 dark:text-orange-400 dark:ring-orange-900/60
                    "
                    >
                      {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                    </div>

                    {/* User details */}
                    <div className="min-w-0 flex-1">
                      <p
                        className=" truncate text-sm font-bold tracking-tight text-orange-950 dark:text-orange-50
                      "
                      >
                        {user?.name ?? "User"}
                      </p>

                      <p
                        className="mt-0.5 truncate text-[11px] font-medium text-orange-600/60 dark:text-orange-300/60
                      "
                      >
                        {user?.email ?? ""}
                      </p>

                      {/* Role */}
                      <Badge
                        variant="secondary"
                        className="mt-1.5 rounded-full border border-orange-200 bg-orange-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-700 hover:bg-orange-200 dark:border-orange-800 dark:bg-orange-950/60 dark:text-orange-300 dark:hover:bg-orange-900/60
                      "
                      >
                        {getRoleLabel(user?.role)}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>


              <DropdownMenuSeparator
                className="bg-orange-100 dar:bg-orange-900/40
                "
              />

              {/* Menu Items */}

              <DropdownMenuGroup className="space-y-0.5">
                {/* Profile */}
                <DropdownMenuItem
                  render={<Link href={profileHref} />}
                  className="cursor-pointer rounded-lg px-2.5 py-2 font-medium text-orange-800 transition-colors duration-150 focus:bg-orange-100 focus:text-orange-700 dark:text-orange-200 dark:focus:bg-orange-950/60 dark:focus:text-orange-300
                  "
                >
                  <UserCircle
                    className="size-4 text-orange-500 dark:text-orange-400
                    "
                  />

                  <span>My Profile</span>
                </DropdownMenuItem>

                {/* Dashboard */}
                <DropdownMenuItem
                  render={<Link href="/dashboard" />}
                  className=" cursor-pointer rounded-lg px-2.5 py-2 font-medium text-orange-800 transition-colors duration-150 focus:bg-orange-100 focus:text-orange-700 dark:text-orange-200 dark:focus:bg-orange-950/60 dark:focus:text-orange-300
                  "
                >
                  <Settings
                    className="size-4 text-orange-500 dark:text-orange-400
                    "
                  />

                  <span>Dashboard</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator
                className=" bg-orange-100 dark:bg-orange-900/40
                "
              />

              {/* Logout  */}

              <DropdownMenuItem
                onClick={handleLogout}
                className=" cursor-pointer rounded-lg px-2.5 py-2 font-medium text-red-600 transition-colors duration-150 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-950/30 dark:focus:text-red-400
                "
              >
                <LogOut className="size-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}