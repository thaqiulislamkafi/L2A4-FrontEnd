import HomeFaqSection from '@/components/HomeFaqSection';
import HomeHero from '@/components/HomeHero';
import HomeStatistics from '@/components/HomeStatistics';
import HowFoodHubWorks from '@/components/HowFoodHubWorks';
import ShowReviews from '@/components/ShowReviews';
import { Geist } from 'next/font/google';
import React from 'react';

const geist = Geist({ subsets: ["latin"] });

const page = () => {
    return (
        <div className={geist.className}>

            <HomeHero/>
            <HowFoodHubWorks/>
            <ShowReviews/>
            <HomeFaqSection/>
            <HomeStatistics/>
        </div>
    );
};

export default page;