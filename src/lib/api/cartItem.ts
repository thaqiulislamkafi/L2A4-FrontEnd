import axiosInstance from "../axios";

interface AddCartItemPayload {
  user_id: string;
  meal_id: string;
  quantity: number;
  price: number;
}

export const addCartItem = async (payload: AddCartItemPayload) => {
  const { data } = await axiosInstance.post("/cart-items", payload);
  return data;
};