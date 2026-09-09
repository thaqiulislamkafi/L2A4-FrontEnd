"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleUserRound, Database, FileText, Info, Package, ShieldCheck, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const privacySections = [
  {
    number: "01",
    title: "Information We Collect",
    icon: Database,
    description: "FoodHub may collect information that is necessary to create accounts, provide services, process orders, and improve your overall experience on the platform.",
    points: [
      "Name, email address, and profile information.",
      "Contact and account-related information.",
      "Information required to provide FoodHub services.",
      "Preferences and information you choose to provide.",
    ],
  },
  {
    number: "02",
    title: "Information You Provide",
    icon: UserRound,
    description: "When you interact with FoodHub, you may voluntarily provide information when registering, managing your account, placing orders, reviewing meals, or communicating with providers.",
    points: [
      "Account registration and profile information.",
      "Meal orders, cart items, and related details.",
      "Reviews, ratings, and other content you submit.",
      "Information provided when contacting FoodHub support.",
    ],
  },
  {
    number: "03",
    title: "Automatically Collected Information",
    icon: FileText,
    description: "When you use FoodHub, certain technical and usage information may be collected automatically to maintain security, understand platform usage, and improve our services.",
    points: [
      "Device, browser, and operating system information.",
      "IP address and technical connection information.",
      "Pages, features, and interactions with the platform.",
      "Log and diagnostic information related to platform usage.",
    ],
  },
  {
    number: "04",
    title: "Account & Transaction Information",
    icon: Package,
    description: "FoodHub may process information associated with your account and transactions to support ordering, meal management, provider services, and the proper operation of the platform.",
    points: [
      "Account status and authentication-related information.",
      "Order history and purchased meal information.",
      "Cart, quantity, pricing, and transaction-related details.",
      "Interactions between users and participating providers.",
    ],
  },
];

const PrivacyInformation = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-background">
      <div className="pointer-events-none absolute -left-32 top-1/4 size-80 rounded-full bg-orange-100/50 blur-3xl dark:bg-orange-950/20" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 size-80 rounded-full bg-orange-100/40 blur-3xl dark:bg-orange-950/20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700 hover:bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400 dark:hover:bg-orange-950/30">
            <Info className="size-4" />
            Information We Collect
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Understanding Your <span className="text-orange-600 dark:text-orange-400">Information</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            We collect information that helps FoodHub provide reliable services, manage accounts and orders, maintain security, and improve your experience.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {privacySections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div key={section.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }} className="h-full">
                <Card className="group h-full overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 transition-all duration-300 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-950/10 dark:border-orange-900/40 dark:bg-orange-950/10 dark:hover:border-orange-800/60">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <motion.div whileHover={{ rotate: 5, scale: 1.08 }} transition={{ duration: 0.25 }} className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-950/60 dark:text-orange-400 dark:group-hover:bg-orange-600 dark:group-hover:text-white">
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

                    <ul className="space-y-3">
                      {section.points.map((point, pointIndex) => (
                        <motion.li key={point} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 + pointIndex * 0.08 }} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-orange-500 dark:text-orange-400" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.2 }} className="mx-auto mt-8 max-w-4xl">
          <Card className="border-orange-200/70 bg-orange-50/60 shadow-sm dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardContent className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <CircleUserRound className="size-5" />
              </motion.div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  We only collect information relevant to our services
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  The information FoodHub handles depends on how you interact with the platform. We aim to collect and process information that is relevant to providing, securing, and improving our services.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyInformation;