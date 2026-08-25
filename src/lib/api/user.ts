import { AuthUser } from "@/types/auth.type";
import axiosInstance from "../axios";

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: AuthUser[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const getUsers = async ({ page = 1, limit = 10, search = "" }: GetUsersParams): Promise<UsersResponse> => {
  const { data } = await axiosInstance.get<UsersResponse>("/auth", { params: { page, limit, search } });

  return data;
};