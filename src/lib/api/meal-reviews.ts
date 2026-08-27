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

export interface UpdateMealReviewPayload {
  rating: number;
  comment: string;
}

export const updateMealReview = async (id: string, payload: UpdateMealReviewPayload) => {
  const { data } = await axiosInstance.put(`/reviews/${id}`, payload);
  return data;
};

export const deleteMealReview = async (id: string) => {
  const { data } = await axiosInstance.delete(`/reviews/${id}`);
  return data;
};
