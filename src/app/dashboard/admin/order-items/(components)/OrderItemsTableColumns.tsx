import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { OrderItem } from "@/types/order.type";
import Image from "next/image";

export const OrderItemsTableColumns = (onOrderClick: (orderId: string) => void): ColumnDef<OrderItem>[] => [
  {
    accessorKey: "id",
    header: "Order Item ID",
    cell: ({ row }) => (
      <div className="max-w-45 truncate font-mono text-xs font-semibold text-orange-800 dark:text-orange-300">
        {row.original.id}
      </div>
    ),
  },
  {
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ row }) => (
      <button
        type="button"
        onClick={() => onOrderClick(row.original.order_id)}
        className="max-w-45 truncate font-mono text-left text-xs font-semibold text-orange-800 underline-offset-4 hover:underline dark:text-orange-300"
      >
        {row.original.order_id}
      </button>
    ),
  },
  {
    accessorKey: "meal",
    header: "Meal",
    cell: ({ row }) => (
      <div className="flex min-w-52 items-center gap-3">
        <Image height={40} width={40} src={row.original.meal.image} alt={row.original.meal.name} className="size-10 rounded-lg object-cover" />
        <span className="font-semibold text-orange-950 dark:text-orange-50">{row.original.meal.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <span className="font-semibold text-orange-900 dark:text-orange-100">{row.original.quantity}</span>,
  },
  {
    accessorKey: "price",
    header: "Unit Price",
    cell: ({ row }) => <span className="font-bold text-orange-950 dark:text-orange-50">৳{row.original.price.toLocaleString("en-BD")}</span>,
  },
  {
    id: "total",
    header: "Total",
    cell: ({ row }) => <span className="font-bold text-orange-950 dark:text-orange-50">৳{(row.original.price * row.original.quantity).toLocaleString("en-BD")}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <div className="whitespace-nowrap text-sm font-medium text-orange-800 dark:text-orange-200">{format(new Date(row.original.createdAt), "dd MMM yyyy, hh:mm a")}</div>,
  },
];
