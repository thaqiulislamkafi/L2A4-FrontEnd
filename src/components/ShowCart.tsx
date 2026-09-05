"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { getCartItemsByUserId } from "@/lib/api/cart";
import { deleteCartItem } from "@/lib/api/cartItem";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "@/components/ui/toast";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

interface ShowCartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShowCart = ({ open, onOpenChange }: ShowCartProps) => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["cart-items", userId],
    queryFn: () => getCartItemsByUserId(userId as string),
    enabled: Boolean(userId) && open,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: async () => {
      toast.add({
        title: "Cart Item Removed",
        description: "The item has been removed from your cart.",
        type: "success",
      });

      await queryClient.invalidateQueries({
        queryKey: ["cart-items", userId],
      });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;

      toast.add({
        title: "Unable to Remove Cart Item",
        description: message || "Please try again.",
        type: "error",
      });
    },
  });

  const cartItems = data?.data ?? [];
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col border-orange-200 bg-orange-50/95 p-0 backdrop-blur-xl sm:max-w-md dark:border-orange-900/50 dark:bg-orange-950/95">
        <SheetHeader className="border-b border-orange-200/70 bg-white/70 px-5 py-5 dark:border-orange-900/50 dark:bg-orange-950/40">
          <div className="flex items-center justify-between pr-6">
            <div className="space-y-1">
              <SheetTitle className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <ShoppingBag className="size-5 text-orange-600 dark:text-orange-400" />
                My Cart
              </SheetTitle>
              <SheetDescription className="text-sm text-slate-500 dark:text-slate-400">
                {userId ? "Review your selected meals before checkout." : "Sign in to view your cart."}
              </SheetDescription>
            </div>

            {userId && !isLoading && !isError && (
              <Badge className="border border-orange-200 bg-orange-100 text-orange-700 hover:bg-orange-100 dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-400">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </Badge>
            )}
          </div>
        </SheetHeader>

        {!userId ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm dark:bg-orange-950/60 dark:text-orange-400">
              <ShoppingBag className="size-7" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Your cart is waiting</h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              Please sign in to view your cart and continue with your order.
            </p>

            <Link href="/signin" className="mt-6">
              <Button className="gap-2 bg-orange-600 px-6 text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700">
                Sign In
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        ) : isLoading ? (
          <div className="flex-1 space-y-4 px-5 py-5">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="border-orange-200/70 bg-orange-50 shadow-sm dark:border-orange-900/40 dark:bg-orange-950/20">
                <CardContent className="flex gap-4 p-4">
                  <Skeleton className="size-20 shrink-0 rounded-xl bg-orange-100 dark:bg-orange-950/50" />
                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4 bg-orange-100 dark:bg-orange-950/50" />
                      <Skeleton className="h-3 w-1/2 bg-orange-100 dark:bg-orange-950/50" />
                    </div>
                    <Skeleton className="h-4 w-1/3 bg-orange-100 dark:bg-orange-950/50" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError || !data?.success ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <ShoppingBag className="size-7" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Unable to load cart</h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              Something went wrong while loading your cart. Please try again.
            </p>

            <Button type="button" variant="outline" onClick={() => refetch()} className="mt-6 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800/60 dark:text-orange-400 dark:hover:bg-orange-950/40">
              Try Again
            </Button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              <ShoppingBag className="size-7" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Your cart is empty</h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              Discover delicious meals and add your favorites to your cart.
            </p>

            <Link href="/meals" onClick={() => onOpenChange(false)} className="mt-6">
              <Button className="gap-2 bg-orange-600 px-6 text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700">
                Explore Meals
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="min-h-0 flex-1 px-5">
              <div className="space-y-3 py-5">
                {isFetching && !deleteMutation.isPending && (
                  <div className="flex items-center justify-center gap-2 rounded-xl border border-orange-200/70 bg-orange-100/50 px-4 py-2 text-xs font-medium text-orange-700 dark:border-orange-900/40 dark:bg-orange-950/30 dark:text-orange-400">
                    <Loader2 className="size-3.5 animate-spin" />
                    Updating cart...
                  </div>
                )}

                {cartItems.map((item) => (
                  <Card key={item.id} className="group border-orange-200/70 bg-orange-100/10 shadow-sm shadow-orange-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-950/10 dark:border-orange-900/40 dark:bg-orange-950/20">
                    <CardContent className="">
                      <div className="flex gap-3">
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-orange-100 dark:bg-orange-950/50">
                          {item.meal?.image ? (
                            <Image src={item.meal.image} alt={item.meal.name || "Meal"} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="80px" />
                          ) : (
                            <div className="flex size-full items-center justify-center text-orange-400">
                              <ShoppingBag className="size-6" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                {item.meal?.name || "Meal"}
                              </h4>

                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                ${item.price.toFixed(2)} each
                              </p>
                            </div>

                            <Button type="button" variant="ghost" size="icon" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(item.id)} className="size-8 shrink-0 rounded-lg text-slate-400 transition-all hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" aria-label={`Remove ${item.meal?.name || "meal"} from cart`}>
                              {deleteMutation.isPending && deleteMutation.variables === item.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                            </Button>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50/70 px-2 py-1 dark:border-orange-900/50 dark:bg-orange-950/30">
                              <Minus className="size-3 text-orange-500" />
                              <span className="min-w-5 text-center text-xs font-bold text-orange-700 dark:text-orange-400">{item.quantity}</span>
                              <Plus className="size-3 text-orange-500" />
                            </div>

                            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="border-t border-orange-200/70 bg-white/80 p-5 dark:border-orange-900/50 dark:bg-orange-950/40">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Subtotal</span>
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-400">${totalAmount.toFixed(2)}</span>
                </div>

                <Separator className="bg-orange-100 dark:bg-orange-900/40" />

                <div className="grid gap-2">
                  <Link href="/dashboard/user/cart" onClick={() => onOpenChange(false)} className="w-full">
                    <Button type="button" className="group h-11 w-full rounded-xl bg-orange-600 font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30">
                      View Full Cart
                      <ArrowRight className="ml-auto size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
                    Review your cart and complete checkout from the cart page.
                  </p>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShowCart;