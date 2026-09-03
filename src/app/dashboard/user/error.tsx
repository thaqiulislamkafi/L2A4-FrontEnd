"use client";

import DashboardError from "@/app/dashboard/admin/error";

export default function UserDashboardError({
  reset,
}: {
  reset: () => void;
}) {
  return <DashboardError onRetry={reset} />;
}