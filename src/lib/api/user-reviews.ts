import axiosInstance from "@/lib/axios";
import { UserReviewsResponse } from "@/types/user-review.type";

interface GetUserReviewsParams {
  page?: number;
  limit?: number;
}

export const getUserReviews = async (
  userId: string,
  { page = 1, limit = 3 }: GetUserReviewsParams = {}
) => {
  const { data } = await axiosInstance.get<UserReviewsResponse>(`/reviews/user/${userId}`, {
    params: {
      page,
      limit,
    },
  });

  return data;
};

export interface UpdateUserReviewPayload {
  rating: number;
  comment: string;
}

export const updateUserReview = async (id: string, payload: UpdateUserReviewPayload) => {
  const { data } = await axiosInstance.put(`/reviews/${id}`, payload);

  return data;
};

export const deleteUserReview = async (id: string) => {
  const { data } = await axiosInstance.delete(`/reviews/${id}`);

  return data;
};
