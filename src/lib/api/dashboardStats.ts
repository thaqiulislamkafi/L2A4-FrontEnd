import axiosInstance from "@/lib/axios";
import { DashboardStatsResponse } from "@/types/dashboardStats.type";

export const getDashboardStats =
  async (): Promise<DashboardStatsResponse> => {
    const { data } = await axiosInstance.get<DashboardStatsResponse>(
      "/dashboard-stats/stats"
    );

    return data;
  };