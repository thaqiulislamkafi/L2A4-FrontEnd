import axiosInstance from "@/lib/axios";
import {  OrdersResponse, GetOrdersParams, UpdateOrderStatusPayload } from "@/types/order.type";

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

export const updateOrderStatus = async (
  orderId: string,
  payload: UpdateOrderStatusPayload
) => {
  const { data } = await axiosInstance.put(
    `/orders/${orderId}/status`,
    payload
  );

  return data;
};