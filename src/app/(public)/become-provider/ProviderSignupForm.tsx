/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AtSign,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import ProviderImageUpload from "./ProviderImageUpload";

import {
  uploadUserImage,
  userSignup,
} from "@/lib/api/auth";

import { toast } from "@/components/ui/toast";

export default function ProviderSignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  /*
   * Image upload mutation
   */
  const imageUploadMutation = useMutation({
    mutationFn: uploadUserImage,
  });

  /*
   * Provider signup mutation
   */
  const signupMutation = useMutation({
    mutationFn: userSignup,

    onSuccess: (response) => {
      toast.add({
        title: "Provider account created!",
        description: `Welcome to FoodHub, ${response.data.name}.`,
        type: "success",
      });

      router.push("/signin");
    },

    onError: (error: any) => {
      console.error("Provider signup failed:", error);

      toast.add({
        title: "Registration failed",
        description:
          error?.response?.data?.message ||
          "Unable to create your provider account.",
        type: "error",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      image: null as File | null,
      name: "",
      email: "",
      password: "",
      role: "provider" as const,
      contact: "",
      age: "",
      address: "",
    },

    onSubmit: async ({ value }) => {
        
      try {
        if(!value) return
        let imageUrl: string | null = null;

        /*
         * Upload image first
         */
        if (value.image) {
          const imageResponse =
            await imageUploadMutation.mutateAsync(value.image);

          imageUrl = imageResponse.data.imageUrl;
        }

        /*
         * Provider registration payload
         */
        const signupData = {
          name: value.name,
          email: value.email,
          password: value.password,
          role: "provider",
          contact: value.contact || null,
          age: value.age ? Number(value.age) : null,
          address: value.address || null,
          image: imageUrl,
        };

        await signupMutation.mutateAsync(signupData);
      } catch (error: any) {
        console.error("Provider registration failed:", error);

        /*
         * If signupMutation already handles the error,
         * don't show another toast here.
         */
        if (!signupMutation.isError) {
          toast.add({
            title: "Registration failed",
            description:
              error?.response?.data?.message ||
              "Something went wrong. Please try again.",
            type: "error",
          });
        }
      }
    },
  });

  const isSubmitting = signupMutation.isPending || imageUploadMutation.isPending;

  return (
    <section
      id="provider-registration"
      className="relative overflow-hidden bg-linear-to-b from-white via-orange-50/30 to-white py-20 dark:from-background dark:via-orange-950/10 dark:to-background"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"
        />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-orange-200 bg-orange-50 px-4 py-2 text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-400"
          >
            <ShieldCheck className="h-4 w-4" />
            Provider Registration
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Start Your{" "}
            <span className="text-orange-600">
              FoodHub Provider Journey
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            Create your provider account and start sharing your delicious
            meals with the FoodHub community.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="overflow-hidden rounded-3xl border-orange-100 bg-white/90 shadow-xl shadow-orange-900/5 backdrop-blur-xl dark:border-orange-900/40 dark:bg-slate-900/90">
            {/* Card Header */}
            <CardHeader className="border-b border-orange-100 bg-orange-50/40 p-6 sm:p-8 dark:border-orange-900/40 dark:bg-orange-950/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Provider Information
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill in your information to create your provider
                    account.
                  </p>
                </div>

                <Badge className="w-fit gap-1.5 bg-orange-600 px-3 py-1.5 text-white hover:bg-orange-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Provider Account
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  form.handleSubmit();
                }}
                className="space-y-8"
              >
                {/* Profile Image */}
                <form.Field name="image">
                  {(field) => (
                    <ProviderImageUpload
                      value={field.state.value}
                      onChange={field.handleChange}
                    />
                  )}
                </form.Field>

                <Separator />

                {/* Basic Information */}
                <div>
                  <div className="mb-5">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Basic Information
                    </h4>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Tell us a little about yourself.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Name */}
                    <form.Field name="name">
                      {(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>
                            Full Name
                          </Label>

                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />

                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) =>
                                field.handleChange(
                                  event.target.value
                                )
                              }
                              placeholder="Enter your full name"
                              className="h-11 rounded-xl border-orange-100 pl-10 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-900/50"
                            />
                          </div>
                        </div>
                      )}
                    </form.Field>

                    {/* Email */}
                    <form.Field name="email">
                      {(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>
                            Email Address
                          </Label>

                          <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type="email"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) =>
                                field.handleChange(
                                  event.target.value
                                )
                              }
                              placeholder="you@example.com"
                              className="h-11 rounded-xl border-orange-100 pl-10 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-900/50"
                            />
                          </div>
                        </div>
                      )}
                    </form.Field>

                    {/* Password */}
                    <form.Field name="password">
                      {(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>
                            Password
                          </Label>

                          <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type={
                                showPassword
                                  ? "text"
                                  : "password"
                              }
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) =>
                                field.handleChange(
                                  event.target.value
                                )
                              }
                              placeholder="Create a strong password"
                              className="h-11 rounded-xl border-orange-100 pl-10 pr-11 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-900/50"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword(
                                  (previous) => !previous
                                )
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-orange-600"
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
                        </div>
                      )}
                    </form.Field>

                    {/* Contact */}
                    <form.Field name="contact">
                      {(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>
                            Contact Number
                          </Label>

                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />

                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) =>
                                field.handleChange(
                                  event.target.value
                                )
                              }
                              placeholder="+8801XXXXXXXXX"
                              className="h-11 rounded-xl border-orange-100 pl-10 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-900/50"
                            />
                          </div>
                        </div>
                      )}
                    </form.Field>

                    {/* Age */}
                    <form.Field name="age">
                      {(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>
                            Age
                          </Label>

                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type="number"
                              min={18}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) =>
                                field.handleChange(
                                  event.target.value
                                )
                              }
                              placeholder="Enter your age"
                              className="h-11 rounded-xl border-orange-100 pl-10 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-900/50"
                            />
                          </div>
                        </div>
                      )}
                    </form.Field>

                    {/* Address */}
                    <form.Field name="address">
                      {(field) => (
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={field.name}>
                            Address
                          </Label>

                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-orange-500" />

                            <Textarea
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) =>
                                field.handleChange(
                                  event.target.value
                                )
                              }
                              placeholder="Enter your full address"
                              rows={4}
                              className="resize-none rounded-xl border-orange-100 pl-10 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-900/50"
                            />
                          </div>
                        </div>
                      )}
                    </form.Field>
                  </div>
                </div>

                <Separator />

                {/* Account Information */}
                <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5 dark:border-orange-900/40 dark:bg-orange-950/10">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md shadow-orange-600/20">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Provider Account
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Your account will automatically be registered
                        with the{" "}
                        <span className="font-semibold text-orange-600">
                          Provider
                        </span>{" "}
                        role.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group h-12 w-full rounded-xl bg-orange-600 px-8 font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />

                        {imageUploadMutation.isPending
                          ? "Uploading image..."
                          : "Creating provider..."}
                      </>
                    ) : (
                      <>
                        Create Provider Account

                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}