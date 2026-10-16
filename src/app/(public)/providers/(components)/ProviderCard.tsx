"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, CalendarDays, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Provider } from "@/types/auth.type";
import Image from "next/image";

interface ProviderCardProps {
  provider: Provider;
  index: number;
}

const ProviderCard = ({ provider, index }: ProviderCardProps) => {
  const [imageError, setImageError] = useState(false);
  const initials = provider.name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const isActive = provider.status.toLowerCase() === "active";
  const isBanned = provider.banned;
  const joinedDate = new Date(provider.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.3) }} whileHover={{ y: -4 }} className="h-full">
      <Card className="group relative h-full overflow-hidden rounded-2xl border border-orange-100/80 bg-background p-5 shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10 sm:p-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-orange-300 via-orange-500 to-amber-400 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex items-start gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-orange-100 bg-orange-100 text-lg font-bold text-orange-700 shadow-sm sm:size-[76px]">
            {provider.image && !imageError ? (
              <Image src={provider.image} width={100} height={100} alt={provider.name} onError={() => setImageError(true)} className="size-full object-cover" />
            ) : (
              initials || <UserRound className="size-7" />
            )}
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <h3 className="truncate text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-orange-600 sm:text-xl">{provider.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="size-3.5 shrink-0 text-orange-500" />
              <span className="truncate">{provider.email}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className={isBanned ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-50" : isActive ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-50" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-100"} variant="outline">
                <span className={`mr-1.5 size-1.5 rounded-full ${isBanned ? "bg-red-500" : isActive ? "bg-green-500" : "bg-slate-400"}`} />
                {isBanned ? "Banned" : provider.status}
              </Badge>
              <Badge variant="outline" className={provider.emailVerified ? "border-orange-200 bg-orange-50 text-orange-700" : "border-muted bg-muted/50 text-muted-foreground"}>
                {provider.emailVerified ? <BadgeCheck className="mr-1 size-3.5" /> : <Mail className="mr-1 size-3.5" />}
                {provider.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="my-5 h-px bg-border/70" />

        <div className="space-y-3.5">
          <div className="flex items-start gap-3 text-sm">
            <Phone className="mt-0.5 size-4 shrink-0 text-orange-500" />
            <span className="break-all text-muted-foreground">{provider.contact || "No contact provided"}</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="mt-0.5 size-4 shrink-0 text-orange-500" />
            <span className="line-clamp-2 leading-5 text-muted-foreground">{provider.address || "No address provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <UserRound className="size-4 shrink-0 text-orange-500" />
            <span className="text-muted-foreground">{provider.age != null ? `${provider.age} years old` : "Age not provided"}</span>
            <span className="text-border">•</span>
            <CalendarDays className="size-4 shrink-0 text-orange-500" />
            <span className="text-muted-foreground">Joined {joinedDate}</span>
          </div>
        </div>

        {isBanned && provider.banReason && (
          <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">
            <ShieldCheck className="mr-1 inline size-3.5" />
            {provider.banReason}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default ProviderCard;