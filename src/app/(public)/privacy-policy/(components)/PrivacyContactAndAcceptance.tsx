"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, CircleHelp, FileCheck2, LockKeyhole, Mail, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const privacyCommitments = [
  "We respect your personal information.",
  "We work to protect information through reasonable security measures.",
  "We explain how information may be collected and used.",
];

const PrivacyContactAndAcceptance = () => {
  return (
    <section className="relative overflow-hidden bg-orange-50/50 py-20 dark:bg-orange-950/10">
      <div className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-900/10" />
      <div className="pointer-events-none absolute -right-32 bottom-10 size-96 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-900/10" />

      <motion.div animate={{ x: [0, 12, 0], y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute right-[10%] top-24 hidden size-3 rounded-full bg-orange-400/50 sm:block" />

      <motion.div animate={{ x: [0, -10, 0], y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="pointer-events-none absolute bottom-32 left-[10%] hidden size-2 rounded-full bg-orange-500/40 sm:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-orange-700 shadow-sm hover:bg-white dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400 dark:hover:bg-orange-950/40">
            <CircleHelp className="size-4" />
            Privacy Support
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Questions About Your <span className="text-orange-600 dark:text-orange-400">Privacy?</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            If you have questions about this Privacy Policy, your information, or how FoodHub handles personal data, our team is here to help.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <Card className="group h-full overflow-hidden border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-950/10 dark:border-orange-900/40 dark:bg-orange-950/20 dark:hover:border-orange-800/60">
              <CardContent className="p-7">
                <motion.div whileHover={{ scale: 1.08, rotate: 4 }} transition={{ duration: 0.25 }} className="flex size-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-950/60 dark:text-orange-400 dark:group-hover:bg-orange-600 dark:group-hover:text-white">
                  <Mail className="size-7" />
                </motion.div>

                <Badge variant="outline" className="mt-5 border-orange-200 text-xs font-semibold text-orange-600 dark:border-orange-800/60 dark:text-orange-400">
                  Section 15
                </Badge>

                <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                  Contact Us About Privacy
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  You can contact FoodHub if you have questions about this Privacy Policy, want to understand how your information is handled, or wish to raise a privacy-related concern.
                </p>

                <Separator className="my-6 bg-orange-100 dark:bg-orange-900/40" />

                <div className="space-y-4">
                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50/60 p-3 transition-colors duration-300 hover:border-orange-200 dark:border-orange-900/40 dark:bg-orange-950/20 dark:hover:border-orange-800/60">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                      <Mail className="size-4" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                        Privacy Support
                      </p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        privacy@foodhub.com
                      </p>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50/60 p-3 transition-colors duration-300 hover:border-orange-200 dark:border-orange-900/40 dark:bg-orange-950/20 dark:hover:border-orange-800/60">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                      <MessageCircle className="size-4" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                        Privacy Questions
                      </p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        We are here to help
                      </p>
                    </div>
                  </motion.div>
                </div>

                <Link href="/contact" className="mt-6 inline-block">
                  <Button variant="outline" className="group gap-2 border-orange-200 px-5 text-orange-600 transition-all duration-300 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-800/60 dark:text-orange-400 dark:hover:bg-orange-950/50 dark:hover:text-orange-300">
                    Contact Us
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="relative h-full overflow-hidden border-orange-200 bg-gradient-to-br from-orange-600 via-orange-600 to-orange-700 text-white shadow-xl shadow-orange-600/20 dark:border-orange-800/60">
              <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-orange-950/20 blur-3xl" />

              <CardContent className="relative p-7">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, type: "spring", stiffness: 120 }} className="flex size-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <ShieldCheck className="size-7" />
                </motion.div>

                <Badge className="mt-5 border-white/20 bg-white/10 text-xs font-semibold text-white hover:bg-white/10">
                  Section 16
                </Badge>

                <h3 className="mt-2 text-xl font-bold">
                  Your Acknowledgement
                </h3>

                <p className="mt-2 text-sm leading-6 text-orange-50/90">
                  By accessing or using FoodHub, you acknowledge that you have read and understood this Privacy Policy and agree to the practices described in it.
                </p>

                <Separator className="my-6 bg-white/20" />

                <div className="space-y-4">
                  {privacyCommitments.map((item, index) => (
                    <motion.div key={item} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange-100" />
                      <p className="text-sm leading-6 text-orange-50/90">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/meals" className="flex-1">
                    <Button className="group w-full gap-2 bg-white font-semibold text-orange-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-700">
                      Explore FoodHub
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <Link href="/" className="flex-1">
                    <Button variant="outline" className="w-full gap-2 border-white/30 bg-white/10 font-semibold text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
                      <FileCheck2 className="size-4" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.25 }} className="mx-auto mt-10 max-w-4xl">
          <Card className="border-orange-200/70 bg-white/80 shadow-sm backdrop-blur-sm dark:border-orange-900/40 dark:bg-orange-950/20">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
              <motion.div animate={{ scale: [1, 1.06, 1], rotate: [0, 2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <LockKeyhole className="size-6" />
              </motion.div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Privacy is an ongoing commitment
                  </h3>
                  <Sparkles className="size-4 text-orange-500 dark:text-orange-400" />
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  As FoodHub evolves, our privacy practices may also change. We encourage you to review this page periodically so you remain informed about how your information is handled.
                </p>
              </div>

              <div className="hidden shrink-0 sm:block">
                <div className="flex size-11 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-800/50 dark:bg-orange-950/30 dark:text-orange-400">
                  <ShieldCheck className="size-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35 }} className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-400 dark:text-slate-500">
          <ShieldCheck className="size-4 text-orange-400 dark:text-orange-500" />
          <span>Your privacy matters throughout your FoodHub experience.</span>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyContactAndAcceptance;