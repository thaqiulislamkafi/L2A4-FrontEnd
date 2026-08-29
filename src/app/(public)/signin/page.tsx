/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { motion } from "framer-motion";
import {
  ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles, ChefHat, Utensils, Salad, CircleUserRound,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Field, FieldContent, FieldError, FieldLabel,
} from "@/components/ui/field";
import { userLoginByEmailAndPassword } from "@/lib/api/auth";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);
  
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {

      try {
        const response = await userLoginByEmailAndPassword(value);

        console.log("Login response:", response);

        if (response.success) {
          toast.add({
            title: "Login successful",
            description: `Welcome back, ${response.data.name}.`,
            type: "success",
          });
          setUser(response.data);
          router.push("/");
        }

      } catch (error: any) {
        console.error("Login failed:", error);

        const message =
          error?.response?.data?.message ||
          "Invalid email or password.";

        toast.add({
          title: "Login failed",
          description: message,
          type: "error",
        });
      }
    },
  });

  return (
    <main className="min-h-screen overflow-hidden bg-orange-50/40 dark:bg-orange-950/10">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT SIDE — FOODHUB VISUAL
        ====================================================== */}
        <section className="relative hidden overflow-hidden bg-linear-to-br from-orange-500 via-orange-600 to-orange-700 lg:flex">
          {/* Decorative Background */}
          <div className="absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />

            <div className="absolute -bottom-40 -right-32 h-125 w-125 rounded-full bg-orange-900/20 blur-3xl" />

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-2xl"
            />
          </div>

          {/* Floating Decorative Elements */}
          <motion.div
            animate={{ y: [-12, 12, -12], rotate: [0, 8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[12%] top-[15%] flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md"
          >
            <ChefHat className="h-7 w-7 text-white" />
          </motion.div>

          <motion.div
            animate={{ y: [12, -12, 12], rotate: [0, -8, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[14%] top-[22%] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md"
          >
            <Salad className="h-6 w-6 text-white" />
          </motion.div>

          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, -10, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[20%] left-[15%] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md"
          >
            <Utensils className="h-6 w-6 text-white" />
          </motion.div>

          {/* Main Content */}
          <div className="relative flex w-full flex-col items-center justify-center px-12 py-16 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge className="border border-white/20 bg-white/15 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-md hover:bg-white/20">
                <Sparkles className="mr-2 h-4 w-4" />
                Welcome to FoodHub
              </Badge>
            </motion.div>

            {/* Animated Icon */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mt-10 flex h-28 w-28 items-center justify-center rounded-4xl border border-white/20 bg-white/15 shadow-2xl backdrop-blur-md"
            >
              <div className="absolute inset-3 rounded-3xl border border-white/10" />

              <ChefHat className="h-14 w-14 text-white" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-9 max-w-xl text-4xl font-bold tracking-tight text-white xl:text-5xl"
            >
              Delicious food,
              <br />
              <span className="text-orange-100">
                delivered with love.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 max-w-lg text-base leading-7 text-orange-50/90"
            >
              Discover delicious meals from trusted food providers,
              order your favorites, and enjoy a better food experience
              with FoodHub.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {["Fresh Meals", "Trusted Providers", "Easy Ordering"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md"
                  >
                    {item}
                  </span>
                )
              )}
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              animate={{ width: ["40%", "65%", "40%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-12 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </section>

        {/* =====================================================
            RIGHT SIDE — LOGIN FORM
        ====================================================== */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-8 lg:px-12">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-900/20"
            />

            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl dark:bg-orange-950/20"
            />
          </div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-md"
          >
            {/* Mobile Brand */}
            <div className="mb-10 flex items-center gap-3  lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-600/20">
                <ChefHat className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground">
                  FoodHub
                </h2>

                <p className="text-xs text-muted-foreground">
                  Deliciousness starts here
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <Badge
                variant="secondary"
                className="mb-5 border border-orange-100 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
              >
                <CircleUserRound className="mr-1.5 h-3.5 w-3.5" />
                Account Login
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Welcome back!
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Sign in to your FoodHub account and continue your
                delicious journey.
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();

                form.handleSubmit();
              }}
              className="space-y-5"
            >
              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Email address is required"
                      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ? "Please enter a valid email address"
                        : undefined,
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Email Address
                    </FieldLabel>

                    <FieldContent>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />

                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          placeholder="you@example.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          className="h-11 border-orange-100 bg-background pl-10 transition-all focus:border-orange-500 focus:ring-orange-500/20 dark:border-orange-950/50"
                        />
                      </div>

                      {field.state.meta.isTouched &&
                        !field.state.meta.isValid && (
                          <FieldError>
                            {field.state.meta.errors.join(", ")}
                          </FieldError>
                        )}
                    </FieldContent>
                  </Field>
                )}
              </form.Field>

              {/* Password */}
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Password is required"
                      : value.length < 6
                        ? "Password must be at least 6 characters"
                        : undefined,
                }}
              >
                {(field) => (
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>
                        Password
                      </FieldLabel>

                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-orange-600 transition-colors hover:text-orange-700 hover:underline dark:text-orange-400"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <FieldContent>
                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />

                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          className="h-11 border-orange-100 bg-background pl-10 pr-11 transition-all focus:border-orange-500 focus:ring-orange-500/20 dark:border-orange-950/50"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-orange-600"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {field.state.meta.isTouched &&
                        !field.state.meta.isValid && (
                          <FieldError>
                            {field.state.meta.errors.join(", ")}
                          </FieldError>
                        )}
                    </FieldContent>
                  </Field>
                )}
              </form.Field>

              {/* Sign In */}
              <form.Subscribe
                selector={(state) => [
                  state.canSubmit,
                  state.isSubmitting,
                ]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="group h-11 w-full bg-orange-600 font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30"
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}

                    {!isSubmitting && (
                      <ArrowRight className="ml-auto h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </Button>
                )}
              </form.Subscribe>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-background px-4 text-xs text-muted-foreground">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              {/* Google */}
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full border-orange-100 bg-background font-medium transition-all hover:border-orange-200 hover:bg-orange-50 dark:border-orange-950/50 dark:hover:bg-orange-950/20"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.99c2.63 0 4.84-.87 6.45-2.34l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.99Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.54 14.09a5.86 5.86 0 0 1 0-4.18V7.38H3.3a9.74 9.74 0 0 0 0 9.24l3.24-2.53Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.88c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 2.96 14.63 2 12 2a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 7.6 9.46 5.88 12 5.88Z"
                  />
                </svg>

                Sign in with Google
              </Button>
            </form>

            {/* Sign Up */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-orange-600 transition-colors hover:text-orange-700 hover:underline dark:text-orange-400"
              >
                Create an account
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
              By continuing, you agree to FoodHub&apos;s{" "}
              <Link
                href="/terms"
                className="text-orange-600 hover:underline dark:text-orange-400"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-orange-600 hover:underline dark:text-orange-400"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}