export interface DashboardStats {
  totalUsers: number;
  totalProviders: number;
  totalMeals: number;
  totalOrders: number;
  totalReviews: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  message: string;
  data: DashboardStats;
}