import axiosInstance from "@/lib/axios";
import { FAQ, FAQResponse } from "@/types/faq.type";

export const getFaqs = async (
  page: number = 1,
  limit: number = 5
): Promise<FAQResponse> => {
  const { data } = await axiosInstance.get<FAQResponse>(
    `/faqs?page=${page}&limit=${limit}`
  );

  return data;
};

export interface CreateFAQPayload {
  question: string;
  answer: string;
  sortOrder: number;
  isPublished: boolean;
  category: string;
}

export interface CreateFAQResponse {
  success: boolean;
  message: string;
  data: FAQ;
}

export const createFaq = async (
  payload: CreateFAQPayload
): Promise<CreateFAQResponse> => {
  const { data } = await axiosInstance.post<CreateFAQResponse>(
    "/faqs",
    payload
  );

  return data;
};

export const updateFaq = async (
  id: string,
  payload: CreateFAQPayload
): Promise<CreateFAQResponse> => {
  const { data } = await axiosInstance.put<CreateFAQResponse>(
    `/faq/${id}`,
    payload
  );

  return data;
};