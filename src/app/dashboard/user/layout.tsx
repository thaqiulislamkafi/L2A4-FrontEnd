"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth.store";

export default function UserLayout({ children }: { children: ReactNode }) {

  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) <Spinner />;
  }, [router, user, isLoading]);

  if (user && user.role !== "user") {
    router.replace("/forbidden");
  }
  
  if (!isLoading && !user) {
    router.replace("/signin");
  }

  return <>{children}</>;
}