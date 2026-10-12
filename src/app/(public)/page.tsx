import HomeFaqSection from '@/components/HomeFaqSection';
import HomeHero from '@/components/HomeHero';
import HomeStatistics from '@/components/HomeStatistics';
import HowFoodHubWorks from '@/components/HowFoodHubWorks';
import ShowMeals from '@/components/ShowMeals';
import ShowReviews from '@/components/ShowReviews';
import { getDashboardStatsServer } from '@/lib/api/dashboard-stats.server';
import { getHomepageFaqsServer } from '@/lib/api/faqs.server';
import { getHomepageSettingsServer } from '@/lib/api/homepage-settings.server';
import { getHeroMealServer, getPublishedMealsServer } from '@/lib/api/meal.server';
import { getGlobalReviewsServer } from '@/lib/api/user-reviews.server';
import { parseHomepageSettings } from '@/utils/parseHomepageSettings';

import { Geist } from 'next/font/google';
import React from 'react';

const geist = Geist({ subsets: ["latin"] });

const page = async () => {

    const settingsResponse = await getHomepageSettingsServer();
    const settings = parseHomepageSettings(settingsResponse);

    const [heroMeal, publishedMeals, globalReviews, homepageFaqs, dashboardStats] = await Promise.all([
        settings.HomeHero ? getHeroMealServer().catch(() => null) : Promise.resolve(null),
        settings.ShowMeals ? getPublishedMealsServer(1, 6).catch(() => null) : Promise.resolve(null),
        settings.ShowReviews ? getGlobalReviewsServer().catch(() => []) : Promise.resolve([]),
        settings.HomeFaqSection ? getHomepageFaqsServer().catch(() => []) : Promise.resolve([]),
        settings.HomeStatistics ? getDashboardStatsServer().catch(() => null) : Promise.resolve(null),
    ]);

    return (
        <div className={geist.className}>

            <div className={geist.className}>
                {settings.HomeHero && <HomeHero meal={heroMeal} />}
                {settings.ShowMeals && <ShowMeals meals={publishedMeals} />}
                {settings.HowFoodHubWorks && <HowFoodHubWorks />}
                {settings.ShowReviews && <ShowReviews reviews={globalReviews} />}
                {settings.HomeFaqSection && <HomeFaqSection faqs={homepageFaqs} />}
                {settings.HomeStatistics && <HomeStatistics stats={dashboardStats} />}
            </div>
        </div>
    );
};

export default page;