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
  const isLoading = useAuthStore((s) => s.isLoading);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) <Spinner />;
  }, [router, user, isLoading]);

  if (user && user.role !== "admin") {
    router.replace("/forbidden");
  }

  if (!isLoading && !user) {
    router.replace("/signin");
  }

  return <>{children}</>;
}
