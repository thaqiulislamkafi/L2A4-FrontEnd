/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { motion } from "framer-motion";
import {
  ArrowRight, Camera, CheckCircle2, ChefHat, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles, User, Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { uploadUserImage, userSignup } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth.store";

export default function SignupPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const uploadImageMutation = useMutation({
    mutationFn: uploadUserImage,
  });

  const signupMutation = useMutation({
    mutationFn: userSignup,

    onSuccess: (response) => {
      toast.add({
        title: "Account created successfully!",
        description: `Welcome to FoodHub, ${response.data.name}.`,
        type: "success",
      });
      setUser(response.data);
      router.push("/");
    },

    onError: (error: any) => {
      console.error("Signup failed:", error);

      toast.add({
        title: "Signup failed",
        description:
          error?.response?.data?.message ||
          "Unable to create your account.",
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
      role: "user",
    },

    onSubmit: async ({ value }) => {

      try {

        if (value.image) {
          const uploadResponse =
            await uploadImageMutation.mutateAsync(value.image);

          value.image = uploadResponse.data.imageUrl;
        }

        console.log(value) ;

        signupMutation.mutate(value);
      } catch (error: any) {
        console.error("Image upload failed:", error);

        toast.add({
          title: "Image upload failed",
          description:
            error?.response?.data?.message ||
            "Unable to upload your profile image.",
          type: "error",
        });
      }
    },
  });

  return (
    <main className="min-h-screen overflow-hidden bg-orange-50/40 dark:bg-orange-950/10">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none fixed rounded-full inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 70, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 rounded-full -right-40 h-96 w-96 bg-orange-400/20 blur-3xl"
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto flex min-h-screen items-center">
        <div className="grid w-full overflow-hidden border border-orange-100 bg-background shadow-xl shadow-orange-100/30 dark:border-orange-950/50 dark:shadow-orange-950/20 lg:grid-cols-2">
          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <section className="relative idden min-h-[720px] overflow-hidden bg-linear-to-br from-orange-500 via-orange-600 to-orange-700 lg:flex">
            {/* Decorative circles */}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/10"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full border border-white/10"
            />

            {/* Floating Icon */}

            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-12 top-24 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-md"
            >
              <ChefHat className="h-7 w-7" />
            </motion.div>

            <div className="relative  flex w-full flex-col p-10 xl:p-12">
              {/* Brand */}

              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                  <Utensils className="h-5 w-5" />
                </div>

                <span className="text-xl font-bold tracking-tight">
                  FoodHub
                </span>
              </motion.div>

              {/* Main Content */}

              <div className="mt-20">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <Badge className="border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md hover:bg-white/15">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Join FoodHub
                  </Badge>

                  <h1 className="mt-7 max-w-xl text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                    Good food,
                    <span className="block text-orange-100">
                      better experiences.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-lg text-base leading-relaxed text-orange-50/90 xl:text-lg">
                    Create your FoodHub account and discover delicious meals
                    from trusted food providers around Bangladesh.
                  </p>
                </motion.div>
              </div>

              {/* Illustration */}

              <div className="flex flex-1 items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex h-56 w-56 items-center justify-center rounded-full bg-white/10 shadow-2xl backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-5 rounded-full border border-dashed border-white/30"
                  />

                  <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/10">
                    <Utensils className="h-20 w-20 text-white" />
                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                    className="absolute right-0 top-8"
                  >
                    <Sparkles className="h-7 w-7 text-orange-100" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Benefits */}

              <div className="space-y-3">
                {[
                  "Discover delicious meals",
                  "Order from trusted providers",
                  "Manage your food journey easily",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                    }}
                    className="flex items-center gap-3 text-sm text-orange-50"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <section className="flex min-h-[720px] items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              {/* Header */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Mobile Brand */}

                <div className="mb-6 flex items-center gap-2 lg:hidden">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                    <Utensils className="h-5 w-5" />
                  </div>

                  <span className="text-xl font-bold">
                    Food<span className="text-orange-600">Hub</span>
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className="border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400"
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Create your account
                </Badge>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Join FoodHub
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Create an account and start exploring amazing meals.
                </p>
              </motion.div>

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                className="mt-8"
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <FieldGroup className="gap-5">
                  {/* Profile Image */}

                  <form.Field name="image">
                    {(field) => (
                      <Field>
                        <FieldLabel>Profile Image</FieldLabel>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 transition-all hover:border-orange-400 hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950/20"
                          >
                            {imagePreview ? (
                              <Image
                                src={imagePreview}
                                alt="Profile preview"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Camera className="h-7 w-7 text-orange-500 transition-transform group-hover:scale-110" />
                            )}
                          </button>

                          <div className="min-w-0">
                            <p className="text-sm font-medium">
                              Add a profile photo
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              JPG, PNG or WEBP
                            </p>

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                              className="mt-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/30"
                            >
                              Choose Image
                            </Button>
                          </div>
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;

                            field.handleChange(file);

                            if (file) {
                              const previewUrl = URL.createObjectURL(file);
                              setImagePreview(previewUrl);
                            } else {
                              setImagePreview(null);
                            }
                          }}
                        />
                      </Field>
                    )}
                  </form.Field>

                  {/* Name */}

                  <form.Field
                    name="name"
                    validators={{
                      onChange: ({ value }) =>
                        !value.trim()
                          ? "Name is required"
                          : value.trim().length < 2
                            ? "Name must contain at least 2 characters"
                            : undefined,
                    }}
                  >
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Full Name
                        </FieldLabel>

                        <div className="relative">
                          <User className="absolute left-3 top-1/2  h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            placeholder="Enter your full name"
                            className="h-11 pl-10"
                          />
                        </div>

                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <FieldError>
                              {field.state.meta.errors.join(", ")}
                            </FieldError>
                          )}
                      </Field>
                    )}
                  </form.Field>

                  {/* Email */}

                  <form.Field
                    name="email"
                    validators={{
                      onChange: ({ value }) =>
                        !value
                          ? "Email is required"
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

                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2  h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id={field.name}
                            name={field.name}
                            type="email"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            placeholder="you@example.com"
                            className="h-11 pl-10"
                          />
                        </div>

                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <FieldError>
                              {field.state.meta.errors.join(", ")}
                            </FieldError>
                          )}
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
                          : value.length < 8
                            ? "Password must contain at least 8 characters"
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

                        <PasswordInput field={field} />

                        <FieldDescription>
                          Use at least 8 characters for a secure password.
                        </FieldDescription>

                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <FieldError>
                              {field.state.meta.errors.join(", ")}
                            </FieldError>
                          )}
                      </Field>
                    )}
                  </form.Field>

                  {/* Sign Up */}

                  <Button
                    type="submit"
                    disabled={signupMutation.isPending}
                    className="h-11 w-full bg-orange-600 font-semibold text-white shadow-md shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {signupMutation.isPending ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />
                        Signing up...
                      </>
                    ) : (
                      <>
                        Sign Up
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300" />
                      </>
                    )}
                  </Button>

                  {/* Divider */}

                  <div className="flex items-center gap-3">
                    <Separator className="flex-1" />

                    <span className="shrink-0 text-xs text-muted-foreground">
                      OR CONTINUE WITH
                    </span>

                    <Separator className="flex-1" />
                  </div>

                  {/* Google */}

                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full border-orange-100 font-medium transition-all hover:border-orange-200 hover:bg-orange-50 dark:border-orange-950/50 dark:hover:bg-orange-950/20"
                  >
                    <GoogleIcon />
                    Sign Up with Google
                  </Button>
                </FieldGroup>
              </form>

              {/* =================================================
                  FOOTER
              ================================================== */}

              <div className="mt-7 space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-orange-600 hover:text-orange-700 hover:underline dark:text-orange-400"
                  >
                    Sign in
                  </Link>
                </p>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-orange-500" />
                  Your information is securely protected
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   PASSWORD INPUT
============================================================ */

function PasswordInput({ field }: { field: any }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <LockKeyhole className="absolute left-3 top-1/2  h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        id={field.name}
        name={field.name}
        type={showPassword ? "text" : "password"}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        placeholder="Enter your password"
        className="h-11 pl-10 pr-10"
      />

      <button
        type="button"
        onClick={() => setShowPassword((value) => !value)}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground transition-colors hover:text-orange-600"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

/* ============================================================
   GOOGLE ICON
============================================================ */

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.72-.06-1.41-.18-2.07H12v3.92h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.22Z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.5Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.59A5.86 5.86 0 0 1 6.23 12c0-.55.1-1.09.31-1.59V7.89H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.11l3.24-2.52Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.52C7.31 8.1 9.46 6.38 12 6.38Z"
      />
    </svg>
  );
}