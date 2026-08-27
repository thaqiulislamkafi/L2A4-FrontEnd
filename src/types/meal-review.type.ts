export interface MealReviewUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface MealReviewMeal {
  id: string;
  name: string;
  image: string | null;
  description: string;
  pricePerPiece: number;
}

export interface MealReview {
  id: string;
  meal_id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: MealReviewUser | null;
  meal: MealReviewMeal | null;
}

export interface MealReviewResponse {
  success: boolean;
  message: string;
  data: MealReview[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
