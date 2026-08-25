"use client";

import { getAdminDashboard } from "@/lib/api/dashboard";
import { useQuery } from "@tanstack/react-query";
import DashboardStatsGrid from "./(components)/DashboardStatsGrid";
import RecentUsersTable from "./(components)/RecentUsersTable";
import { Geist } from "next/font/google";
import RecentMealsTable from "./(components)/RecentMealsTable";
import RecentOrdersTable from "./(components)/RecentOrdersTable";
import DashboardLoading from "./loading";
import DashboardError from "./error";

const geist = Geist({ subsets: ["latin"] });

export default function AdminDashboardPage() {
  const {data,isLoading,isError,error, refetch} = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboard,
  });

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError || !data) {
    return (
      <DashboardError
        message={
          error instanceof Error
            ? error.message
            : "Failed to load admin dashboard."
        }
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className={`${geist.className} flex flex-1 flex-col gap-6 p-4 md:p-6`}>

      {/* Statistics */}
      <DashboardStatsGrid
        totalUsers={data.tottalUsers}
        totalProviders={data.totalProviders}
        totalMeals={data.totalMeals}
        totalReviews={data.totalReviews}
        totalGlobalReviews={data.totalGlobalReviews}
        totalOrders={data.totalOrders}
      />

      <RecentUsersTable users={data.recentUsers} />

      <RecentMealsTable meals={data.recentMeals} />

      <RecentOrdersTable orders={data.recentOrders} />
    </div>
  );
}