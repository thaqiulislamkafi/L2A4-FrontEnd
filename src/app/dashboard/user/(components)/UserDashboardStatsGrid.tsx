"use client";

import { ListOrdered, MessageSquareText, ShoppingCart, Star } from "lucide-react";

import DashboardStatCard from "@/app/dashboard/admin/(components)/DashboardStatCard";

interface UserDashboardStatsGridProps {
  totalOrders: number;
  totalOrderItems: number;
  totalReviews: number;
  totalGlobalReviews: number;
}

export default function UserDashboardStatsGrid({
  totalOrders,
  totalOrderItems,
  totalReviews,
  totalGlobalReviews,
}: UserDashboardStatsGridProps) {
  return (
    <section
      aria-label="User dashboard statistics"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <DashboardStatCard
        title="Total Orders"
        value={totalOrders}
        description="Orders placed by you"
        icon={ShoppingCart}
      />
      <DashboardStatCard
        title="Order Items"
        value={totalOrderItems}
        description="Meals purchased"
        icon={ListOrdered}
      />
      <DashboardStatCard
        title="Meal Reviews"
        value={totalReviews}
        description="Reviews for meals"
        icon={MessageSquareText}
      />
      <DashboardStatCard
        title="Global Reviews"
        value={totalGlobalReviews}
        description="Reviews about FoodHub"
        icon={Star}
      />
    </section>
  );
}
