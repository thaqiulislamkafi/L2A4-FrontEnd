"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Ban, Copyright, FileWarning, Gavel, LockKeyhole, Scale, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const legalSections = [
  {
    number: "09",
    title: "Prohibited Activities",
    icon: Ban,
    description: "Users and providers must not misuse FoodHub or use the platform for unlawful, fraudulent, abusive, or harmful activities.",
    points: ["Do not attempt unauthorized access to accounts or systems.", "Do not use FoodHub for fraudulent or unlawful activities.", "Do not interfere with the security or normal operation of the platform.", "Do not impersonate another person or provide intentionally misleading information."],
  },
  {
    number: "10",
    title: "Intellectual Property",
    icon: Copyright,
    description: "FoodHub's branding, interface, original content, graphics, software, and other platform materials may be protected by applicable intellectual-property laws.",
    points: ["FoodHub branding and logos may not be used without permission.", "Do not copy, reproduce, or redistribute protected platform content without authorization.", "Users retain applicable rights to content they independently own and submit.", "Submitted content must not infringe the intellectual-property rights of others."],
  },
  {
    number: "11",
    title: "Disclaimer",
    icon: FileWarning,
    description: "FoodHub provides a platform for connecting users with meal providers. Information supplied by providers may change and should be reviewed before placing an order.",
    points: ["Meal information is primarily provided by participating providers.", "Availability, pricing, and other details may change.", "FoodHub does not guarantee uninterrupted platform availability.", "Users should review relevant meal and provider information before ordering."],
  },
  {
    number: "12",
    title: "Limitation of Liability",
    icon: Scale,
    description: "To the extent permitted by applicable law, FoodHub's responsibility may be limited regarding indirect losses or issues arising from interactions between users and providers.",
    points: ["FoodHub is not responsible for circumstances outside its reasonable control.", "Users and providers remain responsible for their own actions and obligations.", "Liability limitations apply only to the extent permitted by applicable law.", "Nothing in these terms removes rights that cannot legally be excluded."],
  },
  {
    number: "13",
    title: "Account Termination",
    icon: LockKeyhole,
    description: "FoodHub may restrict, suspend, or terminate accounts when necessary to protect the platform, users, providers, or comply with applicable requirements.",
    points: ["Users may stop using FoodHub at any time.", "Accounts may be restricted for violations of these terms.", "Fraudulent or abusive activity may result in account termination.", "Termination does not necessarily remove obligations that arose before termination."],
  },
  {
    number: "14",
    title: "Changes to These Terms",
    icon: AlertTriangle,
    description: "FoodHub may update these Terms & Conditions as the platform, services, or applicable requirements evolve.",
    points: ["Updated terms may be published on this page.", "The 'Last Updated' date will indicate when the terms were most recently revised.", "Continued use of FoodHub after applicable changes may constitute acceptance.", "Users should periodically review these terms for updates."],
  },
  {
    number: "15",
    title: "Governing Law",
    icon: Gavel,
    description: "These Terms & Conditions should be interpreted and applied according to the applicable laws and regulations governing FoodHub and its users.",
    points: ["Applicable law governs the interpretation of these terms.", "Disputes should first be addressed through good-faith communication where appropriate.", "Any applicable jurisdictional requirements will be respected.", "Mandatory legal rights and protections remain unaffected."],
  },
];

const TermsLegal = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-background">
      <div className="pointer-events-none absolute -left-32 top-1/4 size-80 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-900/10" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 size-80 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-900/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700 hover:bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400 dark:hover:bg-orange-950/30">
            <Gavel className="size-4" />
            Legal Information
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Legal Terms &amp; <span className="text-orange-600 dark:text-orange-400">Protections</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            The following provisions explain acceptable platform use, intellectual property, liability, account termination, updates, and the legal framework surrounding FoodHub.
          </p>
        </motion.div>

        <div className="space-y-5">
          {legalSections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div key={section.number} initial={{ opacity: 0, x: index % 2 === 0 ? -25 : 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: index * 0.06 }}>
                <Card className="group overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-950/10 dark:border-orange-900/40 dark:bg-orange-950/10 dark:hover:border-orange-800/60">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <motion.div whileHover={{ scale: 1.08, rotate: 4 }} transition={{ duration: 0.25 }} className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-950/60 dark:text-orange-400 dark:group-hover:bg-orange-600 dark:group-hover:text-white">
                        <Icon className="size-6" />
                      </motion.div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="border-orange-200 text-xs font-semibold text-orange-600 dark:border-orange-800/60 dark:text-orange-400">
                            Section {section.number}
                          </Badge>
                        </div>

                        <CardTitle className="text-xl text-slate-900 dark:text-white">
                          {section.title}
                        </CardTitle>
                      </div>

                      <ShieldAlert className="hidden size-5 shrink-0 text-orange-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500 sm:block dark:text-orange-800 dark:group-hover:text-orange-500" />
                    </div>
                  </CardHeader>

                  <CardContent className="pl-20">
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {section.description}
                    </p>

                    <Separator className="my-5 bg-orange-100 dark:bg-orange-900/40" />

                    <div className="grid gap-3 sm:grid-cols-2">
                      {section.points.map((point, pointIndex) => (
                        <motion.div key={point} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 + pointIndex * 0.07 }} className="flex items-start gap-3 rounded-xl border border-orange-100/80 bg-orange-50/40 p-3 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 dark:border-orange-900/30 dark:bg-orange-950/20 dark:hover:border-orange-800/50 dark:hover:bg-orange-950/30">
                          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/70 dark:text-orange-400">
                            <span className="size-1.5 rounded-full bg-orange-500" />
                          </div>
                          <p className="text-sm leading-5 text-slate-600 dark:text-slate-400">{point}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8">
          <Card className="border-orange-200/70 bg-gradient-to-r from-orange-50 to-white shadow-sm dark:border-orange-900/40 dark:from-orange-950/30 dark:to-background">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <ShieldAlert className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Important legal notice
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  These provisions are intended to describe the general rules governing FoodHub. They should be reviewed alongside any applicable laws, service-specific policies, and order-related terms.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsLegal;