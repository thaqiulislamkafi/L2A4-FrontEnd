"use client";

import { MessageSquareText, ShoppingCart, UtensilsCrossed } from "lucide-react";

import DashboardStatCard from "@/app/dashboard/admin/(components)/DashboardStatCard";

interface ProviderDashboardStatsGridProps {
  totalMeals: number;
  totalOrders: number;
  totalReviews: number;
}

export default function ProviderDashboardStatsGrid({
  totalMeals,
  totalOrders,
  totalReviews,
}: ProviderDashboardStatsGridProps) {
  return (
    <section
      aria-label="Provider dashboard statistics"
      className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
    >
      <DashboardStatCard
        title="Total Meals"
        value={totalMeals}
        description="Meals listed by you"
        icon={UtensilsCrossed}
      />

      <DashboardStatCard
        title="Total Orders"
        value={totalOrders}
        description="Orders received"
        icon={ShoppingCart}
      />

      <DashboardStatCard
        title="Total Reviews"
        value={totalReviews}
        description="Latest customer feedback"
        icon={MessageSquareText}
      />
    </section>
  );
}
