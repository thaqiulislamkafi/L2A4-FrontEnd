export interface MealAnalytics {
  id: string;
  mealId: string;
  providerId: string;
  totalReviews: number;
  totalOrders: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface HeroMeal {
  id: string;
  name: string;
  image: string | null;
  description: string;
  cuisine_type: string;
  dietry_type: string;
  category: string;
  availabilty_status: string;
  pricePerPiece: number;
  totalPieces: number;
  availablePieces: number;
  isPublished: boolean;
  isHeroContent: boolean;
  isSliderContent: boolean;
  provider_id: string;
  createdAt: string;
  updatedAt: string;
  mealAnalytics: MealAnalytics[];
}

export interface Meal {
  id: string;
  name: string;
  image: string;
  description: string;

  cuisine_type: string;
  dietry_type: string;
  category: string;

  availabilty_status: string;

  pricePerPiece: number;
  totalPieces: number;
  availablePieces: number;

  isPublished: boolean;
  isHeroContent: boolean;
  isSliderContent: boolean;

  provider_id: string;

  createdAt: string;
  updatedAt: string;

  cuisine_rel: {
    id: string;
    cuisine_type_name: string;
    createdAt: string;
    updatedAt: string;
  };

  category_rel: {
    id: string;
    category_name: string;
    createdAt: string;
    updatedAt: string;
  };

  dietry_rel: {
    id: string;
    dietry_type_name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface PublishedMealsResponse {
  success: boolean;
  message: string;
  data: Meal[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface MealReview {
  id: string;
  meal_id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface MealAnalytics {
  id: string;
  mealId: string;
  providerId: string;
  totalReviews: number;
  totalOrders: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface MealProvider {
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

export interface MealRelation {
  id: string;
  cuisine_type_name?: string;
  category_name?: string;
  dietry_type_name?: string;
}

export interface MealDetailsType {
  id: string;
  name: string;
  image: string;
  description: string;

  cuisine_type: string;
  dietry_type: string;
  category: string;

  availabilty_status: string;

  pricePerPiece: number;
  totalPieces: number;
  availablePieces: number;

  isPublished: boolean;
  isHeroContent: boolean;
  isSliderContent: boolean;

  provider_id: string;

  createdAt: string;
  updatedAt: string;

  provider: MealProvider;

  reviews: MealReview[];

  mealAnalytics: MealAnalytics[];

  dietry_rel: MealRelation;
  cuisine_rel: MealRelation;
  category_rel: MealRelation;
}

export interface MealDetailsResponse {
  success: boolean;
  message: string;
  data: MealDetailsType;
}