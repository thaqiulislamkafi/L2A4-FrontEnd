"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MessageSquareText, PackageCheck, ShieldCheck, Store, UtensilsCrossed } from "lucide-react";

const termsSections = [
  {
    number: "05",
    title: "Orders & Payments",
    icon: PackageCheck,
    description: "FoodHub allows users to browse available meals and place orders through participating providers. By placing an order, you agree to provide accurate information required for successful fulfillment.",
    points: ["Meal prices and availability may change without prior notice.", "An order is subject to availability and provider confirmation.", "Users are responsible for providing accurate delivery or contact information.", "Payment information must be accurate and authorized for use."],
  },
  {
    number: "06",
    title: "Pricing & Cancellation",
    icon: CreditCard,
    description: "Prices displayed on FoodHub are provided for the applicable meals and may vary between providers. Cancellation and refund eligibility may depend on the status of an order.",
    points: ["Displayed prices may change based on provider updates.", "Orders may not always be cancellable after processing has started.", "Refunds, where applicable, are handled according to the relevant order policy.", "FoodHub may take action against fraudulent refund or cancellation requests."],
  },
  {
    number: "07",
    title: "Reviews & User Content",
    icon: MessageSquareText,
    description: "FoodHub allows eligible users to share reviews and other content. You are responsible for ensuring that anything you submit is truthful, respectful, and does not violate the rights of others.",
    points: ["Reviews should reflect genuine experiences.", "Do not submit abusive, misleading, offensive, or fraudulent content.", "Do not upload content that infringes another person's rights.", "FoodHub may remove content that violates these Terms."],
  },
  {
    number: "08",
    title: "Provider Responsibilities",
    icon: Store,
    description: "Providers are responsible for the meals and information they offer through FoodHub. Providers should maintain accurate information and fulfill accepted orders responsibly.",
    points: ["Providers should provide accurate meal descriptions and pricing.", "Providers are responsible for maintaining meal availability information.", "Accepted orders should be handled responsibly and in a timely manner.", "Providers must comply with applicable laws and FoodHub policies."],
  },
];

const TermsOrdersAndContent = () => {
  return (
    <section className="relative overflow-hidden bg-orange-50/40 py-20 dark:bg-orange-950/10">
      <div className="pointer-events-none absolute -right-32 top-20 size-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-900/10" />
      <div className="pointer-events-none absolute -left-32 bottom-20 size-72 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-900/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-orange-700 shadow-sm hover:bg-white dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400 dark:hover:bg-orange-950/40">
            <UtensilsCrossed className="size-4" />
            Orders &amp; Community
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Using FoodHub <span className="text-orange-600 dark:text-orange-400">Responsibly</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            These terms explain the responsibilities of users and providers when ordering meals, making payments, sharing content, and providing services through FoodHub.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {termsSections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div key={section.number} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }} className="h-full">
                <Card className="group h-full overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 transition-all duration-300 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-950/10 dark:border-orange-900/40 dark:bg-orange-950/10 dark:hover:border-orange-800/60">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <motion.div whileHover={{ rotate: 5, scale: 1.08 }} transition={{ duration: 0.25 }} className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-colors duration-300 group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-950/60 dark:text-orange-400 dark:group-hover:bg-orange-600 dark:group-hover:text-white">
                          <Icon className="size-6" />
                        </motion.div>

                        <div>
                          <Badge variant="outline" className="mb-1 border-orange-200 text-xs font-semibold text-orange-600 dark:border-orange-800/60 dark:text-orange-400">
                            Section {section.number}
                          </Badge>
                          <CardTitle className="text-xl text-slate-900 dark:text-white">
                            {section.title}
                          </CardTitle>
                        </div>
                      </div>

                      <ShieldCheck className="size-5 text-orange-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500 dark:text-orange-800 dark:group-hover:text-orange-500" />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {section.description}
                    </p>

                    <Separator className="my-5 bg-orange-100 dark:bg-orange-900/40" />

                    <div className="space-y-3">
                      {section.points.map((point, pointIndex) => (
                        <motion.div key={point} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 + pointIndex * 0.07 }} className="flex items-start gap-3">
                          <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                            <span className="size-1.5 rounded-full bg-orange-500" />
                          </div>
                          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{point}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.2 }} className="mx-auto mt-8 max-w-4xl">
          <Card className="border-orange-200/70 bg-white/80 shadow-sm backdrop-blur-sm dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardContent className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  A fair experience for everyone
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Users and providers are expected to interact honestly and responsibly so that FoodHub remains a reliable marketplace for discovering and ordering meals.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOrdersAndContent;