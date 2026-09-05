import axiosInstance from "../axios";

export interface Category {
  id: string;
  category_name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export const getCategories = async (): Promise<CategoryResponse> => {
  const { data } = await axiosInstance.get<CategoryResponse>(
    "/categories"
  );

  return data;
};

export const createCategory = async (category_name: string): Promise<{ success: boolean; message: string; data: Category }> => {
  const { data } = await axiosInstance.post("/categories", { category_name });

  return data;
};

export const updateCategory = async (id: string, category_name: string): Promise<{ success: boolean; message: string; data: Category }> => {
  const { data } = await axiosInstance.put(`/categories/${id}`, { category_name });

  return data;
};

export const deleteCategory = async (id: string): Promise<{ success: boolean; message: string }> => {
  const { data } = await axiosInstance.delete(`/categories/${id}`);

  return data;
};