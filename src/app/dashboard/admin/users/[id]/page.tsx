"use client";

import { useParams } from "next/navigation";

export default function UserDetailsPage() {
  const params = useParams();

  return (
    <div className="space-y-5 p-4 md:p-6">
      <h1 className="text-2xl font-bold tracking-tight text-orange-950 dark:text-orange-50">
        User Details
      </h1>
      <p className="text-sm font-medium text-orange-700/60 dark:text-orange-300/60">
        {String(params.id ?? "Unknown user")}
      </p>
    </div>
  );
}
