export interface UserReview {
  id: string;
  meal_id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserReviewsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UserReviewsResponse {
  success: boolean;
  message: string;
  data: UserReview[];
  meta: UserReviewsMeta;
}
