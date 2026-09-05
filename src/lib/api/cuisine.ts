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

export const createCuisineType = async (cuisine_type_name: string) => {
  const { data } = await axiosInstance.post("/cuisine-types", { cuisine_type_name });
  return data;
};

export const updateCuisineType = async (id: string, cuisine_type_name: string) => {
  const { data } = await axiosInstance.put(`/cuisine-types/${id}`, { cuisine_type_name });
  return data;
};

export const deleteCuisineType = async (id: string) => {
  const { data } = await axiosInstance.delete(`/cuisine-types/${id}`);
  return data;
};
