import HomeHero from '@/components/HomeHero';
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
        </div>
    );
};

export default page;