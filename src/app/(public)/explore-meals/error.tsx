"use client"

import { UtensilsCrossed } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ExploreMealsError = () => {

    return (
      <section className="relative overflow-hidden bg-orange-50/40 py-24 dark:bg-orange-950/10">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-orange-100 dark:bg-orange-950/40">
              <UtensilsCrossed className="size-9 text-primary" />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-foreground">
              Unable to Load Meals
            </h2>

            <p className="mt-3 text-muted-foreground">
              Something went wrong while loading our meals. Please try again
              later.
            </p>

            <Badge
              variant="outline"
              className="mt-6 border-primary/30 bg-primary/5 px-4 py-2 text-primary"
            >
              Please try again
            </Badge>
          </div>
        </div>
      </section>
    );
};

export default ExploreMealsError;