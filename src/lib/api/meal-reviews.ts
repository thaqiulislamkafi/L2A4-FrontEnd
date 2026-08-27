import axiosInstance from "@/lib/axios";
import { MealReviewResponse } from "@/types/meal-review.type";

interface GetMealReviewsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getMealReviews = async ({
  page = 1,
  limit = 6,
  search = "",
}: GetMealReviewsParams = {}) => {
  const { data } = await axiosInstance.get<MealReviewResponse>("/reviews", {
    params: { page, limit, search: search || undefined },
  });

  return data;
};
