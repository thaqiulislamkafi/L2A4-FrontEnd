export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export interface FAQMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface FAQResponse {
  success: boolean;
  message: string;
  data: FAQ[];
  meta: FAQMeta;
}