
import { CartItemsResponse } from "@/types/cart.type";
import axiosInstance from "../axios";


export const getCartItemsByUserId = async (userId: string): Promise<CartItemsResponse> => {
  const response = await axiosInstance.get<CartItemsResponse>(`/cart-items/user/${userId}`, {
    withCredentials: true,
  });

  return response.data;
};