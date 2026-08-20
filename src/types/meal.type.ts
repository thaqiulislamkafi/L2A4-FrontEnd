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