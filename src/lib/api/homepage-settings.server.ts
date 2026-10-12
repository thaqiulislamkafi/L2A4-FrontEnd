import "server-only";

export interface AppSetting {
    id: string;
    key: string;
    value: string;
    type: "BOOLEAN" | "STRING" | "NUMBER";
    createdAt: string;
    updatedAt: string;
}

interface AppSettingsResponse {
    success: boolean;
    message: string;
    data: AppSetting[];
}

export async function getHomepageSettingsServer(): Promise<AppSetting[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error("API_BASE_URL is not configured");
    }

    const response = await fetch(`${baseUrl}/app-settings/key/homepage`, {
        next: {
            revalidate: 300,
            tags: ["homepage-settings"],
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch homepage settings: ${response.status}`);
    }

    const result = (await response.json()) as AppSettingsResponse;

    if (!result.success) {
        throw new Error(result.message || "Unable to retrieve homepage settings");
    }

    return result.data;
}