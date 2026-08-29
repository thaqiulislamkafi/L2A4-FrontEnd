import {
  AdminDashboardData,
  AdminDashboardResponse,
  ProviderDashboardData,
  ProviderDashboardResponse,
} from "@/types/dashboard.type";
import axiosInstance from "../axios";

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const response = await axiosInstance.get<AdminDashboardResponse>(
    "/dashboard/admin"
  );

  return response.data.data;
}

export async function getProviderDashboard(
  providerId: string
): Promise<ProviderDashboardData> {
  const response = await axiosInstance.get<ProviderDashboardResponse>(
    `/dashboard/provider/${providerId}`
  );

  return response.data.data;
}