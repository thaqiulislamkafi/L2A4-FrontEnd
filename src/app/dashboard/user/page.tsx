"use client";

import { useQuery } from "@tanstack/react-query";
import { Geist } from "next/font/google";

import DashboardError from "@/app/dashboard/admin/error";
import DashboardLoading from "@/app/dashboard/admin/loading";
import { getUserDashboard } from "@/lib/api/dashboard";
import { useAuthStore } from "@/store/auth.store";

import RecentOrdersTable from "./(components)/RecentOrdersTable";
import RecentReviewsTable from "./(components)/RecentReviewsTable";
import UserDashboardStatsGrid from "./(components)/UserDashboardStatsGrid";

const geist = Geist({ subsets: ["latin"] });

export default function UserDashboardPage() {
  const userId = useAuthStore((state) => state.user?.id);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["user-dashboard", userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("User account not found. Please sign in again.");
      }

      return getUserDashboard(userId);
    },
    enabled: !!userId,
  });

  if (!userId) {
    return <DashboardError message="User account not found. Please sign in again." />;
  }

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError || !data) {
    return (
      <DashboardError
        message={error instanceof Error ? error.message : "Failed to load user dashboard."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className={`${geist.className} flex max-w-234 flex-1 flex-col gap-6 p-4 md:p-6`}>
      <UserDashboardStatsGrid
        totalOrders={data.totalOrders}
        totalOrderItems={data.totalOrderItems}
        totalReviews={data.totalReviews}
        totalGlobalReviews={data.totalGlobalReviews}
      />
      <RecentOrdersTable orders={data.recentOrders} />
      <RecentReviewsTable reviews={data.recentReviews} />
      <RecentReviewsTable reviews={data.recentGlobalReviews} global />
    </div>
  );
}