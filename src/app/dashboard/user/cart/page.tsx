"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCartItemsByUserId } from "@/lib/api/cart";
import { deleteCartItem } from "@/lib/api/cartItem";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "@/components/ui/toast";

import CartEmpty from "./(components)/CartEmpty";
import CartHeader from "./(components)/CartHeader";
import CartItemsTable from "./(components)/CartItemsTable";
import CartSummary from "./(components)/CartSummary";
import CartLoading from "./loading";
import CartError from "./error";

export default function CartPage() {
  const user = useAuthStore((state) => state.user);

  const userId = user?.id;
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["cart-items", userId],
    queryFn: () => getCartItemsByUserId(userId as string),
    enabled: Boolean(userId),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: async () => {
      toast.add({
        title: "Cart Item Removed",
        description: "The item has been removed from your cart.",
        type: "success",
      });
      await queryClient.invalidateQueries({ queryKey: ["cart-items", userId] });
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

  if (isLoading) {
    return <CartLoading/>;
  }

  if (isError || !data?.success) {
    return <CartError reset={refetch}/>;
  }

  const cartItems = data.data ?? [];

  return (
    <main className="min-h-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <CartHeader itemCount={cartItems.length} />

        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 overflow-hidden rounded-2xl border border-orange-200/70 bg-white shadow-sm shadow-orange-950/5 dark:border-orange-900/40 dark:bg-orange-950/20">
              <CartItemsTable
                cartItems={cartItems}
                isFetching={isFetching || deleteMutation.isPending}
                onRemove={(id) => deleteMutation.mutate(id)}
                removingId={deleteMutation.isPending ? deleteMutation.variables : undefined}
              />
            </div>

            <CartSummary cartItems={cartItems} />
          </div>
        )}
      </div>
    </main>
  );
}