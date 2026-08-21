"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Poppins } from "next/font/google";

import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

<body className={geist.className}></body>
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const navItems = [
  { label: "Home", href: "/" },
  { label: "Explore Meals", href: "/explore-meals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className={`${geist.className} sticky top-0 z-50 border-b border-orange-100 bg-orange-50/90 backdrop-blur-md`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-orange-600 transition-colors hover:text-orange-700"
        >
          FoodHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <Menubar className="border-0 bg-transparent shadow-none">
            {navItems.map((item) => (
              <MenubarMenu key={item.href}>
                <Link href={item.href}>
                  <MenubarTrigger className="rounded-md px-4 py-2 font-medium text-slate-700 transition-all hover:bg-orange-100 hover:text-orange-600">
                    {item.label}
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
            ))}
          </Menubar>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/signin">
            <Button
              variant="ghost"
              className="px-5 text-base font-medium text-orange-600 hover:bg-orange-100 hover:text-orange-700"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/signup">
            <Button className="border border-orange-600 bg-orange-600 px-5 text-base text-white hover:bg-orange-700">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="text-orange-600 hover:bg-orange-100"
              >
                <Menu className="size-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl border-orange-100 bg-white"
            >
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  className="text-slate-700 focus:bg-orange-100 focus:text-orange-600"
                >
                  <Link href={item.href} className="w-full">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem className="text-slate-700 focus:bg-orange-100 focus:text-orange-600">
                <Link href="/signin" className="w-full">
                  Sign In
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-slate-700 focus:bg-orange-100 focus:text-orange-600">
                <Link href="/signup" className="w-full font-medium">
                  Sign Up
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}