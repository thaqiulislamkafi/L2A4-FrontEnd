import { HeroMeal } from "@/types/meal";
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