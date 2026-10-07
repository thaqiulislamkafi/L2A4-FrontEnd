import HomeFaqSection from '@/components/HomeFaqSection';
import HomeHero from '@/components/HomeHero';
import HomeStatistics from '@/components/HomeStatistics';
import HowFoodHubWorks from '@/components/HowFoodHubWorks';
import ShowMeals from '@/components/ShowMeals';
import ShowReviews from '@/components/ShowReviews';
import { getHomepageSettings } from '@/lib/api/app-settings';
import { parseHomepageSettings } from '@/utils/parseHomepageSettings';
import { Geist } from 'next/font/google';
import React from 'react';

const geist = Geist({ subsets: ["latin"] });

const page = async () => {

    const settingsResponse = await getHomepageSettings();
    const settings = parseHomepageSettings(settingsResponse);

    return (
        <div className={geist.className}>

            <div className={geist.className}>
            {settings.HomeHero && <HomeHero />}
            {settings.ShowMeals && <ShowMeals />}
            {settings.HowFoodHubWorks && <HowFoodHubWorks />}
            {settings.ShowReviews && <ShowReviews />}
            {settings.HomeFaqSection && <HomeFaqSection />}
            {settings.HomeStatistics && <HomeStatistics />}
        </div>
        </div>
    );
};

export default page;