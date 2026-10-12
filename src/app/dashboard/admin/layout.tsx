"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user)  <Spinner/>
  }, [router, user]);

  if (!user) {
    return <Spinner />;
  }
  
  if (user.role !== "admin") {
    router.replace("/forbidden");
  }

  return <>{children}</>;
}
