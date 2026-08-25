"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

//   useEffect(() => {
//     if (!user)  <Loading/>
//   }, [router, user]);

  return <>{children}</>;
}
