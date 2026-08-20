import { useQuery } from "@tanstack/react-query";

import { getFaqs } from "@/lib/api/faqs";

export const useGetAllFaqs = (
  page: number = 1,
  limit: number = 5
) => {
  return useQuery({
    queryKey: ["faqs", page, limit],
    queryFn: () => getFaqs(page, limit),
  });
};