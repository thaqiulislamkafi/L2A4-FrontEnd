"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/TablePagination";
import { Separator } from "@/components/ui/separator";
import { useGetAllFaqs } from "@/hooks/faqs/useGetAllFaqs";
import { deleteFaq, toggleFaqPublishStatus } from "@/lib/api/faqs";
import type { FAQ } from "@/types/faq.type";
import { toast } from "@/components/ui/toast";

import AddFaqDialog from "./(component)/AddFaqDialog";
import DeleteFaqDialog from "./(component)/DeleteFaqDialog";
import UpdateFaqDialog from "./(component)/UpdateFaqDialog";
import FaqManagementError from "./error";
import FaqManagementLoading from "./loading";
import FAQsTable from "./(component)/FAQsTable";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;

export default function FaqManagementPage() {
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [selectedFaq, setSelectedFaq] = React.useState<FAQ | null>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching, refetch } = useGetAllFaqs(
    page,
    DEFAULT_LIMIT
  );

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: async () => {
      toast.add({
        title: "FAQ Deleted Successfully",
        description: "The FAQ has been permanently deleted.",
        type: "success",
      });

      setDeleteDialogOpen(false);
      setSelectedFaq(null);

      if ((data?.data.length ?? 0) === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      }

      await queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
    onError: () => {
      toast.add({
        title: "Delete FAQ Failed",
        description: "Unable to delete the FAQ. Please try again.",
        type: "error",
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: (id: string) => toggleFaqPublishStatus(id),
    onSuccess: async (response) => {
      toast.add({
        title: response.data.isPublished
          ? "FAQ Published"
          : "FAQ Unpublished",
        description: response.data.isPublished
          ? "The FAQ is now visible to users."
          : "The FAQ is no longer visible to users.",
        type: "success",
      });

      await queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
    onError: () => {
      toast.add({
        title: "FAQ Status Update Failed",
        description: "Unable to update the FAQ status. Please try again.",
        type: "error",
      });
    },
  });

  if (isLoading) return <FaqManagementLoading />;
  if (isError) return <FaqManagementError onRetry={() => void refetch()} />;

  const handleEdit = (faq: FAQ) => {
    setSelectedFaq(faq);
    setUpdateDialogOpen(true);
  };

  const handleUpdateDialogChange = (open: boolean) => {
    setUpdateDialogOpen(open);

    if (!open) setSelectedFaq(null);
  };

  const handleDeleteRequest = (faq: FAQ) => {
    setSelectedFaq(faq);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogChange = (open: boolean) => {
    setDeleteDialogOpen(open);

    if (!open) setSelectedFaq(null);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">FAQ Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View frequently asked questions, their categories, and publication
            status.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setAddDialogOpen(true)}
          className="shrink-0 bg-orange-500 font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="size-4" />
          Add FAQ
        </Button>
      </div>

      <Separator />

      <FAQsTable
        faqs={data?.data ?? []}
        isFetching={isFetching}
        isTogglingPublish={togglePublishMutation.isPending}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
        onTogglePublish={(faq) => togglePublishMutation.mutate(faq.id)}
      />

      <TablePagination
        page={page}
        totalPages={data?.meta.totalPage ?? 1}
        totalItems={data?.meta.total ?? 0}
        itemsName="FAQs"
        onPageChange={setPage}
      />

      <AddFaqDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onCreated={() => setPage(DEFAULT_PAGE)}
      />

      <UpdateFaqDialog
        faq={selectedFaq}
        open={updateDialogOpen}
        onOpenChange={handleUpdateDialogChange}
      />

      <DeleteFaqDialog
        faq={selectedFaq}
        open={deleteDialogOpen}
        isDeleting={deleteMutation.isPending}
        onOpenChange={handleDeleteDialogChange}
        onConfirm={(faq) => deleteMutation.mutate(faq.id)}
      />
    </div>
  );
}