"use client";

import { motion } from "framer-motion";
import { ArrowRight, ReceiptText, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/types/cart.type";

interface CartSummaryProps {
  cartItems: CartItem[];
  onProceedToCheckout: () => void;
}

export default function CartSummary({ cartItems, onProceedToCheckout }: CartSummaryProps) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
      <Card className="overflow-hidden rounded-2xl border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
        <CardHeader className="border-b border-orange-100 bg-orange-50/40 px-5 py-4 dark:border-orange-900/40 dark:bg-orange-950/20">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-orange-950 dark:text-orange-50">
            <ReceiptText className="size-5 text-orange-500" />
            Cart Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-orange-700/60 dark:text-orange-300/60">Cart Items</span>
            <span className="font-bold text-orange-950 dark:text-orange-50">{cartItems.length}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-orange-700/60 dark:text-orange-300/60">Total Quantity</span>
            <span className="font-bold text-orange-950 dark:text-orange-50">{totalQuantity}</span>
          </div>

          <div className="border-t border-orange-100 pt-4 dark:border-orange-900/40">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">Subtotal</p>
                <p className="mt-1 text-2xl font-black text-orange-950 dark:text-orange-50">
                  ৳{subtotal.toLocaleString("en-BD")}
                </p>
              </div>

              <ShoppingBag className="size-7 text-orange-300 dark:text-orange-700" />
            </div>
          </div>

          <Button type="button" onClick={onProceedToCheckout} className="w-full rounded-xl bg-orange-500 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600">
            Proceed to Checkout
            <ArrowRight className="size-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}