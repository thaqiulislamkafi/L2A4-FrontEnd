"use client";

import { useQuery } from "@tanstack/react-query";
import { Geist } from "next/font/google";

import DashboardError from "@/app/dashboard/admin/error";
import DashboardLoading from "@/app/dashboard/admin/loading";
import { getProviderDashboard } from "@/lib/api/dashboard";
import { useAuthStore } from "@/store/auth.store";

import ProviderDashboardStatsGrid from "./(components)/ProviderDashboardStatsGrid";
import RecentOrdersTable from "./(components)/RecentOrdersTable";
import RecentReviewsTable from "./(components)/RecentReviewsTable";
import RecentMealsTable from "../admin/(components)/RecentMealsTable";

const geist = Geist({ subsets: ["latin"] });

export default function ProviderDashboardPage() {
  const providerId = useAuthStore((state) => state.user?.id);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["provider-dashboard", providerId],
    queryFn: () => {
      if (!providerId) {
        throw new Error("Provider account not found. Please sign in again.");
      }

      return getProviderDashboard(providerId);
    },
    enabled: !!providerId,
  });

  if (!providerId) {
    return (
      <DashboardError
        message="Provider account not found. Please sign in again."
      />
    );
  }

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError || !data) {
    return (
      <DashboardError
        message={error instanceof Error ? error.message : "Failed to load provider dashboard."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className={`${geist.className} flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-234`}>
      <ProviderDashboardStatsGrid
        totalMeals={data.totalMeals}
        totalOrders={data.totalOrders}
        totalReviews={data.totalReviews}
      />

      <RecentMealsTable meals={data.recentMeals} />

      <RecentOrdersTable orders={data.recentOrders} />

      <RecentReviewsTable reviews={data.recentReviews} />
    </div>
  );
}
