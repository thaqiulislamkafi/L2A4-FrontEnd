"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleUserRound, FileCheck2, Info, UserCheck, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const overviewSections = [
  {
    icon: Info,
    number: "01",
    title: "Introduction",
    description: "By accessing or using FoodHub, you agree to follow these Terms & Conditions. These terms apply to everyone who visits, registers, or uses our platform and services.",
    points: ["These terms govern your use of FoodHub.", "Using FoodHub means you accept these terms.", "Please review these terms before using our services."],
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Eligibility",
    description: "You must meet the applicable requirements to create an account and use FoodHub. You are responsible for ensuring that the information you provide is accurate.",
    points: ["Provide accurate and complete information.", "Use FoodHub only for lawful purposes.", "You are responsible for maintaining the accuracy of your account information."],
  },
  {
    icon: CircleUserRound,
    number: "03",
    title: "Account Responsibilities",
    description: "Some FoodHub features require an account. You are responsible for protecting your account information and for activities performed through your account.",
    points: ["Keep your account credentials secure.", "Do not share your account with unauthorized individuals.", "Notify FoodHub if you suspect unauthorized account activity."],
  },
  {
    icon: UsersRound,
    number: "04",
    title: "User Responsibilities",
    description: "Every FoodHub user is expected to interact respectfully and use the platform responsibly while following applicable laws and these Terms & Conditions.",
    points: ["Respect other users and providers.", "Do not misuse or interfere with FoodHub services.", "Do not submit misleading or harmful information."],
  },
];

const TermsOverview = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-background">
      <div className="pointer-events-none absolute left-0 top-1/3 size-72 -translate-x-1/2 rounded-full bg-orange-100/60 blur-3xl dark:bg-orange-950/20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700 hover:bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400 dark:hover:bg-orange-950/30">
            <FileCheck2 className="size-4" />
            General Terms
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Understanding Your <span className="text-orange-600 dark:text-orange-400">Responsibilities</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            These foundational terms explain what you can expect from FoodHub and what we expect from everyone using our platform.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {overviewSections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div key={section.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }} className="h-full">
                <Card className="group h-full overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 transition-all duration-300 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-950/10 dark:border-orange-900/40 dark:bg-orange-950/10 dark:hover:border-orange-800/60">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-950/60 dark:text-orange-400 dark:group-hover:bg-orange-600 dark:group-hover:text-white">
                          <Icon className="size-6" />
                        </div>

                        <div>
                          <Badge variant="outline" className="mb-1 border-orange-200 text-xs font-semibold text-orange-600 dark:border-orange-800/60 dark:text-orange-400">
                            Section {section.number}
                          </Badge>
                          <CardTitle className="text-xl text-slate-900 dark:text-white">
                            {section.title}
                          </CardTitle>
                        </div>
                      </div>

                      <CheckCircle2 className="size-5 text-orange-300 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-500 dark:text-orange-800 dark:group-hover:text-orange-500" />
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
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <FileCheck2 className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Please read these terms carefully</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  By continuing to use FoodHub, you acknowledge that you have read, understood, and agreed to comply with these Terms &amp; Conditions.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOverview;