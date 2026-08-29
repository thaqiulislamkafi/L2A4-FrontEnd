
import Footer from '@/components/Footer';
import Navbar from '@/components/navbar';
import { Geist } from 'next/font/google';
import React from 'react';

const geist = Geist({ subsets: ["latin"] });

const PublicLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (

        <div className={`${geist.className} dark:bg-gray-900`}>
            <header className='font-sans sticky top-0 z-10'>
                <Navbar />
            </header>
            <main className='font-sans'>
                {children}
            </main>
            <footer className='font-sans'>
                <Footer />
            </footer>
        </div>
    );
};

export default PublicLayout;