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
