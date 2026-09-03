import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart.type";

interface CartItemsTableColumnsProps {
  onRemove: (id: string) => void;
  removingId?: string;
}

export const CartItemsTableColumns = ({
  onRemove,
  removingId,
}: CartItemsTableColumnsProps): ColumnDef<CartItem>[] => [
  {
    accessorKey: "id",
    header: "Cart Item",
    cell: ({ row }) => (
      <div className="max-w-44 truncate font-mono text-xs font-semibold text-orange-800 dark:text-orange-300">
        {row.original.id}
      </div>
    ),
  },
  {
    accessorKey: "meal_id",
    header: "Meal ID",
    cell: ({ row }) => (
      <div className="max-w-44 truncate font-mono text-xs font-semibold text-orange-800 dark:text-orange-300">
        {row.original.meal_id}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-orange-50 px-2 py-1 text-sm font-bold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
        {row.original.quantity}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Unit Price",
    cell: ({ row }) => (
      <span className="font-bold text-orange-950 dark:text-orange-50">
        ৳{row.original.price.toLocaleString("en-BD")}
      </span>
    ),
  },
  {
    id: "total",
    header: "Total",
    cell: ({ row }) => (
      <span className="font-black text-orange-600 dark:text-orange-400">
        ৳{(row.original.price * row.original.quantity).toLocaleString("en-BD")}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Added At",
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium text-orange-800 dark:text-orange-200">
        {format(new Date(row.original.createdAt), "dd MMM yyyy, hh:mm a")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const isRemoving = removingId === row.original.id;

      return (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
          onClick={() => onRemove(row.original.id)}
          disabled={Boolean(removingId)}
          aria-label={`Remove cart item ${row.original.id}`}
        >
          {isRemoving ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
          Remove
        </Button>
      );
    },
  },
];