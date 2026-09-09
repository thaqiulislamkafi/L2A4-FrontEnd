"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Baby, CheckCircle2, Database, FilePenLine, Gavel, Globe2, KeyRound, LockKeyhole, Scale, ShieldAlert, ShieldCheck, UserRoundCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const privacySections = [
  {
    number: "09",
    title: "Data Security",
    icon: ShieldCheck,
    description: "FoodHub takes reasonable measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or loss.",
    points: [
      "Authentication and access controls help protect user accounts.",
      "Secure communication technologies may be used to protect information in transit.",
      "Access to personal information is limited to appropriate operational needs.",
      "Security measures may be improved as the platform and technology evolve.",
    ],
  },
  {
    number: "10",
    title: "Data Retention",
    icon: Database,
    description: "FoodHub may retain information for as long as reasonably necessary to provide services, maintain records, resolve disputes, prevent misuse, or satisfy applicable legal requirements.",
    points: [
      "Account information may be retained while your account remains active.",
      "Transaction and order information may be retained for operational purposes.",
      "Some records may need to be retained to meet legal or regulatory requirements.",
      "Information may be deleted or anonymized when it is no longer reasonably required.",
    ],
  },
  {
    number: "11",
    title: "Your Privacy Rights",
    icon: UserRoundCheck,
    description: "Depending on applicable law and your circumstances, you may have rights regarding the personal information FoodHub holds about you.",
    points: [
      "Request access to certain personal information.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of information where legally applicable.",
      "Ask questions or raise concerns about how your information is handled.",
    ],
  },
  {
    number: "12",
    title: "Children's Privacy",
    icon: Baby,
    description: "FoodHub is not intended for individuals who are not legally permitted to use the platform. We do not knowingly seek to collect personal information from children.",
    points: [
      "Users must meet applicable age and eligibility requirements.",
      "Parents or guardians can contact us with concerns about a child's information.",
      "We may take reasonable steps to address information collected contrary to applicable requirements.",
      "Additional legal protections may apply depending on the user's location.",
    ],
  },
  {
    number: "13",
    title: "Regional Privacy Requirements",
    icon: Globe2,
    description: "Privacy rights and obligations may vary depending on where you live. FoodHub seeks to handle personal information in accordance with applicable privacy and data-protection requirements.",
    points: [
      "Applicable local privacy laws may provide additional rights.",
      "Certain requests may require identity verification.",
      "Some rights may be subject to legal exceptions or limitations.",
      "FoodHub may update its practices when applicable requirements change.",
    ],
  },
  {
    number: "14",
    title: "Changes to This Privacy Policy",
    icon: FilePenLine,
    description: "FoodHub may update this Privacy Policy when our services, technologies, business practices, or applicable legal requirements change.",
    points: [
      "Updated versions may be published on this page.",
      "The 'Last Updated' date indicates the latest revision.",
      "Material changes may be communicated through appropriate channels where required.",
      "You should periodically review this policy for the latest information.",
    ],
  },
];

const PrivacySecurityAndRights = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-background">
      <div className="pointer-events-none absolute -left-32 top-1/4 size-80 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-900/10" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 size-80 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-900/10" />

      <motion.div animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute right-[7%] top-28 hidden size-16 rounded-2xl border border-orange-200/40 bg-orange-50/30 sm:block dark:border-orange-800/20 dark:bg-orange-950/10" />

      <motion.div animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="pointer-events-none absolute bottom-28 left-[7%] hidden size-12 rounded-full border border-orange-200/40 bg-orange-50/30 sm:block dark:border-orange-800/20 dark:bg-orange-950/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700 hover:bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400 dark:hover:bg-orange-950/30">
            <ShieldAlert className="size-4" />
            Security &amp; Privacy Rights
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Protecting Your <span className="text-orange-600 dark:text-orange-400">Privacy</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            Learn about our approach to data security, retention, privacy rights, childrens privacy, regional requirements, and policy updates.
          </p>
        </motion.div>

        <div className="space-y-5">
          {privacySections.map((section, index) => {
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

                      <LockKeyhole className="hidden size-5 shrink-0 text-orange-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500 sm:block dark:text-orange-800 dark:group-hover:text-orange-500" />
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
                            <CheckCircle2 className="size-3.5" />
                          </div>

                          <p className="text-sm leading-5 text-slate-600 dark:text-slate-400">
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

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8">
          <Card className="overflow-hidden border-orange-200/70 bg-gradient-to-r from-orange-50 to-white shadow-sm dark:border-orange-900/40 dark:from-orange-950/30 dark:to-background">
            <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
              <motion.div animate={{ scale: [1, 1.06, 1], rotate: [0, 2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <KeyRound className="size-6" />
              </motion.div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Your information deserves protection
                  </h3>
                  <ShieldCheck className="size-4 text-orange-500 dark:text-orange-400" />
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  FoodHub aims to use reasonable safeguards to protect personal information while continuously improving the security and privacy practices of the platform.
                </p>
              </div>

              <div className="hidden shrink-0 sm:block">
                <div className="flex size-11 items-center justify-center rounded-full border border-orange-200 bg-white text-orange-600 shadow-sm dark:border-orange-800/50 dark:bg-orange-950/30 dark:text-orange-400">
                  <LockKeyhole className="size-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-400 dark:text-slate-500">
          <Scale className="size-4 text-orange-400 dark:text-orange-500" />
          <span>Privacy rights and protections may vary according to applicable law.</span>
          <Gavel className="size-4 text-orange-400 dark:text-orange-500" />
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacySecurityAndRights;