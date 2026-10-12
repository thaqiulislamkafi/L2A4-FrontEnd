"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HOME_SETTING_COUNT = 6;
const CONTACT_SETTING_COUNT = 4;
const CATEGORY_COUNT = 6;
const DIETARY_TYPE_COUNT = 5;
const CUISINE_TYPE_COUNT = 6;

const AppSettingLoading = () => {
    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Page Header */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-40 rounded-lg bg-orange-100 dark:bg-orange-950/50" />
                <Skeleton className="h-4 w-96 max-w-full rounded-md bg-orange-100 dark:bg-orange-950/50" />
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-orange-100 dark:bg-orange-900/40" />

            {/* Home Page Management */}
            <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
                <CardHeader className="border-b border-orange-100 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="size-5 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                                <Skeleton className="h-6 w-52 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                                <Skeleton className="h-5 w-24 rounded-full bg-orange-100 dark:bg-orange-900/40" />
                            </div>
                            <Skeleton className="h-4 w-80 max-w-full rounded-md bg-orange-100 dark:bg-orange-900/40" />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
                    {Array.from({ length: HOME_SETTING_COUNT }).map((_, index) => (
                        <HomeSettingSkeleton key={index} />
                    ))}
                </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
                <CardHeader className="border-b border-orange-100 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="size-5 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                            <Skeleton className="h-6 w-48 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                        </div>
                        <Skeleton className="h-4 w-96 max-w-full rounded-md bg-orange-100 dark:bg-orange-900/40" />
                    </div>
                </CardHeader>

                <CardContent className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
                    {Array.from({ length: CONTACT_SETTING_COUNT }).map((_, index) => (
                        <ContactSettingSkeleton key={index} />
                    ))}
                </CardContent>
            </Card>

            {/* Category Management */}
            <ManagementListSkeleton
                titleWidth="44"
                descriptionWidth="52"
                buttonWidth="28"
                itemCount={CATEGORY_COUNT}
            />

            {/* Dietary Types Management */}
            <ManagementListSkeleton
                titleWidth="52"
                descriptionWidth="48"
                buttonWidth="36"
                itemCount={DIETARY_TYPE_COUNT}
            />

            {/* Cuisine Types Management */}
            <ManagementListSkeleton
                titleWidth="48"
                descriptionWidth="48"
                buttonWidth="32"
                itemCount={CUISINE_TYPE_COUNT}
            />
        </div>
    );
};

function HomeSettingSkeleton() {
    return (
        <div className="rounded-lg border border-orange-100 p-5 dark:border-orange-900/40">
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <Skeleton className="h-5 w-36 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                        <Skeleton className="h-5 w-16 rounded-full bg-orange-100 dark:bg-orange-900/40" />
                    </div>
                    <Skeleton className="h-4 w-64 max-w-full rounded-md bg-orange-100 dark:bg-orange-900/40" />
                </div>

                <Skeleton className="h-6 w-11 shrink-0 rounded-full bg-orange-100 dark:bg-orange-900/40" />
            </div>
        </div>
    );
}

function ContactSettingSkeleton() {
    return (
        <div className="space-y-2 rounded-lg border border-orange-100 p-4 dark:border-orange-900/40">
            <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="h-4 w-32 rounded-md bg-orange-100 dark:bg-orange-900/40" />
            </div>

            <div className="flex items-center gap-2">
                <Skeleton className="h-9 flex-1 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                <Skeleton className="size-9 shrink-0 rounded-md bg-orange-100 dark:bg-orange-900/40" />
            </div>
        </div>
    );
}

interface ManagementListSkeletonProps {
    titleWidth: string;
    descriptionWidth: string;
    buttonWidth: string;
    itemCount: number;
}

function ManagementListSkeleton({
    titleWidth,
    descriptionWidth,
    buttonWidth,
    itemCount,
}: ManagementListSkeletonProps) {
    return (
        <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
            <CardHeader className="border-b border-orange-100 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="size-5 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                            <Skeleton className={`h-6 w-${titleWidth} rounded-md bg-orange-100 dark:bg-orange-900/40`} />
                        </div>
                        <Skeleton className={`h-4 w-${descriptionWidth} rounded-md bg-orange-100 dark:bg-orange-900/40`} />
                    </div>

                    <Skeleton className={`h-9 w-${buttonWidth} rounded-md bg-orange-100 dark:bg-orange-900/40`} />
                </div>
            </CardHeader>

            <CardContent className="p-4">
                <div className="flex flex-wrap gap-3">
                    {Array.from({ length: itemCount }).map((_, index) => (
                        <div key={index} className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50/50 px-3 py-2 dark:border-orange-900/40 dark:bg-orange-950/20">
                            <Skeleton className="h-4 w-24 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                            <Skeleton className="size-6 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                            <Skeleton className="size-6 rounded-md bg-orange-100 dark:bg-orange-900/40" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default AppSettingLoading;