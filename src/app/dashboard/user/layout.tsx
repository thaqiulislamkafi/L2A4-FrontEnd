"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth.store";

export default function UserLayout({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) <Spinner />
  }, [router, user]);

  if (!user) {
    return <Spinner />;
  }
  
  if (user.role !== "user") {
    router.replace("/forbidden");
  }

  return <>{children}</>;
}