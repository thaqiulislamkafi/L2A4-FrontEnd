import { HeroMeal, PublishedMealsResponse } from "@/types/meal.type";
import axiosInstance from "../axios";

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
  search ?: string;
}

export const getPublishedMeals = async ({
  page = 1,
  limit = 6,
  search=''
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