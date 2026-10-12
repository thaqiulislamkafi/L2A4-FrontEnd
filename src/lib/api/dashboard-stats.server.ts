import "server-only";

export interface HomepageStats {
    totalUsers: number;
    totalMeals: number;
    totalOrders: number;
    totalReviews: number;
}

interface DashboardStatsResponse {
    success: boolean;
    message: string;
    data: HomepageStats;
}

export async function getDashboardStatsServer(): Promise<HomepageStats> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
    }

    const response = await fetch(`${baseUrl}/dashboard-stats/stats`, {
        next: {
            revalidate: 300,
            tags: ["homepage-statistics"],
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch dashboard statistics: ${response.status}`);
    }

    const result = (await response.json()) as DashboardStatsResponse;

    if (!result.success) {
        throw new Error(result.message || "Failed to fetch dashboard statistics");
    }

    return result.data;
}