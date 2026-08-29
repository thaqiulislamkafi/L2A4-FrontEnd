"use client";

import {CircleDollarSign,MessageSquareText,ShoppingCart,Star,Users,UtensilsCrossed,} from "lucide-react";
import DashboardStatCard from "./DashboardStatCard";

interface DashboardStatsGridProps {
  totalUsers: number;
  totalProviders: number;
  totalMeals: number;
  totalReviews: number;
  totalGlobalReviews: number;
  totalOrders: number;
}

export default function DashboardStatsGrid({
  totalUsers,
  totalProviders,
  totalMeals,
  totalReviews,
  totalGlobalReviews,
  totalOrders,
}: DashboardStatsGridProps) {
  return (
    <section
      aria-label="Dashboard statistics"
      className="grid gap-4 grid-cols-2 lg:grid-cols-4"
    >
      {/* Total Users */}
      <DashboardStatCard
        title="Total Users"
        value={totalUsers}
        description="Registered users"
        icon={Users}
      />

      {/* Total Providers */}
      <DashboardStatCard
        title="Total Providers"
        value={totalProviders}
        description="Registered meal providers"
        icon={CircleDollarSign}
      />

      {/* Total Meals */}
      <DashboardStatCard
        title="Total Meals"
        value={totalMeals}
        description="Meals available on FoodHub"
        icon={UtensilsCrossed}
      />

      {/* Total Reviews */}
      <DashboardStatCard
        title="Total Reviews"
        value={totalReviews}
        description="Meal reviews"
        icon={MessageSquareText}
      />

      {/* Total Global Reviews */}
      <DashboardStatCard
        title="Global Reviews"
        value={totalGlobalReviews}
        description="Platform-wide reviews"
        icon={Star}
      />

      {/* Total Orders */}
      <DashboardStatCard
        title="Total Orders"
        value={totalOrders}
        description="Customer orders"
        icon={ShoppingCart}
      />
    </section>
  );
}