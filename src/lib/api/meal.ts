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
}

export const getPublishedMeals = async ({
  page = 1,
  limit = 6,
}: GetMealsParams): Promise<PublishedMealsResponse> => {
  const { data } = await axiosInstance.get<PublishedMealsResponse>(
    "/meals/published",
    {
      params: {
        page,
        limit,
      },
    }
  );

  return data;
};