import { DashboardNavItem } from "@/types/dashboard.type";
import { ChefHat, LayoutDashboard, ListOrdered, MessageSquareText, Settings, ShoppingCart, Star, UserCircle, Users, UtensilsCrossed, Wallet } from "lucide-react";
import { PageInfo } from "./DashboardHeader";


export const adminNavItems: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "All Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "All Meals",
    href: "/dashboard/admin/meals",
    icon: UtensilsCrossed,
  },
  {
    title: "All Reviews",
    href: "/dashboard/admin/reviews",
    icon: Star,
  },
  {
    title: "All Meal Reviews",
    href: "/dashboard/admin/meal-reviews",
    icon: MessageSquareText,
  },
  {
    title: "All Orders",
    href: "/dashboard/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "All Order Items",
    href: "/dashboard/admin/order-items",
    icon: ListOrdered,
  },
  {
    title: "App Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
  {
    title: "My Profile",
    href: "/dashboard/admin/profile",
    icon: UserCircle,
  },
];


export const providerNavItems: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/provider",
    icon: LayoutDashboard,
  },
  {
    title: "My Meals",
    href: "/dashboard/provider/meals",
    icon: ChefHat,
  },
  {
    title: "My Orders",
    href: "/dashboard/provider/orders",
    icon: ShoppingCart,
  },
  {
    title: "My Order Items",
    href: "/dashboard/provider/order-items",
    icon: ListOrdered,
  },
  {
    title: "My Revenues",
    href: "/dashboard/provider/revenues",
    icon: Wallet,
  },
  {
    title: "My Profile",
    href: "/dashboard/provider/profile",
    icon: UserCircle,
  },
];


export const userNavItems: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    title: "My Orders",
    href: "/dashboard/user/orders",
    icon: ShoppingCart,
  },
  {
    title: "My Order Items",
    href: "/dashboard/user/order-items",
    icon: ListOrdered,
  },
  {
    title: "My Reviews",
    href: "/dashboard/user/reviews",
    icon: Star,
  },
  {
    title: "My Profile",
    href: "/dashboard/user/profile",
    icon: UserCircle,
  },
];



export const pageMap: Record<string, PageInfo> = {

  "/dashboard/admin": {
    title: "Dashboard",
    description: "Overview of your FoodHub application.",
  },

  "/dashboard/admin/users": {
    title: "All Users",
    description: "Manage all users of the platform.",
  },

  "/dashboard/admin/meals": {
    title: "All Meals",
    description: "Manage all meals available on FoodHub.",
  },

  "/dashboard/admin/reviews": {
    title: "All Reviews",
    description: "Manage platform reviews.",
  },

  "/dashboard/admin/meal-reviews": {
    title: "All Meal Reviews",
    description: "Manage reviews submitted for meals.",
  },

  "/dashboard/admin/orders": {
    title: "All Orders",
    description: "Manage all customer orders.",
  },

  "/dashboard/admin/order-items": {
    title: "All Order Items",
    description: "View all items included in customer orders.",
  },

  "/dashboard/admin/settings": {
    title: "App Settings",
    description: "Manage application settings.",
  },

  "/dashboard/admin/profile": {
    title: "My Profile",
    description: "Manage your profile information.",
  },

  "/dashboard/provider": {
    title: "Dashboard",
    description: "Overview of your provider account.",
  },

  "/dashboard/provider/meals": {
    title: "My Meals",
    description: "Manage the meals you provide.",
  },

  "/dashboard/provider/orders": {
    title: "My Orders",
    description: "View orders containing your meals.",
  },

  "/dashboard/provider/order-items": {
    title: "My Order Items",
    description: "View your meal order items.",
  },

  "/dashboard/provider/revenues": {
    title: "My Revenues",
    description: "Track your earnings and revenues.",
  },

  "/dashboard/provider/profile": {
    title: "My Profile",
    description: "Manage your profile information.",
  },


  "/dashboard/user": {
    title: "Dashboard",
    description: "Overview of your FoodHub account.",
  },

  "/dashboard/user/orders": {
    title: "My Orders",
    description: "View your order history.",
  },

  "/dashboard/user/order-items": {
    title: "My Order Items",
    description: "View items from your orders.",
  },

  "/dashboard/user/reviews": {
    title: "My Reviews",
    description: "Manage your submitted reviews.",
  },

  "/dashboard/user/profile": {
    title: "My Profile",
    description: "Manage your profile information.",
  },
};