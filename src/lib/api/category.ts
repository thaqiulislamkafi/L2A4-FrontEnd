import axiosInstance from "../axios";

interface Category {
  id: string;
  category_name: string;
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