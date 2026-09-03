"use client"

import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const DetailsMealsError = () => {

   return (
      <main className="min-h-screen bg-orange-50/40 py-24 dark:bg-orange-950/10">
        <div className="mx-auto max-w-2xl px-6">
          <Card className="border-orange-100 bg-background p-10 text-center dark:border-orange-950/40">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <AlertCircle className="h-7 w-7" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
              Unable to Load Meal
            </h1>

            <p className="mt-2 text-muted-foreground">
              We couldnt retrieve this meal. Please try again later.
            </p>
          </Card>
        </div>
      </main>
    );
};

export default DetailsMealsError;