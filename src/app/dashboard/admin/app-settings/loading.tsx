"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

const AppSettingLoading = () => {
    return (
        <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
            <CardHeader className="border-b border-orange-100 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
                <div className="space-y-3">
                    <div className="h-7 w-64 animate-pulse rounded-lg bg-muted" />
                    <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between gap-4 border-b p-5 last:border-b-0">
                        <div className="flex-1 space-y-3">
                            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-72 max-w-full animate-pulse rounded bg-muted" />
                        </div>

                        <div className="h-6 w-11 animate-pulse rounded-full bg-muted" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default AppSettingLoading;