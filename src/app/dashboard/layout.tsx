"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Home } from "lucide-react";

import {SidebarProvider,SidebarInset,} from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Geist } from "next/font/google";

interface DashboardLayoutProps {
  children: ReactNode;
}
const geist = Geist({ subsets: ["latin"] });
export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset>
        <DashboardHeader />

        <main className={`${geist.className} flex-1 p-4 sm:p-6 lg:p-8 overflow-hidden`}>
          {children}
        </main>
      </SidebarInset>
      <Link
        href="/"
        aria-label="Go to homepage"
        title="Go to homepage"
        className="fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-orange-500 text-primary-foreground shadow-lg transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Home className="size-5" aria-hidden="true" />
      </Link>
    </SidebarProvider>
  );
}