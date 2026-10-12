import "server-only";

import type { FAQ } from "@/types/faq.type";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

async function fetchHomepageData<T>(path: string): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
    }

    const response = await fetch(`${baseUrl}${path}`, {
        next: {
            revalidate: 300,
            tags: ["homepage-reviews", "homepage-faqs"],
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }

    const result = (await response.json()) as ApiResponse<T>;

    if (!result.success) {
        throw new Error(result.message || `Failed to fetch ${path}`);
    }

    return result.data;
}

export function getHomepageFaqsServer(): Promise<FAQ[]> {
    return fetchHomepageData<FAQ[]>("/faqs?page=1&limit=6");
}