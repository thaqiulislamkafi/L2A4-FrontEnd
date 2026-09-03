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

export interface ProviderRecentMeal {
  id: string;
  name: string;
  image: string | null;
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

export interface ProviderRecentOrder {
  id: string;
  order_id: string;
  meal_id: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderRecentReview {
  id: string;
  meal_id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderDashboardData {
  totalMeals: number;
  totalOrders: number;
  totalReviews: number;
  recentMeals: ProviderRecentMeal[];
  recentOrders: ProviderRecentOrder[];
  recentReviews: ProviderRecentReview[];
}

export interface AdminDashboardResponse {
  success: boolean;
  message: string;
  data: AdminDashboardData;
}

export interface ProviderDashboardResponse {
  success: boolean;
  message: string;
  data: ProviderDashboardData;
}

export interface UserRecentOrder {
  id: string;
  user_id: string;
  total_price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecentReview {
  id: string;
  meal_id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecentGlobalReview {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDashboardData {
  totalOrders: number;
  totalOrderItems: number;
  totalReviews: number;
  totalGlobalReviews: number;
  recentOrders: UserRecentOrder[];
  recentReviews: UserRecentReview[];
  recentGlobalReviews: UserRecentGlobalReview[];
}

export interface UserDashboardResponse {
  success: boolean;
  message: string;
  data: UserDashboardData;
}