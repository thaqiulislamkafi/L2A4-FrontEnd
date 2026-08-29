import { AuthUser, GetUserResponse, User } from "@/types/auth.type";
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

export interface AuthUserResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export interface UpdateUserPayload {
  name: string;
  image: string;
  contact: string;
  age: number | null;
  address: string;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export const getUsers = async ({ page = 1, limit = 10, search = "" }: GetUsersParams): Promise<UsersResponse> => {
  const { data } = await axiosInstance.get<UsersResponse>("/auth", { params: { page, limit, search } });

  return data;
};


export const updateUser = async (id: string, payload: UpdateUserPayload): Promise<UpdateUserResponse> => {
  const { data } = await axiosInstance.put<UpdateUserResponse>(`/auth/${id}`, payload);

  return data;
};

export const deleteUser = async (id: string): Promise<AuthUserResponse> => {
  const { data } = await axiosInstance.delete<AuthUserResponse>(`/auth/${id}`);

  return data;
};


export interface ChangePasswordPayload {
  password: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  data: User;
}

export const getUser = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<GetUserResponse>(`/auth/${id}`);

  return response.data.data;
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.post<ChangePasswordResponse>("/auth/change-password", payload);

  return response.data;
};