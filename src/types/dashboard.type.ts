export interface DashboardNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  contact: string;
  age: number | null;
  address: string | null;
  role: "admin" | "provider" | "user";
  status: string;
}

export interface AdminMeal {
  id: string;
  name: string;
  image: string;
  description: string;
  cuisine_type: string;
  dietry_type: string;
  category: string;
  availabilty_status: string;
  pricePerPiece: number;
  totalPieces: number;
  availablePieces: number;
  isPublished: boolean;
  isHeroContent: boolean;
  isSliderContent: boolean;
  provider_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrder {
  id: string;
  user_id: string;
  total_price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminDashboardData {
  tottalUsers: number;
  totalProviders: number;
  totalMeals: number;
  totalReviews: number;
  totalGlobalReviews: number;
  totalOrders: number;

  recentUsers: AdminUser[];
  recentMeals: AdminMeal[];
  recentOrders: AdminOrder[];
}

export interface AdminDashboardResponse {
  success: boolean;
  message: string;
  data: AdminDashboardData;
}