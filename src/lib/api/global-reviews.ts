import axiosInstance from "@/lib/axios";
import { GlobalReviewResponse } from "@/types/global-review.type";

interface GetGlobalReviewsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getGlobalReviews = async ({
  page = 1,
  limit = 6,
  search = "",
}: GetGlobalReviewsParams = {}) => {
  const { data } = await axiosInstance.get<GlobalReviewResponse>(
    `/global-reviews?${search}`,
    {
      params: {
        page,
        limit,
      },
    }
  );

  return data;
};

export interface CreateGlobalReviewPayload {
  user_id: string;
  rating: number;
  comment: string;
}

export interface UpdateGlobalReviewPayload {
  rating: number;
  comment: string;
}

export const createGlobalReview = async (
  payload: CreateGlobalReviewPayload
) => {
  const { data } = await axiosInstance.post("/global-reviews", payload);

  return data;
};

export const updateGlobalReview = async (
  id: string,
  payload: UpdateGlobalReviewPayload
) => {
  const { data } = await axiosInstance.put(`/global-reviews/${id}`, payload);

  return data;
};

export const deleteGlobalReview = async (id: string) => {
  const { data } = await axiosInstance.delete(`/global-reviews/${id}`);

  return data;
};