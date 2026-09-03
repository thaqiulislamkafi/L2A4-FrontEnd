import axiosInstance from "../axios";

export interface DietryType {
  id: string;
  dietry_type_name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DietryTypeResponse {
  success: boolean;
  message: string;
  data: DietryType[];
}

export const getDietryTypes = async (): Promise<DietryTypeResponse> => {
  const { data } = await axiosInstance.get<DietryTypeResponse>("/dietry-types");
  return data;
};
