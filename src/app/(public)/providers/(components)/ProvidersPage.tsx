"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, RotateCcw, Search, UsersRound, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import ProviderCard from "./ProviderCard";
import { getProviders } from "@/lib/api/user";
import ProvidersError from "../error";
import ProvidersLoading from "../loading";
import { ProviderLoadingSpinner } from "@/components/ui/spinner";

const LIMIT = 6;

const ProvidersPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const normalizedSearch = search.trim();
  const { data, isLoading, isFetching, isError, refetch,error } = useQuery({
    queryKey: ["providers", currentPage, normalizedSearch],
    queryFn: () => getProviders({ page: currentPage, limit: LIMIT, search: normalizedSearch }),
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

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  if (isError) {
    return <ProvidersError onRetry={refetch} error={error} />;
  }

  if (isLoading) {
    return <ProvidersLoading />;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

        <div className="mx-auto mb-14 max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Label htmlFor="provider-search" className="sr-only">Search providers</Label>
              <Search className="pointer-events-none absolute left-5 top-1/2 z-10 size-5 -translate-y-1/2 text-orange-500" />
              <Input
                id="provider-search"
                type="text"
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search providers by name..."
                className="h-14 w-full rounded-2xl border-orange-100 pl-14 pr-5 text-[15px] shadow-sm transition-all duration-300 placeholder:text-muted-foreground hover:border-orange-200 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/10 dark:border-orange-950/50 dark:bg-orange-950/5 dark:hover:border-orange-900"
              />
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                <Search className="size-5" />
              </div>
              <div className="whitespace-nowrap">
                <Label className="text-xs text-muted-foreground">Search Results</Label>
                <p className="text-lg font-bold text-foreground">
                  {totalProviders}{" "}
                  <span className="font-medium text-muted-foreground">
                    Provider{totalProviders !== 1 && "s"}
                  </span>
                </p>
              </div>
              {normalizedSearch && (
                <span className="hidden text-sm text-muted-foreground lg:inline">
                  for &quot;{normalizedSearch}&quot;
                </span>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={!search}
              className="h-14 shrink-0 rounded-2xl border-orange-200 bg-orange-50 px-5 font-semibold text-orange-700 shadow-sm transition-all duration-300 hover:border-orange-500 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:shadow-orange-600/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-orange-900 dark:bg-orange-950/5 dark:text-orange-400 dark:hover:bg-orange-600 dark:hover:text-white"
            >
              <RotateCcw className="size-4" />
              Reset Search
            </Button>
          </div>
        </div>

        {
          isFetching ? <ProviderLoadingSpinner/>
          
            : providers.length === 0 ? (
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-16 flex flex-col items-center gap-4"
                  >
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            size="default"
                            aria-label="Go to previous page"
                            aria-disabled={currentPage === 1}
                            onClick={(event) => {
                              event.preventDefault();
                              if (currentPage > 1) handlePageChange(currentPage - 1);
                            }}
                            className={`gap-1 rounded-xl border ${currentPage === 1
                              ? "pointer-events-none opacity-40"
                              : "border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                              }`}
                          >
                            <ChevronLeft className="size-4" />
                            <span className="hidden sm:block">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        {getPaginationItems().map((page, index) => (
                          <PaginationItem key={`${page}-${index}`}>
                            {page === "ellipsis" ? (
                              <PaginationEllipsis className="text-primary" />
                            ) : (
                              <PaginationLink
                                href="#"
                                aria-label={`Go to page ${page}`}
                                isActive={currentPage === page}
                                onClick={(event) => {
                                  event.preventDefault();
                                  handlePageChange(page);
                                }}
                                className={currentPage === page
                                  ? "rounded-xl border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
                                  : "rounded-xl text-primary hover:bg-primary/10 hover:text-primary"
                                }
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            size="default"
                            aria-label="Go to next page"
                            aria-disabled={currentPage === totalPages}
                            onClick={(event) => {
                              event.preventDefault();
                              if (currentPage < totalPages) handlePageChange(currentPage + 1);
                            }}
                            className={`gap-1 rounded-xl border ${currentPage === totalPages
                              ? "pointer-events-none opacity-40"
                              : "border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                              }`}
                          >
                            <span className="hidden sm:block">Next</span>
                            <ChevronRight className="size-4" />
                          </PaginationLink>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                    <Badge
                      variant="outline"
                      className="border-primary/20 bg-primary/5 px-4 py-1.5 text-primary"
                    >
                      Page {currentPage} of {totalPages}
                    </Badge>
                  </motion.div>
                )}
              </>
            )}
      </div>
    </section>
  );
};

export default ProvidersPage;