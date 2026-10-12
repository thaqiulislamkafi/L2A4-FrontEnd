import "server-only";

import type { HeroMeal, PublishedMealsResponse } from "@/types/meal.type";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

async function fetchPublicApi<T>(path: string): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error("API_BASE_URL is not configured");
    }

    const response = await fetch(`${baseUrl}${path}`, {
        next: {
            revalidate: 300,
            tags: ["homepage-meals"],
        },
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    const result = (await response.json()) as ApiResponse<T>;

    if (!result.success) {
        throw new Error(result.message || "Failed to fetch public meal data");
    }

    return result.data;
}

export function getHeroMealServer(): Promise<HeroMeal> {
    return fetchPublicApi<HeroMeal>("/meals/hero-content");
}

export function getPublishedMealsServer(page = 1, limit = 6): Promise<PublishedMealsResponse["data"]> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });

    return fetchPublicApi<PublishedMealsResponse["data"]>(`/meals/published?${params.toString()}`);
}