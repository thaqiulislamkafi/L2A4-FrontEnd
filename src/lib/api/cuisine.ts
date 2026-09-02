import axiosInstance from "../axios";

export interface CuisineType {
  id: string;
  cuisine_type_name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CuisineTypeResponse {
  success: boolean;
  message: string;
  data: CuisineType[];
}

export const getCuisineTypes = async (): Promise<CuisineTypeResponse> => {
  const { data } = await axiosInstance.get<CuisineTypeResponse>("/cuisine-types");
  return data;
};
