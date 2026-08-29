import axiosInstance from "@/lib/axios";
import { FAQResponse } from "@/types/faq.type";

export const getFaqs = async (
  page: number = 1,
  limit: number = 5
): Promise<FAQResponse> => {
  const { data } = await axiosInstance.get<FAQResponse>(
    `/faqs?page=${page}&limit=${limit}`
  );

  return data;
};