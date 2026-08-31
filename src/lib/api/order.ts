import axiosInstance from "@/lib/axios";
import {
  OrdersResponse,
  GetOrdersParams,
  UpdateOrderStatusPayload,
  OrderDetailsResponse,
  OrderItemsResponse,
  GetOrderItemsParams,
  ProviderOrderItemsResponse,
  UserOrderItemsResponse,
} from "@/types/order.type";

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

export const getUserOrders = async (
  userId: string,
  { page = 1, limit = 3, search = "" }: GetOrdersParams = {}
) => {
  const { data } = await axiosInstance.get<OrdersResponse>(`/orders/user/${userId}`, {
    params: {
      page,
      limit,
      ...(search.trim() ? { search: search.trim() } : {}),
    },
  });

  return data;
};

export const getOrderItems = async ({
  page = 1,
  limit = 3,
  search = "",
}: GetOrderItemsParams = {}) => {
  const { data } = await axiosInstance.get<OrderItemsResponse>("/order-items", {
    params: {
      page,
      limit,
      ...(search.trim() ? { search: search.trim() } : {}),
    },
  });

  return data;
};

export const getUserOrderItems = async (
  userId: string,
  { page = 1, limit = 3, search = "" }: GetOrderItemsParams = {}
) => {
  const { data } = await axiosInstance.get<UserOrderItemsResponse>(
    `/order-items/user/${userId}`,
    {
      params: {
        page,
        limit,
        ...(search.trim() ? { search: search.trim() } : {}),
      },
    }
  );

  return data;
};

export const getProviderOrderItems = async (
  providerId: string,
  { page = 1, limit = 3, search = "" }: GetOrderItemsParams = {}
) => {
  const { data } = await axiosInstance.get<ProviderOrderItemsResponse>(
    `/order-items/provider/${providerId}`,
    {
      params: {
        page,
        limit,
        ...(search.trim() ? { search: search.trim() } : {}),
      },
    }
  );

  return data.data;
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