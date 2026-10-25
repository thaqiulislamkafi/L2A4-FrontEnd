"use client";

import { Loader2, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FAQ } from "@/types/faq.type";

interface FAQsTableProps {
  faqs: FAQ[];
  isFetching?: boolean;
  onEdit: (faq: FAQ) => void;
  onDelete: (faq: FAQ) => void;
}

export default function FAQsTable({
  faqs,
  isFetching = false,
  onEdit,
  onDelete,
}: FAQsTableProps) {
  return (
    <Card className="relative overflow-hidden border-orange-200/80 p-0 shadow-sm shadow-orange-950/5 dark:border-orange-900/40">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-orange-50/80 dark:bg-orange-950/20">
            <TableRow className="border-orange-200/70 hover:bg-transparent dark:border-orange-900/40">
              <TableHead className="h-11 w-16 px-4 text-xs font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                Order
              </TableHead>
              <TableHead className="h-11 min-w-96 px-4 text-xs font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                Question &amp; Answer
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                Category
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                Status
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                Updated
              </TableHead>
              <TableHead className="h-11 w-20 px-4 text-xs font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <TableRow
                  key={faq.id}
                  className="border-orange-100 transition-colors hover:bg-orange-50/60 dark:border-orange-900/30 dark:hover:bg-orange-950/20"
                >
                  <TableCell className="px-4 py-4 align-top font-semibold text-orange-700 dark:text-orange-300">
                    {faq.sortOrder}
                  </TableCell>
                  <TableCell className="max-w-2xl whitespace-normal px-4 py-4">
                    <p className="font-semibold text-orange-950 dark:text-orange-50">
                      {faq.question}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top">
                    <Badge
                      variant="outline"
                      className="border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-300"
                    >
                      {faq.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top">
                    <Badge
                      variant={faq.isPublished ? "default" : "secondary"}
                      className={
                        faq.isPublished
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : ""
                      }
                    >
                      {faq.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-4 align-top text-sm text-muted-foreground">
                    <time dateTime={faq.updatedAt}>
                      {new Date(faq.updatedAt).toLocaleDateString()}
                    </time>
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Edit FAQ: ${faq.question}`}
                        onClick={() => onEdit(faq)}
                        className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Delete FAQ: ${faq.question}`}
                        onClick={() => onDelete(faq)}
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-sm font-medium text-orange-700/60 dark:text-orange-300/60"
                >
                  No FAQs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-orange-50/40 backdrop-blur-[1px] dark:bg-orange-950/20">
            <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white/95 px-3 py-2 text-sm font-medium text-orange-600 shadow-sm dark:border-orange-900/50 dark:bg-orange-950/95 dark:text-orange-400">
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
