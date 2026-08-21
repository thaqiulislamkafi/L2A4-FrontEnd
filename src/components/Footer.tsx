"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {Mail,MapPin,Phone,ArrowRight,Utensils,
} from "lucide-react";

import {FaFacebook,FaYoutube,FaInstagram, FaLinkedin} from "react-icons/fa"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const footerLinks = {
  platform: [
    { label: "Explore Meals", href: "/meals" },
    { label: "Categories", href: "/categories" },
    { label: "Cuisine Types", href: "/cuisines" },
    { label: "Dietary Options", href: "/dietary-types" },
  ],

  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "About FoodHub", href: "/about" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    icon: FaFacebook,
    href: "#",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "#",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-orange-100 bg-background dark:border-orange-950/40">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-orange-50/70 via-background to-orange-50/30 dark:from-orange-950/20 dark:via-background dark:to-orange-950/10" />

      {/* Decorative Blur */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl dark:bg-orange-500/10" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl dark:bg-orange-500/10" />

      <div className=" relative mx-auto px-4">
        {/* =========================
            Main Footer
        ========================= */}

        <div className="grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-4">
          {/* =========================
              Brand
          ========================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Brand */}
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-600/20 transition-transform duration-300 group-hover:scale-105">
                <Utensils className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Food<span className="text-orange-600">Hub</span>
                </h3>

                <p className="text-xs text-muted-foreground">
                  Discover. Order. Enjoy.
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
              Discover delicious meals from trusted providers, explore
              different cuisines, and enjoy your favorite food through
              FoodHub.
            </p>

            {/* Contact Information */}
            <div className="mt-7 space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                  <Mail className="h-4 w-4" />
                </div>

                <span>support@foodhub.com</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                  <Phone className="h-4 w-4" />
                </div>

                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                  <MapPin className="h-4 w-4" />
                </div>

                <span>Chattogram, Bangladesh</span>
              </div>
            </div>
          </motion.div>

          {/* =========================
              Platform
          ========================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
            >
              FoodHub
            </Badge>

            <h4 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Explore
            </h4>

            <ul className="mt-6 space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    <ArrowRight className="h-4 w-4 text-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

                    <span className="-ml-6 transition-all duration-300 group-hover:ml-0">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* =========================
              Support
          ========================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
            >
              Support
            </Badge>

            <h4 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Need Help?
            </h4>

            <ul className="mt-6 space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    <ArrowRight className="h-4 w-4 text-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

                    <span className="-ml-6 transition-all duration-300 group-hover:ml-0">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* =========================
              Newsletter
          ========================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Badge
              className="border-orange-200 bg-orange-600 text-white hover:bg-orange-600"
            >
              Stay Connected
            </Badge>

            <h4 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Get Food Updates
            </h4>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Subscribe to receive updates about new meals, providers,
              special offers, and FoodHub announcements.
            </p>

            {/* Newsletter Form */}
            <form className="mt-6 space-y-3">
              <div className="space-y-2">
                <Label
                  htmlFor="footer-email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </Label>

                <Input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 rounded-xl border-orange-100 bg-background/80 transition-all focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-950/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-orange-600 font-medium text-white shadow-md shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-100 bg-background transition-all duration-300 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 hover:shadow-lg hover:shadow-orange-500/10 dark:border-orange-950/50 dark:bg-orange-950/10 dark:hover:bg-orange-950/30 dark:hover:text-orange-400"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* =========================
            Bottom Bar
        ========================= */}

        <div className="flex flex-col gap-5 border-t border-orange-100 py-8 text-sm text-muted-foreground dark:border-orange-950/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-orange-600">
              FoodHub
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
            >
              Privacy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}