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

export interface VerifyEmailOtpUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  contact: string;
  age: number;
  address: string;
  role: "user" | "provider" | "admin";
  status: string;
}

export interface VerifyEmailOtpResponse {
  success: boolean;
  message: string;
  data: {
    status: boolean;
    token: string | null;
    user: VerifyEmailOtpUser;
  };
}