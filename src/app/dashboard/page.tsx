"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import { DashboardSpinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace("/");
      return;
    }

    switch (user?.role) {
      case "admin":
        router.replace("/dashboard/admin");
        break;

      case "provider":
        router.replace("/dashboard/provider");
        break;

      case "user":
        router.replace("/dashboard/user");
        break;

      default:
        router.replace("/");
        break;
    }
  }, [router, user]);

  return <DashboardSpinner />;
}