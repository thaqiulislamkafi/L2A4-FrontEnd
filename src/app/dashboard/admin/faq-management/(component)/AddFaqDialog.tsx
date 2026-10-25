"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { createFaq, type CreateFAQPayload } from "@/lib/api/faqs";

interface AddFaqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

interface FaqFormValues {
  question: string;
  answer: string;
  sortOrder: number;
  isPublished: boolean;
  category: string;
}

const DEFAULT_VALUES: FaqFormValues = {
  question: "",
  answer: "",
  sortOrder: 1,
  isPublished: false,
  category: "",
};

export default function AddFaqDialog({
  open,
  onOpenChange,
  onCreated,
}: AddFaqDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    onSubmit: async ({ value }) => {
      if (
        !value.question.trim() ||
        !value.answer.trim() ||
        !value.category.trim()
      ) {
        toast.add({
          title: "FAQ Details Required",
          description: "Enter a question, answer, and category.",
          type: "error",
        });
        return;
      }

      if (!Number.isSafeInteger(value.sortOrder) || value.sortOrder < 1) {
        toast.add({
          title: "Invalid Sort Order",
          description: "Sort order must be a positive whole number.",
          type: "error",
        });
        return;
      }

      const payload: CreateFAQPayload = {
        ...value,
        question: value.question.trim(),
        answer: value.answer.trim(),
        category: value.category.trim(),
      };

      createMutation.mutate(payload);
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateFAQPayload) => createFaq(payload),
    onSuccess: async () => {
      toast.add({
        title: "FAQ Added Successfully",
        description: "The FAQ has been created successfully.",
        type: "success",
      });
      form.reset();
      onCreated();
      onOpenChange(false);
      await queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
    onError: () => {
      toast.add({
        title: "Add FAQ Failed",
        description: "Unable to create the FAQ. Please try again.",
        type: "error",
      });
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (createMutation.isPending) return;

    if (!nextOpen) form.reset();
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-orange-200/80 bg-white p-0 sm:max-w-xl dark:border-orange-900/50 dark:bg-orange-950/95">
        <DialogHeader className="border-b border-orange-100 px-6 py-5 dark:border-orange-900/40">
          <DialogTitle className="font-bold text-orange-950 dark:text-orange-50">
            Add FAQ
          </DialogTitle>
          <DialogDescription className="text-orange-700/60 dark:text-orange-300/60">
            Add a frequently asked question to FoodHub.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="space-y-5 px-6 py-5">
            <form.Field name="question">
              {(field) => (
                <div className="space-y-1.5">
                  <Label
                    htmlFor={field.name}
                    className="font-semibold text-orange-900 dark:text-orange-100"
                  >
                    Question
                  </Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    placeholder="Enter the frequently asked question"
                    required
                    maxLength={500}
                    disabled={createMutation.isPending}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="answer">
              {(field) => (
                <div className="space-y-1.5">
                  <Label
                    htmlFor={field.name}
                    className="font-semibold text-orange-900 dark:text-orange-100"
                  >
                    Answer
                  </Label>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    placeholder="Write a helpful answer"
                    required
                    rows={5}
                    disabled={createMutation.isPending}
                  />
                </div>
              )}
            </form.Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field name="category">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label
                      htmlFor={field.name}
                      className="font-semibold text-orange-900 dark:text-orange-100"
                    >
                      Category
                    </Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="e.g. Account"
                      required
                      maxLength={100}
                      disabled={createMutation.isPending}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="sortOrder">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label
                      htmlFor={field.name}
                      className="font-semibold text-orange-900 dark:text-orange-100"
                    >
                      Sort Order
                    </Label>
                    <Input
                      id={field.name}
                      type="number"
                      min={1}
                      step={1}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(
                          event.target.value === ""
                            ? 0
                            : Number(event.target.value)
                        )
                      }
                      required
                      disabled={createMutation.isPending}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="isPublished">
              {(field) => (
                <div className="flex items-center justify-between rounded-lg border border-orange-200/70 bg-orange-50/40 px-4 py-3 dark:border-orange-900/40 dark:bg-orange-950/20">
                  <div>
                    <Label
                      htmlFor="faq-published"
                      className="font-semibold text-orange-900 dark:text-orange-100"
                    >
                      Publish FAQ
                    </Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Published FAQs are visible to users.
                    </p>
                  </div>
                  <Switch
                    id="faq-published"
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    disabled={createMutation.isPending}
                    className="data-[checked]:bg-orange-600"
                  />
                </div>
              )}
            </form.Field>

            {createMutation.isError && (
              <p role="alert" className="text-sm font-medium text-red-600">
                Failed to create FAQ. Please try again.
              </p>
            )}

            <DialogFooter className="gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={createMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 text-white hover:bg-orange-600"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Add FAQ
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
