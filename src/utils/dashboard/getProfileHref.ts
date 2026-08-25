export function getProfileHref(role?: string) {
  switch (role) {
    case "admin":
      return "/dashboard/admin/profile";

    case "provider":
      return "/dashboard/provider/profile";

    case "user":
      return "/dashboard/user/profile";

    default:
      return "/dashboard";
  }
}
