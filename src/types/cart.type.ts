export interface CartItem {
  id: string;
  cart_id: string;
  user_id: string;
  meal_id: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItemsResponse {
  success: boolean;
  message: string;
  data: CartItem[];
}