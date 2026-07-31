"use client";

import React from 'react';
import { ThemeProvider } from "next-themes";

const ThemeProviders = ({children}:{children : React.ReactNode}) => {
    return (
        <ThemeProvider
        attribute="class"
        storageKey='foodhub-theme'
        defaultTheme='system'
        enableSystem
        enableColorScheme
        disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
};

export default ThemeProviders;