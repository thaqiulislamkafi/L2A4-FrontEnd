import React from 'react';
import BecomeProviderHero from './BecomeProviderHero';
import ProviderSignupForm from './ProviderSignupForm';
import ProviderGuidelines from './ProviderGuidelines';

const BecomeProvider = () => {
    return (
        <div>
            <BecomeProviderHero />

            <ProviderSignupForm/>

            <ProviderGuidelines/>
        </div>
    );
};

export default BecomeProvider;