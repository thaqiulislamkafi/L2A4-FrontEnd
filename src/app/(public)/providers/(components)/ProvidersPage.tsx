"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertCircle, ChevronLeft, ChevronRight, RotateCcw, Search, UsersRound, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import ProviderCard from "./ProviderCard";
import { getProviders } from "@/lib/api/user";
import ProvidersError from "../error";
import ProvidersLoading from "../loading";

const LIMIT = 10;

const ProvidersPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const { data, isLoading, isError, refetch,error } = useQuery({
    queryKey: ["providers", currentPage, search],
    queryFn: () => getProviders({ page: currentPage, limit: LIMIT, search }),
  });

  const providers = data?.data ?? [];
  const totalPages = Math.max(data?.meta?.totalPage ?? 1, 1);
  const totalProviders = data?.meta?.total ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setCurrentPage(1);
  };

  const getPaginationItems = () => {
    const pages: (number | "ellipsis")[] = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("ellipsis");
    }

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  if(!providers && isError && !isLoading) {
    return <ProvidersError onRetry={() => void refetch()} error={error} />;
  }

  if(isLoading) {
    return <ProvidersLoading count={6} />;
  }

  return (
    <section className="min-h-screen max-w-6xl mx-auto py-12 dark:from-orange-950/10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-9">
          <Badge variant="outline" className="mb-4 gap-2 border-orange-200 bg-orange-50 px-3 py-1.5 text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300">
            <UtensilsCrossed className="size-3.5" />
            Meet Our Food Community
          </Badge>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">Discover Our <span className="text-orange-500">Providers</span></h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">Meet the people behind your favorite meals. Explore provider profiles and find their contact and location details.</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-background/80 px-4 py-3 shadow-sm dark:border-orange-900/40">
              <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300">
                <UsersRound className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none text-foreground">{totalProviders}</p>
                <p className="mt-1 text-xs text-muted-foreground">Total providers</p>
              </div>
            </div>
          </div>
        </motion.div>

        <Card className="mb-8 rounded-2xl border-orange-100/80 bg-background/90 p-4 shadow-sm dark:border-orange-900/40 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(event) => handleSearch(event.target.value)} placeholder="Search providers by name..." aria-label="Search providers by name" className="h-12 rounded-xl border-muted bg-background pl-10 transition-colors focus-visible:border-orange-400 focus-visible:ring-orange-400/20" />
            </div>
            <Button type="button" variant="outline" onClick={handleReset} disabled={!search} className="h-12 gap-2 rounded-xl border-orange-200 px-5 text-orange-700 transition-colors hover:bg-orange-50 hover:text-orange-800 dark:border-orange-900 dark:text-orange-300 dark:hover:bg-orange-950/40">
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground sm:text-sm">
            <span>{search ? `Search results for "${search}"` : "Browse all available providers"}</span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>
        </Card>

        {isError ? (
          <Card className="rounded-2xl border-red-200 p-8 text-center dark:border-red-900/50 sm:p-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <AlertCircle className="size-7" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Unable to load providers</h2>
            <p className="mt-2 text-sm text-muted-foreground">Something went wrong while retrieving provider information. Please try again.</p>
            <Button onClick={() => void refetch()} className="mt-5 gap-2 bg-orange-500 text-white hover:bg-orange-600">
              <RotateCcw className="size-4" />
              Try Again
            </Button>
          </Card>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="animate-pulse rounded-2xl border-orange-100/70 p-5 dark:border-orange-900/30 sm:p-6">
                <div className="flex gap-4">
                  <div className="size-16 shrink-0 rounded-2xl bg-muted sm:size-[76px]" />
                  <div className="flex-1 space-y-3 pt-1">
                    <div className="h-5 w-2/3 rounded bg-muted" />
                    <div className="h-4 w-full max-w-52 rounded bg-muted" />
                    <div className="h-5 w-24 rounded-full bg-muted" />
                  </div>
                </div>
                <div className="my-5 h-px bg-muted" />
                <div className="space-y-4">
                  <div className="h-4 w-1/2 rounded bg-muted" />
                  <div className="h-4 w-4/5 rounded bg-muted" />
                  <div className="h-4 w-2/3 rounded bg-muted" />
                </div>
              </Card>
            ))}
          </div>
        ) : providers.length === 0 ? (
          <Card className="rounded-2xl border-orange-100/80 p-8 text-center dark:border-orange-900/40 sm:p-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300">
              <UsersRound className="size-8" />
            </div>
            <h2 className="mt-5 text-2xl font-bold">No Providers Found</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">We couldn&apos;t find any providers matching your search. Try a different name or reset your search.</p>
            <Button onClick={handleReset} className="mt-5 gap-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600">
              <RotateCcw className="size-4" />
              Reset Search
            </Button>
          </Card>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              {providers.map((provider, index) => (
                <ProviderCard key={provider.id} provider={provider} index={index} />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center gap-4 border-t border-orange-100 pt-7 dark:border-orange-900/40">
                <p className="text-center text-sm text-muted-foreground">Showing page <span className="font-semibold text-foreground">{currentPage}</span> of <span className="font-semibold text-foreground">{totalPages}</span></p>
                <Pagination>
                  <PaginationContent className="flex-wrap gap-1.5">
                    <PaginationItem>
                      <Button variant="outline" size="icon" aria-label="Previous page" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="size-9 rounded-lg border-orange-200 hover:bg-orange-50 disabled:opacity-40 dark:border-orange-900 dark:hover:bg-orange-950/40">
                        <ChevronLeft className="size-4" />
                      </Button>
                    </PaginationItem>
                    {getPaginationItems().map((page, index) => (
                      <PaginationItem key={`${page}-${index}`}>
                        {page === "ellipsis" ? (
                          <span className="px-2 text-muted-foreground">…</span>
                        ) : (
                          <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)} className={currentPage === page ? "size-9 cursor-pointer rounded-lg border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:text-white" : "size-9 cursor-pointer rounded-lg hover:border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/40"}>
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <Button variant="outline" size="icon" aria-label="Next page" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="size-9 rounded-lg border-orange-200 hover:bg-orange-50 disabled:opacity-40 dark:border-orange-900 dark:hover:bg-orange-950/40">
                        <ChevronRight className="size-4" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProvidersPage;