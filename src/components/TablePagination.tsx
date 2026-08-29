"use client";

import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationEllipsis } from "@/components/ui/pagination";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  itemsName : string
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({ page, totalPages, totalItems,itemsName , onPageChange }: TablePaginationProps) {
  const canPreviousPage = page > 1;
  const canNextPage = page < totalPages;

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages];
    }

    if (page >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-orange-100 px-4 py-3 sm:flex-row dark:border-orange-900/40">
      <div className="flex items-center gap-3 text-sm font-medium text-orange-700/70 dark:text-orange-300/70">
        <span>
          Total <span className="font-semibold text-orange-700 dark:text-orange-300">{totalItems}</span> {itemsName}
        </span>

        <span className="size-1 rounded-full bg-orange-300 dark:bg-orange-700" />

        <span>
          Page <span className="font-semibold text-orange-700 dark:text-orange-300">{page}</span> of <span className="font-semibold text-orange-700 dark:text-orange-300">{totalPages}</span>
        </span>
      </div>

      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#"
              onClick={(event) => {
                event.preventDefault();
                if (canPreviousPage)
                  onPageChange(page - 1);
              }}
              aria-disabled={!canPreviousPage} className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40" />
          </PaginationItem>

          {pageNumbers.map((pageNumber, index) => (

            <PaginationItem 
            key={typeof pageNumber === "number" ? pageNumber : `ellipsis-${index}`}>

              {pageNumber === "ellipsis" ? (
                <PaginationEllipsis className="text-orange-500 dark:text-orange-400" />
              ) : (
                <PaginationLink href="#"
                  isActive={pageNumber === page}
                  onClick={(event) => {
                    event.preventDefault();
                    if (pageNumber !== page)

                      onPageChange(Number(pageNumber));
                  }} className={pageNumber === page ? "border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:text-white dark:border-orange-500 dark:bg-orange-600 dark:hover:bg-orange-500" : "text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:text-orange-300 dark:hover:bg-orange-950/40"} aria-label={`Go to page ${pageNumber}`}>
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href="#"
              onClick={(event) => {
                event.preventDefault();
                if (canNextPage) onPageChange(page + 1);
              }} aria-disabled={!canNextPage} className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}