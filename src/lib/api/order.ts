import axiosInstance from "@/lib/axios";
import {  OrdersResponse, GetOrdersParams, UpdateOrderStatusPayload, OrderDetailsResponse } from "@/types/order.type";

export const getOrders = async ({
  page = 1,
  limit = 6,
  search = "",
}: GetOrdersParams = {}) => {
  const { data } = await axiosInstance.get<OrdersResponse>("/orders", {
    params: {
      page,
      limit,
      ...(search.trim() ? { search: search.trim() } : {}),
    },
  });

  return data;
};

export const getOrderById = async (id: string): Promise<OrderDetailsResponse> => {
  const response = await axiosInstance.get<OrderDetailsResponse>(`/orders/${id}`);

  return response.data;
};

export const updateOrderStatus = async (
  orderId: string,
  payload: UpdateOrderStatusPayload
) => {
  const { data } = await axiosInstance.put(
    `/orders/${orderId}`,
    payload
  );

  return data;
};