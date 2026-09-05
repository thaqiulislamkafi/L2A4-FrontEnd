"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@base-ui/react';
import { Settings2 } from 'lucide-react';

const AppSettingsError = ({ onRetry }: { onRetry: () => void }) => {
    return (
        <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
            <CardContent className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 rounded-full bg-orange-100 p-4 text-orange-600 dark:bg-orange-950/30">
                    <Settings2 className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-semibold">
                    Unable to load settings
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                    Something went wrong while fetching application settings.
                </p>

                <Button className="mt-6 bg-orange-600 text-white hover:bg-orange-700" onClick={onRetry}>
                    Try Again
                </Button>
            </CardContent>
        </Card>
    );
};

export default AppSettingsError;