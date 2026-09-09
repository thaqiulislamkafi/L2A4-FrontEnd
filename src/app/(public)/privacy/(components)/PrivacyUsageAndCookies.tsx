"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Cookie, Globe2, Link2, LockKeyhole, RefreshCw, Settings, Share2, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const privacySections = [
  {
    number: "05",
    title: "How We Use Information",
    icon: Settings,
    description: "FoodHub uses collected information to operate the platform, provide requested services, process orders, maintain accounts, communicate with users, and improve our services.",
    points: [
      "Create and manage user and provider accounts.",
      "Process orders, cart activity, and related services.",
      "Improve platform functionality, performance, and user experience.",
      "Send important account, service, and order-related communications.",
    ],
  },
  {
    number: "06",
    title: "Information Sharing",
    icon: Share2,
    description: "FoodHub may share relevant information when necessary to provide services, support transactions, operate the platform, protect users, or comply with applicable legal requirements.",
    points: [
      "Share necessary order information with participating providers.",
      "Work with trusted service providers that support platform operations.",
      "Disclose information when required by applicable law or legal process.",
      "Protect FoodHub, users, providers, and the platform from misuse or fraud.",
    ],
  },
  {
    number: "07",
    title: "Cookies & Similar Technologies",
    icon: Cookie,
    description: "FoodHub may use cookies and similar technologies to maintain authentication sessions, remember preferences, support security, and understand how the platform is used.",
    points: [
      "Authentication and session management.",
      "Remembering relevant preferences and settings.",
      "Supporting security and preventing unauthorized activity.",
      "Understanding platform usage and improving functionality.",
    ],
  },
  {
    number: "08",
    title: "Third-Party Services",
    icon: Globe2,
    description: "FoodHub may rely on selected third-party services for infrastructure, authentication, image storage, payments, analytics, communication, or other functionality required to operate the platform.",
    points: [
      "Third-party authentication and account services.",
      "Cloud storage and image hosting services.",
      "Payment and transaction processing services where applicable.",
      "Infrastructure, analytics, communication, and security services.",
    ],
  },
];

const PrivacyUsageAndCookies = () => {
  return (
    <section className="relative overflow-hidden bg-orange-50/40 py-20 dark:bg-orange-950/10">
      <div className="pointer-events-none absolute -right-32 top-20 size-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-900/10" />
      <div className="pointer-events-none absolute -left-32 bottom-20 size-72 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-900/10" />

      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute right-[8%] top-28 hidden size-20 rounded-full border border-orange-200/40 sm:block dark:border-orange-800/20" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute bottom-32 left-[7%] hidden size-14 rounded-full border border-orange-200/40 sm:block dark:border-orange-800/20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-orange-700 shadow-sm hover:bg-white dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400 dark:hover:bg-orange-950/40">
            <UtensilsCrossed className="size-4" />
            Usage, Cookies &amp; Services
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            How We Use Your <span className="text-orange-600 dark:text-orange-400">Information</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            Understanding how information is used and shared helps you make informed decisions about your FoodHub experience.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {privacySections.map((section, index) => {
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
                            <CheckCircle2 className="size-3.5" />
                          </div>

                          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {point}
                          </p>
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
              <motion.div animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <Cookie className="size-5" />
              </motion.div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Cookies help keep FoodHub convenient and secure
                  </h3>
                  <Sparkles className="hidden size-4 text-orange-500 sm:block dark:text-orange-400" />
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Cookies and similar technologies may support authentication, session management, security, preferences, and platform functionality. You can manage cookie settings through your browser where supported.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-1 border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-800/60 dark:bg-orange-950/30 dark:text-orange-400">
                    <LockKeyhole className="size-3" />
                    Security
                  </Badge>

                  <Badge variant="outline" className="gap-1 border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-800/60 dark:bg-orange-950/30 dark:text-orange-400">
                    <RefreshCw className="size-3" />
                    Sessions
                  </Badge>

                  <Badge variant="outline" className="gap-1 border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-800/60 dark:bg-orange-950/30 dark:text-orange-400">
                    <Link2 className="size-3" />
                    Preferences
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyUsageAndCookies;