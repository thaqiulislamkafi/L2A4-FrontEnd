"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth.store";

export default function ProviderLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) <Spinner />;
  }, [router, user, isLoading]);

  if (user && user.role !== "provider") {
    router.replace("/forbidden");
  }

  if (!isLoading && !user) {
    router.replace("/signin");
  }

  return <>{children}</>;
}
