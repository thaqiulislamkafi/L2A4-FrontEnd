export interface GlobalReviewUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  contact: string;
  age: number;
  address: string;
  role: string;
  status: string;
}

export interface GlobalReview {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: GlobalReviewUser | null;
}

export interface GlobalReviewResponse {
  success: boolean;
  message: string;
  data: GlobalReview[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}