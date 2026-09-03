"use client"
import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const DetailsMealsLoading = () => {
    
    return (
      <main className="min-h-screen bg-orange-50/40 py-24 dark:bg-orange-950/10">
        <div className="mx-auto flex min-h-100 max-w-7xl items-center justify-center px-6">
          <div className="flex flex-col items-center gap-4">
            <Spinner className="size-10 text-orange-600" />

            <p className="text-sm font-medium text-orange-700 dark:text-orange-400">
              Loading meal details...
            </p>
          </div>
        </div>
      </main>
    );
};

export default DetailsMealsLoading;