"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Utensils, } from "lucide-react";

import { Badge, HeaderBadge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const workCards = [
  {
    id: 1,
    icon: "https://img.icons8.com/fluency/96/search.png",
    title: "Discover Meals",
    subtitle:
      "Explore a variety of delicious meals from local kitchens and discover dishes that match your taste.",
  },
  {
    id: 2,
    icon: "https://img.icons8.com/color/96/shopping-cart--v1.png",
    title: "Add to Your Cart",
    subtitle:
      "Choose your favorite meals, select the quantity you want, and add them to your cart effortlessly.",
  },
  {
    id: 3,
    icon: "https://img.icons8.com/color/96/credit-card.png",
    title: "Place Your Order",
    subtitle:
      "Review your order details and complete your purchase through a simple and secure checkout process.",
  },
  {
    id: 4,
    icon: "https://img.icons8.com/color/96/restaurant.png",
    title: "Enjoy Your Meal",
    subtitle:
      "Sit back, receive your delicious meal, and enjoy a great food experience with FoodHub.",
  },
];

const HowFoodHubWorks = () => {
  return (
    <section className="py-30 bg-orange-50/60 transition-colors">

      <div className="mx-auto max-w-6xl px-6">
        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex justify-center">
            <HeaderBadge>
              <Utensils className="h-4 w-4" />
              Simple Process
            </HeaderBadge>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            How FoodHub Works
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-600">
            From discovering your favorite dishes to enjoying them at your
            table, FoodHub makes ordering delicious food simple and convenient.
          </p>
        </motion.div>

        {/* ================= CARDS ================= */}

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {workCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <Card className="group h-full  border-orange-100 bg-orange-100/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100">

                <CardHeader>
                  {/* Icon */}

                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 transition-colors duration-300 group-hover:bg-orange-200">
                    <div className="relative h-12 w-12">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Step */}

                  <div className="mb-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <CardTitle className="text-xl font-bold text-slate-800">
                    {card.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {card.subtitle}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ================= BOTTOM CTA ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.4,
          }}
          className="mt-12 text-center"
        >
          <p className="text-sm font-medium text-slate-500">
            Delicious food is just a few clicks away.
            <span className="ml-1 font-semibold text-orange-600">
              Start exploring FoodHub today.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowFoodHubWorks;