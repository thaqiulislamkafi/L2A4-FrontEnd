export type OrderStatus =
  | "PENDING"
  | "APPROVED"
  | "PROCESSING"
  | "COMPLETED"
  | "DELIVERED"
  | "CANCELLED"
  | "DECLINED";

export interface Order {
  id: string;
  user_id: string;
  total_price: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
  meta: OrdersMeta;
}

export interface GetOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}

export interface OrderMealCategory {
  id: string;
  category_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderMeal {
  id: string;
  name: string;
  image: string;
  category_rel?: OrderMealCategory;
  pricePerPiece?: number;
}

export interface OrderItem {
  id: string;
  order_id: string;
  meal_id: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  meal: OrderMeal;
}

export interface OrderUser {
  id: string;
  name: string;
  image: string;
  email: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_price: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  orderItems?: OrderItem[];
  user?: OrderUser;
}

export interface OrdersMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
  meta: OrdersMeta;
}

export interface OrderDetailsResponse {
  success: boolean;
  message: string;
  data: Order;
}

export interface GetOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus;
}

export interface OrderItemsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface OrderItemsResponse {
  success: boolean;
  message: string;
  data: OrderItem[];
  meta: OrderItemsMeta;
}

export interface GetOrderItemsParams {
  page?: number;
  limit?: number;
  search?: string;

}

export interface ProviderOrderItemsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UserOrderItemsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UserOrderItemsResponse {
  success: boolean;
  message: string;
  data: OrderItem[];
  meta: UserOrderItemsMeta;
}

export interface ProviderOrderItemsResponse {
  success: boolean;
  message: string;
  data: {
    data: OrderItem[];
    meta: ProviderOrderItemsMeta;
  };
}

export interface GetProviderOrderItemsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetUserOrderItemsParams {
  page?: number;
  limit?: number;
  search?: string;
}