"use client";

import type { LucideIcon } from "lucide-react";

import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card";

interface DashboardStatCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
}

export default function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <Card
      className="group relative overflow-hidden rounded-2xl border-orange-200/70 bg-orange-50/70 shadow-sm shadow-orange-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-500/10 dark:border-orange-900/40 dark:bg-orange-950/10 dark:hover:border-orange-800/60 dark:hover:bg-orange-950/20
      "
    >
      {/* Decorative orange accent */}
      <div
        className="absolute -right-8 -top-8 size-24 rounded-full bg-orange-500/5 transition-transform duration-300 group-hover:scale-125 dark:bg-orange-500/10
        "
      />

      <CardHeader
        className="relative flex flex-row items-center justify-between space-y-0 pb-2
        "
      >
        <CardTitle
          className="text-sm font-semibold text-orange-900 dark:text-orange-100
          "
        >
          {title}
        </CardTitle>

        {/* Icon */}
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-orange-100 text-orange-600 shadow-sm shadow-orange-500/10 transition-all duration-200 group-hover:border-orange-300 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-orange-500/20 dark:border-orange-800/60 dark:bg-orange-950/50 dark:text-orange-400 dark:group-hover:border-orange-500 dark:group-hover:bg-orange-600 dark:group-hover:text-white
          "
        >
          <Icon className="size-[18px]" />
        </div>
      </CardHeader>

      <CardContent className="relative">
        {/* Value */}
        <div
          className=" text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50"
        >
          {value.toLocaleString()}
        </div>

        {/* Description */}
        <p
          className=" mt-1 text-xs font-medium text-orange-700/60 dark:text-orange-300/60"
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
}