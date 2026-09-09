"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, Menu, ShoppingCart } from "lucide-react";
import { Geist } from "next/font/google";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { userLogout } from "@/lib/api/auth";
import { getCartItemsByUserId } from "@/lib/api/cart";
import axiosInstance from "@/lib/axios";
import { toast } from "./ui/toast";
import { useState } from "react";
import ShowCart from "./ShowCart";
import { useQuery } from "@tanstack/react-query";

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
  {
    label: "Become a provider",
    href: "/become-provider",
  },
];

export default function Navbar() {

  const { user, clearUser } = useAuthStore();
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const userId = user?.id;

  const { data: cartData } = useQuery({
    queryKey: ["cart-items", userId],
    queryFn: () => getCartItemsByUserId(userId as string),
    enabled: Boolean(userId),
  });

  const cartItemCount = cartData?.data.reduce((total, item) => total + item.quantity, 0) ?? 0;

  const handleSignOut = async () => {

    try {
      await userLogout();

      clearUser();

      toast.add({
        title: "Signed out",
        description: "You have been successfully signed out.",
        type: "success",
      });

      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);

      toast.add({
        title: "Sign out failed",
        description: "Unable to sign out. Please try again.",
        type: "error",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await axiosInstance.post("/auth/sign-in/social", {
        provider: "google",
        callbackURL: `${window.location.origin}/auth/callback`,
        errorCallbackURL: `${window.location.origin}/auth/callback`,
        requestSignUp: false,
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Google sign-in failed:", error);

      toast.add({
        title: "Google sign-in failed",
        description: "Unable to continue with Google. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <header
      className={`${geist.className} sticky top-0 z-50 border-b border-orange-100 bg-orange-50/90 backdrop-blur-md`}
    >
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">

        {/* =======================
                    LOGO
        ===========================*/}

        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-orange-600 transition-colors duration-300 hover:text-orange-700"
        >
          FoodHub
        </Link>

        {/* =======================================
                      DESKTOP NAVIGATION
        ============================================ */}

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">

              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    render={
                      <Link href={item.href} />
                    }
                    className="text-sm rounded-md px-4  py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-100 focus:text-orange-600
                    "
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ===========================================
                        DESKTOP ACTIONS
        ==============================================*/}

        <div className="hidden items-center gap-2 md:flex">

          {/* ======================= CART ======================= */}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setCartOpen(true)}
            className="group relative size-10 rounded-xl text-orange-600 transition-all duration-300 hover:bg-orange-100 hover:text-orange-700 hover:shadow-sm dark:text-orange-400 dark:hover:bg-orange-950/50 dark:hover:text-orange-300"
            aria-label="Open shopping cart"
          >
            <ShoppingCart className="size-5 transition-transform duration-300 group-hover:scale-110" />

            {/* Cart Count */}

            <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full border-2 border-orange-50 bg-orange-600 text-[10px] font-bold leading-none text-white shadow-sm dark:border-orange-950">
              {cartItemCount}
            </span>
          </Button>

          {/* ======================= AUTH ACTIONS ======================= */}

          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" className="gap-2 rounded-xl border-orange-200 px-5 text-base font-medium text-orange-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-700 hover:shadow-sm dark:border-orange-900 dark:text-orange-400 dark:hover:border-orange-800 dark:hover:bg-orange-950/50 dark:hover:text-orange-300">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Button>
              </Link>

              <Button onClick={handleSignOut} className="gap-2 rounded-xl border border-orange-600 bg-orange-600 px-5 text-base font-medium text-white shadow-sm shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md hover:shadow-orange-600/30">
                <LogOut className="size-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="outline" className="rounded-xl border-orange-200 px-5 text-base font-medium text-orange-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-700 hover:shadow-sm dark:border-orange-900 dark:text-orange-400 dark:hover:border-orange-800 dark:hover:bg-orange-950/50 dark:hover:text-orange-300">
                  Sign In
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="rounded-xl border border-orange-600 bg-orange-600 px-5 text-base font-medium text-white shadow-sm shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md hover:shadow-orange-600/30">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* =========================================
                            MOBILE MENU
            ========================================= */}

        <div className="md:hidden overflow-auto">
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
              className="border-l border-orange-100 bg-orange-50/95 p-0 sm:max-w-sm dark:border-orange-950/40 dark:bg-background/95 overflow-auto!"
            >

              {/* =========================
                          Header
                 ========================== */}

              <SheetHeader
                className=" border-b border-orange-100 bg-orange-100/50 px-6 py-6 dark:border-orange-950/40 dark:bg-orange-950/20"
              >
                <SheetTitle
                  className="tracking-tight text-orange-600"
                >
                  FoodHub
                </SheetTitle>

                <SheetDescription
                  className=" text-slate-600 dark:text-slate-400"
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
                    <SheetClose nativeButton={false}
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
                  {user ? (
                    <>
                      <SheetClose nativeButton={false}
                        render={
                          <Link href="/dashboard" />
                        }
                      >
                        <Button
                          variant="outline"
                          className="h-12 w-full rounded-xl border-orange-200 bg-background font-semibold text-orange-600 transition-all duration-300 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/30"
                        >
                          <LayoutDashboard className="size-4" />
                          Dashboard
                        </Button>
                      </SheetClose>

                      <SheetClose className={`w-full`} nativeButton={false}>
                        <Button
                          onClick={handleSignOut}
                          className="h-12 w-full mt-4 rounded-xl border border-orange-600 bg-orange-600 font-semibold text-white shadow-md shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-700 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30"
                        >
                          <LogOut className="size-4" />
                          Sign Out
                        </Button>
                      </SheetClose>


                    </>
                  ) : (
                    <>
                      <SheetClose nativeButton={false}
                        render={
                          <Link href="/signin" />
                        }
                      >
                        <Button
                          variant="outline"
                          className="h-12 w-full rounded-xl border-orange-200 bg-background font-semibold text-orange-600 transition-all duration-300 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/30"
                        >
                          Sign In
                        </Button>
                      </SheetClose>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignIn}
                        className="h-12 mt-4 w-full rounded-xl border-orange-200 bg-background font-semibold text-orange-600 transition-all duration-300 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/30"
                      >
                        <GoogleIcon />
                        Sign in with Google
                      </Button>

                      <SheetClose nativeButton={false}
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
                    </>
                  )}

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
        <ShowCart
          open={cartOpen}
          onOpenChange={setCartOpen}
        />
      </div>
    </header>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42Z"
      />
      <path
        fill="#34A853"
        d="M12 21.99c2.63 0 4.84-.87 6.45-2.34l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.99Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 14.09a5.86 5.86 0 0 1 0-4.18V7.38H3.3a9.74 9.74 0 0 0 0 9.24l3.24-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.88c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 2.96 14.63 2 12 2a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 7.6 9.46 5.88 12 5.88Z"
      />
    </svg>
  );
}