import { adminNavItems, providerNavItems, userNavItems } from "@/app/dashboard/_index";
import { UserRole } from "@/app/dashboard/DashboardSidebar";
import { DashboardNavItem } from "@/types/dashboard.type";

export function getNavItems(role?: UserRole): DashboardNavItem[] {
  switch (role) {
    case "admin":
      return adminNavItems;

    case "provider":
      return providerNavItems;

    case "user":
      return userNavItems;

    default:
      return [];
  }
}
