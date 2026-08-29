"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {ArrowRight,ChefHat,Heart,Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ContactCTA = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden rounded-4xl border-orange-200 bg-orange-600 text-white shadow-2xl shadow-orange-600/20 dark:border-orange-900">
          {/* Background decorations */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute right-20 top-10 opacity-10"
            >
              <ChefHat className="h-40 w-40" />
            </motion.div>
          </div>

          <CardContent className="relative px-6 py-14 text-center sm:px-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="rounded-full border-white/20 bg-white/15 px-4 py-2 text-white backdrop-blur-sm hover:bg-white/20">
                <Sparkles className="mr-2 h-4 w-4" />
                FoodHub Community
              </Badge>

              <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Have Something to Share?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
                Your feedback helps us make FoodHub better. Tell us about
                your experience, suggest a new feature, or simply share
                what you love about our platform.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  
                  size="lg"
                  className="group h-12 rounded-xl bg-white px-7 font-semibold text-orange-600 shadow-lg hover:bg-orange-50"
                >
                  <Link href="/meals">
                    Explore Meals
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>

                <div className="flex items-center gap-2 text-sm text-orange-50">
                  <Heart className="h-4 w-4 fill-current" />
                  Made for food lovers
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactCTA;