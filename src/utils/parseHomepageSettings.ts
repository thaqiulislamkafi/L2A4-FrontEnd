import { AppSetting, HomepageSettings } from "@/types/app-settings";


export const parseHomepageSettings = (settings: AppSetting[]): HomepageSettings => {
    const result: HomepageSettings = {
        HomeHero: true,
        ShowMeals: true,
        HowFoodHubWorks: true,
        ShowReviews: true,
        HomeFaqSection: true,
        HomeStatistics: true,
    };

    for (const setting of settings) {
        if (setting.type !== "BOOLEAN") {
            continue;
        }

        const prefix = "homepage.";

        if (!setting.key.startsWith(prefix)) {
            continue;
        }

        const key = setting.key.slice(prefix.length).replace(".show", "") as keyof HomepageSettings;

        if (key in result) {
            result[key] = setting.value === "true";
        }
    }

    return result;
};