"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Geist } from "next/font/google";

import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const geist = Geist({
  subsets: ["latin"],
});

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore Meals",
    href: "/explore-meals",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  return (
    <header
      className={`${geist.className} sticky top-0 z-50 border-b border-orange-100 bg-orange-50/90 backdrop-blur-md`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* =======================
                    LOGO
        ===========================*/}

        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-orange-600 transition-colors duration-300 hover:text-orange-700"
        >
          FoodHub
        </Link>

        {/* =====================================================
                               DESKTOP NAVIGATION
        ====================================================== */}

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">

              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    render={
                      <Link href={item.href} />
                    }
                    className="text-sm rounded-md px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-100 focus:text-orange-600
                    "
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* =====================================================
                               DESKTOP ACTIONS
        ====================================================== */}

        <div className="hidden items-center gap-3 md:flex">

          {/* Sign In */}

          <Link href="/signin">
            <Button
              variant="outline"
              className=" border-orange-200 px-5 text-base font-medium text-orange-600 transition-all duration-300 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-700
              "
            >
              Sign In
            </Button>
          </Link>

          {/* Sign Up */}

          <Link href="/signup">
            <Button
              className=" border border-orange-600 bg-orange-600 px-5 text-base text-white transition-all duration-300 hover:border-orange-700 hover:bg-orange-700
              "
            >
              Sign Up
            </Button>
          </Link>

        </div>

        {/* =====================================================
                               MOBILE MENU
            ====================================================== */}

        <div className="md:hidden">
          <Sheet>

            {/* Menu Trigger */}

            <SheetTrigger
              render={
                <Button variant="ghost" size="icon"
                  className=" text-orange-600 transition-all duration-300 hover:bg-orange-100 hover:text-orange-700"
                />
              }
            >
              <Menu className="size-5" />

              <span className="sr-only">
                Open navigation menu
              </span>
            </SheetTrigger>

            {/* Sheet */}

            <SheetContent side="right"
              className=" w-[85%] border-l border-orange-100 bg-orange-50/95 p-0 backdrop-blur-xl sm:max-w-sm dark:border-orange-950/40 dark:bg-background/95"
            >

              {/* =========================
                          Header
                 ========================== */}

              <SheetHeader
                className=" border-b border-orange-100 bg-orange-100/50 px-6 py-6 dark:border-orange-950/40 dark:bg-orange-950/20"
              >
                <SheetTitle
                  className=" text-2xl font-bold tracking-tight text-orange-600"
                >
                  FoodHub
                </SheetTitle>

                <SheetDescription
                  className=" text-sm text-slate-600 dark:text-slate-400"
                >
                  Delicious meals, delivered with care.
                </SheetDescription>
              </SheetHeader>

              {/* =========================
                         Navigation
                ========================== */}

              <nav className="flex flex-1 flex-col px-4 py-6">

                <div className="space-y-2">

                  {navItems.map((item) => (
                    <SheetClose
                      key={item.href}
                      render={
                        <Link
                          href={item.href}
                          className=" flex w-full items-center rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 transition-all duration-300 hover:bg-orange-100 hover:pl-5 hover:text-orange-600 dark:text-slate-200 dark:hover:bg-orange-950/30 dark:hover:text-orange-400"
                        />
                      }
                    >
                      {item.label}
                    </SheetClose>
                  ))}

                </div>

                {/* =========================
                           Divider
                  ========================== */}

                <div className="my-6 h-px bg-orange-100 dark:bg-orange-950/40" />

                {/* =========================
                        Authentication
                   ========================== */}

                <div className="space-y-3">

                  <SheetClose
                    render={
                      <Link href="/signin" />
                    }
                  >
                    <Button
                      variant="outline"
                      className=" h-12 w-full rounded-xl border-orange-200 bg-background font-semibold text-orange-600 transition-all duration-300 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/30"
                    >
                      Sign In
                    </Button>
                  </SheetClose>

                  <SheetClose
                    render={
                      <Link href="/signup" />
                    }
                  >
                    <Button
                      className="my-5 h-12 w-full rounded-xl border border-orange-600 bg-orange-600 font-semibold text-white shadow-md shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-700 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30"
                    >
                      Sign Up
                    </Button>
                  </SheetClose>

                </div>

              </nav>

              {/* =========================
                           Footer
                ========================== */}

              <SheetFooter
                className=" border-t border-orange-100 bg-orange-100/30 px-6 py-5 dark:border-orange-950/40 dark:bg-orange-950/10"
              >
                <p className="text-center text-xs text-muted-foreground">
                  © {new Date().getFullYear()} FoodHub. All rights reserved.
                </p>
              </SheetFooter>

            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}