"use client";

import { motion } from "framer-motion";
import {Clock3,Mail,MapPin,MessageSquare,Phone,Send,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactInformation = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@foodhub.com",
    description: "We'll respond within 24 hours.",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1700-000000",
    description: "Available during business hours.",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "Chattogram, Bangladesh",
    description: "Serving food lovers across Bangladesh.",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    value: "9:00 AM – 10:00 PM",
    description: "Saturday – Thursday",
  },
];

const MainContact = () => {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Decorative background */}
      <motion.div
        animate={{
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl"
      />

      <motion.div
        animate={{
          rotate: [0, -8, 8, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl"
      />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* =====================================
              LEFT SIDE
          ===================================== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <Badge
              variant="outline"
              className="rounded-full border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact FoodHub
            </Badge>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              We are Here to{" "}
              <span className="text-orange-600 dark:text-orange-500">
                Help
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Whether you have a question about a meal, an order, your
              account, or simply want to share your feedback, feel free
              to reach out.
            </p>

            {/* Contact Information */}
            <div className="mt-10 space-y-4">
              {contactInformation.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    whileHover={{ x: 5 }}
                    className="group flex gap-4 rounded-2xl border border-orange-100 bg-orange-50/50 p-4 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 hover:shadow-md dark:border-orange-950/40 dark:bg-orange-950/10 dark:hover:border-orange-900/70 dark:hover:bg-orange-950/20"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-transform duration-300 group-hover:scale-110 dark:bg-orange-950/50 dark:text-orange-400">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {item.title}
                      </Label>

                      <p className="mt-1 font-semibold text-foreground">
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* =====================================
              RIGHT SIDE - FORM
          ===================================== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <Card className="overflow-hidden rounded-3xl border-orange-100 bg-background shadow-xl shadow-orange-100/20 dark:border-orange-950/40 dark:shadow-orange-950/10">
              <CardHeader className="border-b border-orange-100 bg-orange-50/60 p-6 sm:p-8 dark:border-orange-950/40 dark:bg-orange-950/10">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-600/20">
                    <Send className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Send Us a Message
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Fill out the form and we will get back to you soon.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8">
                <form className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Your Name
                      </Label>

                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className="h-12 rounded-xl border-orange-100 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-950/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address
                      </Label>

                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-12 rounded-xl border-orange-100 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-950/50"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Subject
                    </Label>

                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="h-12 rounded-xl border-orange-100 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-950/50"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message
                    </Label>

                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      className="min-h-40 resize-none rounded-xl border-orange-100 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-950/50"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full rounded-xl bg-orange-600 font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainContact;