import { UserRole } from "@/app/dashboard/DashboardSidebar";

export function getRoleLabel(role?: UserRole) {
  switch (role) {
    case "admin":
      return "Administrator";

    case "provider":
      return "Provider";

    case "user":
      return "User";

    default:
      return "";
  }
}