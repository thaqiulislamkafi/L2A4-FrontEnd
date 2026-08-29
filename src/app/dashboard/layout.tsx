"use client";

import { ReactNode } from "react";

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
    </SidebarProvider>
  );
}