"use client";

import * as React from "react";
import { CalendarDays, Clock3, Mail, MapPin, Phone, ShieldCheck, User, UserRoundCheck } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AuthUser } from "@/store/auth.store";

interface ProfileHeaderProps {
  user: AuthUser;
}

export default function ProfileInformation({ user }:  ProfileHeaderProps) {
  const isVerified = user.emailVerified;
  const isActive = user.status.toLowerCase() === "active";

  return (
    <Card className="border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
      <CardHeader className="border-b border-orange-100 px-5 py-4 dark:border-orange-900/40">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-orange-950 dark:text-orange-50">
          <UserRoundCheck className="size-5 text-orange-500" />
          Personal Information
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5">
        <div className="grid gap-5 md:grid-cols-2">
          <InformationItem icon={User} label="Full Name" value={user.name || "Not provided"} />
          <InformationItem icon={Mail} label="Email Address" value={user.email || "Not provided"} />

          <InformationItem icon={Phone} label="Contact Number" value={user.contact || "Not provided"} />
          <InformationItem icon={CalendarDays} label="Age" value={user.age ? `${user.age} years` : "Not provided"} />

          <InformationItem icon={MapPin} label="Address" value={user.address || "Not provided"} className="md:col-span-2" />
        </div>

        <Separator className="my-6 bg-orange-100 dark:bg-orange-900/40" />

        <div className="grid gap-5 md:grid-cols-2">
          <InformationItem icon={ShieldCheck} label="Account Role">
            <Badge variant="outline" className="w-fit rounded-full border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold capitalize text-orange-700 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
              <ShieldCheck className="mr-1 size-3.5" />
              {user.role}
            </Badge>
          </InformationItem>

          <InformationItem icon={UserRoundCheck} label="Account Status">
            <Badge variant="outline" className={isActive ? "w-fit rounded-full border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold capitalize text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400" : "w-fit rounded-full border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold capitalize text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"}>
              {user.status}
            </Badge>
          </InformationItem>

          <InformationItem icon={Mail} label="Email Verification">
            <Badge variant="outline" className={isVerified ? "w-fit rounded-full border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400" : "w-fit rounded-full border-yellow-200 bg-yellow-50 px-2.5 py-1 text-xs font-semibold text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400"}>
              {isVerified ? "Verified" : "Not Verified"}
            </Badge>
          </InformationItem>
        </div>

        <Separator className="my-6 bg-orange-100 dark:bg-orange-900/40" />

        <div className="grid gap-5 md:grid-cols-2">
          <InformationItem icon={CalendarDays} label="Account Created" value={format(new Date(user.createdAt), "dd MMM yyyy, hh:mm a")} />
          <InformationItem icon={Clock3} label="Last Updated" value={format(new Date(user.updatedAt), "dd MMM yyyy, hh:mm a")} />
        </div>
      </CardContent>
    </Card>
  );
}

interface InformationItemProps {
  icon: React.ElementType;
  label: string;
  value?: string;
  className?: string;
  children?: React.ReactNode;
}

function InformationItem({ icon: Icon, label, value, className = "", children }: InformationItemProps) {
  return (
    <div className={`flex gap-3 rounded-xl border border-orange-100 bg-orange-50/30 p-4 transition-colors hover:bg-orange-50/60 dark:border-orange-900/30 dark:bg-orange-950/10 dark:hover:bg-orange-950/20 ${className}`}>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-700/50 dark:text-orange-300/50">
          {label}
        </p>

        {children ?? (
          <p className="wrap-break-word text-sm font-semibold text-orange-950 dark:text-orange-50">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}