/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HelpCircle,
  MessageCircleQuestion,
} from "lucide-react";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/types/faq.type";
import { useGetAllFaqs } from "@/hooks/faqs/useGetAllFaqs";

export default function HomeFaqSection() {
  const { data, isLoading, isError } = useGetAllFaqs(1, 6);

  const faqs = data?.data ?? [];

  return (
    <section className="relative overflow-hidden py-24">
      {/* ========================================================= */}
      {/* Background */}
      {/* ========================================================= */}

      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-orange-50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/20" />

      {/* Decorative Orange Blur */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-600/10" />

      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl dark:bg-orange-600/10" />

      {/* ========================================================= */}
      {/* Main Container */}
      {/* ========================================================= */}

      <div className="relative container mx-auto px-4">
        {/* ======================================================= */}
        {/* Header */}
        {/* ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <div className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-400"
            >
              <HelpCircle className="h-4 w-4" />

              Frequently Asked Questions
            </Badge>
          </div>

          {/* Heading */}

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Got Questions?
          </h2>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Find quick answers to the most common questions about FoodHub,
            meals, ordering, payments, and your account.
          </p>
        </motion.div>

        {/* ======================================================= */}
        {/* FAQ Content */}
        {/* ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="mx-auto mt-14 max-w-4xl"
        >
          {/* ==================== Loading ==================== */}

          {isLoading && (
            <Card className="border-orange-100 bg-white/80 shadow-sm backdrop-blur dark:border-orange-900/30 dark:bg-slate-900/70">
              <CardContent className="flex min-h-48 flex-col items-center justify-center gap-4">
                <Spinner className="size-8 text-orange-600" />

                <Label className="text-sm font-medium text-orange-700 dark:text-orange-400">
                  Loading frequently asked questions...
                </Label>
              </CardContent>
            </Card>
          )}

          {/* ==================== Error ==================== */}

          {isError && !isLoading && (
            <Card className="border-orange-200 bg-orange-50/70 dark:border-orange-900/40 dark:bg-orange-950/20">
              <CardContent className="flex min-h-48 flex-col items-center justify-center text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                  <MessageCircleQuestion className="size-6" />
                </div>

                <Label className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  Unable to load FAQs
                </Label>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Something went wrong while loading the frequently asked
                  questions.
                </p>
              </CardContent>
            </Card>
          )}

          {/* ==================== FAQ List ==================== */}

          {!isLoading && !isError && faqs.length > 0 && (
            
            <Card className="overflow-hidden border-orange-100 bg-orange-50/20 shadow-lg shadow-orange-100/40 backdrop-blur-sm dark:border-orange-900/30 dark:bg-slate-900/80 dark:shadow-none">

              <CardContent className="p-3 sm:p-5">
                
                <Accordion
                  className="w-full"
                >
                  {faqs.map((faq:FAQ, index:any) => (

                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border-b border-orange-100 last:border-b-0 dark:border-orange-900/30"
                    >
                      <AccordionTrigger className="group px-4 py-5 text-left text-base font-semibold text-slate-800 hover:bg-orange-50 hover:no-underline dark:text-slate-100 dark:hover:bg-orange-950/20">
                        <div className="flex items-start gap-4 pr-4">
                          {/* Number */}

                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          {/* Question */}

                          <span className="leading-6">
                            {faq.question}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-4">
                        <div className="ml-11 mr-8 pb-5">
                          {/* Category */}

                          <Badge
                            variant="outline"
                            className="my-3 border-orange-200 bg-orange-50 text-xs font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-400"
                          >
                            {faq.category}
                          </Badge>

                          {/* Answer */}

                          <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {faq.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}

          {/* ==================== Empty ==================== */}

          {!isLoading && !isError && faqs.length === 0 && (
            <Card className="border-orange-100 bg-white/80 dark:border-orange-900/30 dark:bg-slate-900/70">
              <CardContent className="flex min-h-48 flex-col items-center justify-center text-center">
                <MessageCircleQuestion className="mb-4 size-10 text-orange-400" />

                <Label className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  No FAQs available
                </Label>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  We couldnt find any frequently asked questions at the
                  moment.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* ======================================================= */}
        {/* View All Button */}
        {/* ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
          }}
          className="relative z-10 mt-12 flex justify-center"
        >
          <Button
            size="lg"
            className="group rounded-xl bg-orange-600 px-6 py-6 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-300 dark:bg-orange-600 dark:shadow-none dark:hover:bg-orange-500 "
          >
            <Link href="/faq" className="flex gap-1 justify-center items-center">
             <p> View All FAQs</p>

              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}