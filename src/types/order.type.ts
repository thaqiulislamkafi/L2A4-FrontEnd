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