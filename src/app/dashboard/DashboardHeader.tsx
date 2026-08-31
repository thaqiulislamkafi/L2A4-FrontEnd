"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {Bell,ChevronRight,LogOut,Settings,UserCircle,} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Geist } from "next/font/google";
import { pageMap } from "./_index";
import { getProfileHref } from "@/utils/dashboard/getProfileHref";
import { getRoleLabel } from "@/utils/dashboard/getRoleLabel";
import { userLogout } from "@/lib/api/auth";
import { toast } from "@/components/ui/toast";


export interface PageInfo {
  title: string;
  description?: string;
}

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

const geist = Geist({ subsets: ["latin"] });

export default function DashboardHeader() {

  const pathname = usePathname();
  const { user,clearUser } = useAuthStore();
  const pageInfo = getPageInfo(pathname);

  const profileHref = getProfileHref(user?.role);

    const router = useRouter();
  
    const handleLogout = async () => {
  
      try {
        await userLogout();
        router.push("/");
        clearUser();
  
        toast.add({
          title: "Signed out",
          description: "You have been successfully signed out.",
          type: "success",
        });
  
      } catch (error) {
        console.error("Sign out failed:", error);
  
        toast.add({
          title: "Sign out failed",
          description: "Unable to sign out. Please try again.",
          type: "error",
        });
      }
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
            <div className="ml-3.5 flex min-w-0 items-center gap-2"
            >

              {/* Page title */}
              <span
                className="min-w-0 truncate text-lg font-bold tracking-tight text-orange-950 dark:text-orange-50
                "
              >
                {pageInfo.title}
              </span>

               {/* Orange indicator */}
              <span
                className="size-1.5 shrink-0 rounded-full bg-orange-500 shadow-sm shadow-orange-500/40
                "
              />
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