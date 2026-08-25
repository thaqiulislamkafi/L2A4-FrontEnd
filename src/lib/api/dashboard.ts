import { AdminDashboardData, AdminDashboardResponse } from "@/types/dashboard.type";
import axiosInstance from "../axios";

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const response = await axiosInstance.get<AdminDashboardResponse>(
    "/dashboard/admin"
  );

  return response.data.data;
}