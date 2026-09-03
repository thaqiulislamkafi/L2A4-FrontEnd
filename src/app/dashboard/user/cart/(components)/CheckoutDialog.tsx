"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Loader2, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartItem } from "@/types/cart.type";

interface CheckoutDialogProps {
  cartItems: CartItem[];
  totalAmount: number;
  open: boolean;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (values: { location: string; contact: string }) => void;
}

export default function CheckoutDialog({
  cartItems,
  totalAmount,
  open,
  isSubmitting,
  onOpenChange,
  onConfirm,
}: CheckoutDialogProps) {
  const form = useForm({
    defaultValues: { location: "", contact: "" },
    onSubmit: async ({ value }) => {
      onConfirm({ location: value.location.trim(), contact: value.contact.trim() });
    },
  });

  const handleClose = (value: boolean) => {
    if (!isSubmitting) onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] w-[min(92vw,560px)] overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
          <DialogTitle className="flex items-center gap-2 font-bold text-orange-950 dark:text-orange-50">
            <ShoppingBag className="size-5 text-orange-500" />
            Checkout
          </DialogTitle>
          <DialogDescription className="text-sm text-orange-700/60 dark:text-orange-300/60">
            Review your order and provide delivery details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(event) => { event.preventDefault(); event.stopPropagation(); form.handleSubmit(); }}>
          <div className="space-y-5 px-6 py-5">
            <div className="grid grid-cols-2 gap-4 rounded-xl bg-orange-50/70 p-4 dark:bg-orange-950/30">
              <div>
                <p className="text-xs font-semibold uppercase text-orange-500">Total Items</p>
                <p className="mt-1 text-xl font-black text-orange-950 dark:text-orange-50">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-orange-500">Total Amount</p>
                <p className="mt-1 text-xl font-black text-orange-950 dark:text-orange-50">
                  ৳{totalAmount.toLocaleString("en-BD")}
                </p>
              </div>
            </div>

            <form.Field name="location" validators={{ onChange: ({ value }) => (!value.trim() ? "Location is required" : undefined) }}>
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="checkout-location" className="font-semibold text-orange-900 dark:text-orange-100">Location</Label>
                  <Input id="checkout-location" name={field.name} value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} placeholder="Chattogram, Bangladesh" disabled={isSubmitting} className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30" />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && <p className="text-xs font-medium text-red-600">{field.state.meta.errors[0]}</p>}
                </div>
              )}
            </form.Field>

            <form.Field name="contact" validators={{ onChange: ({ value }) => (!value.trim() ? "Contact is required" : undefined) }}>
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="checkout-contact" className="font-semibold text-orange-900 dark:text-orange-100">Contact</Label>
                  <Input id="checkout-contact" name={field.name} value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} placeholder="+8801712345678" disabled={isSubmitting} className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800 dark:bg-orange-950/30" />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && <p className="text-xs font-medium text-red-600">{field.state.meta.errors[0]}</p>}
                </div>
              )}
            </form.Field>
          </div>

          <DialogFooter className="border-t border-orange-100 px-6 py-4 dark:border-orange-900/40">
            <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={isSubmitting} className="rounded-lg border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-lg bg-orange-600 text-white hover:bg-orange-700">
              {isSubmitting ? <><Loader2 className="size-4 animate-spin" /> Placing Order...</> : "Confirm Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
