import { HeroMeal, Meal, PublishedMealsResponse } from "@/types/meal.type";
import axiosInstance from "../axios";
import { MealDetailsResponse } from "@/types/meal.type";

export interface HeroMealResponse {
  success: boolean;
  message: string;
  data: HeroMeal;
}

export const getHeroMeal = async (): Promise<HeroMealResponse> => {
  const { data } = await axiosInstance.get<HeroMealResponse>(
    "/meals/hero-content"
  );

  return data;
};

interface GetMealsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getPublishedMeals = async ({
  page = 1,
  limit = 6,
  search = "",
}: GetMealsParams): Promise<PublishedMealsResponse> => {
  const { data } = await axiosInstance.get<PublishedMealsResponse>(
    `/meals/published?search=${search}`,
    {
      params: {
        page,
        limit,
      },
    }
  );

  return data;
};

export interface ProviderMealsListResponse {
  success: boolean;
  message: string;
  data: {
    data: Meal[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  };
}

export const getProviderMeals = async (
  providerId: string,
  { page = 1, limit = 10, search = "" }: GetMealsParams
): Promise<ProviderMealsListResponse["data"]> => {
  const { data } = await axiosInstance.get<ProviderMealsListResponse>(
    `/meals/provider/${providerId}`,
    {
      params: {
        page,
        limit,
        search,
      },
    }
  );

  return data.data;
};


export const getMealById = async (
  id: string
): Promise<MealDetailsResponse> => {

  const { data } = await axiosInstance.get<MealDetailsResponse>(
    `/meals/${id}`
  );

  return data;

};

export const deleteMeal = async (id: string) => {
  const { data } = await axiosInstance.delete(`/meals/${id}`);
  return data;
};

export interface UpdateMealPayload {
  name?: string;
  image?: string;
  description?: string;
  pricePerPiece?: number;
  totalPieces?: number;
  availablePieces?: number;
  availabilty_status?: string;
  isPublished?: boolean;
  isHeroContent?: boolean;
  isSliderContent?: boolean;
  cuisine_type?: string;
  dietry_type?: string;
  category?: string;
}

export const updateMeal = async (id: string, payload: UpdateMealPayload) => {
  const { data } = await axiosInstance.put(`/meals/${id}`, payload);
  return data;
};