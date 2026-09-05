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

export const createDietryType = async (dietry_type_name: string) => {
  const { data } = await axiosInstance.post("/dietry-types", { dietry_type_name });
  return data;
};

export const updateDietryType = async (id: string, dietry_type_name: string) => {
  const { data } = await axiosInstance.put(`/dietry-types/${id}`, { dietry_type_name });
  return data;
};

export const deleteDietryType = async (id: string) => {
  const { data } = await axiosInstance.delete(`/dietry-types/${id}`);
  return data;
};
