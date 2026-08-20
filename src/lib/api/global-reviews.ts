import axiosInstance from "@/lib/axios";
import { GlobalReviewResponse } from "@/types/global-review.type";

interface GetGlobalReviewsParams {
  page?: number;
  limit?: number;
}

export const getGlobalReviews = async ({
  page = 1,
  limit = 6,
}: GetGlobalReviewsParams = {}) => {
  const { data } = await axiosInstance.get<GlobalReviewResponse>(
    "/global-reviews",
    {
      params: {
        page,
        limit,
      },
    }
  );

  return data;
};