"use client";

import * as React from "react";
import { Edit2, FolderTree, Loader2, Plus, Save, Trash2 } from "lucide-react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/lib/api/category";

interface CategoryManagementProps {
    categories: Category[];
    isSaving: boolean;
    isDeleting: boolean;
    hasError: boolean;
    onAdd: (categoryName: string) => Promise<void>;
    onEdit: (category: Category, categoryName: string) => Promise<void>;
    onDelete: (category: Category) => Promise<void>;
}

const CategoryManagement = ({
    categories,
    isSaving,
    isDeleting,
    hasError,
    onAdd,
    onEdit,
    onDelete,
}: CategoryManagementProps) => {
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const [editingCategory, setEditingCategory] = React.useState<Category | null>(null);
    const [deletingCategory, setDeletingCategory] = React.useState<Category | null>(null);
    const [categoryName, setCategoryName] = React.useState("");

    const openAddDialog = () => {
        setCategoryName("");
        setIsAddOpen(true);
    };

    const openEditDialog = (category: Category) => {
        setCategoryName(category.category_name);
        setEditingCategory(category);
    };

    const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!categoryName.trim()) return;
        await onAdd(categoryName.trim());
        setIsAddOpen(false);
    };

    const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editingCategory || !categoryName.trim()) return;
        await onEdit(editingCategory, categoryName.trim());
        setEditingCategory(null);
    };

    const handleDelete = async () => {
        if (!deletingCategory) return;
        await onDelete(deletingCategory);
        setDeletingCategory(null);
    };

    return (
        <>
            <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
                <CardHeader className="border-b border-orange-100 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <FolderTree className="h-5 w-5 text-orange-600" />
                                Category Management
                            </CardTitle>
                            <CardDescription className="mt-1">
                                Add, edit, and remove meal categories.
                            </CardDescription>
                        </div>
                        <Button type="button" onClick={openAddDialog} className="bg-orange-600 text-white hover:bg-orange-700">
                            <Plus className="size-4" />
                            Add Category
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-4">
                    {hasError && (
                        <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/20 dark:text-orange-400">
                            Unable to update categories. Please try again.
                        </div>
                    )}

                    {categories.length === 0 ? (
                        <p className="py-6 text-center text-sm text-muted-foreground">No categories found.</p>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50/50 px-3 py-2 dark:border-orange-900/50 dark:bg-orange-950/20">
                                    <span className="text-sm font-medium">{category.category_name}</span>
                                    <Button type="button" variant="ghost" size="icon-xs" onClick={() => openEditDialog(category)} aria-label={`Edit ${category.category_name}`} className="text-orange-600 hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-950/50">
                                        <Edit2 className="size-3.5" />
                                    </Button>
                                    <Button type="button" variant="ghost" size="icon-xs" onClick={() => setDeletingCategory(category)} aria-label={`Delete ${category.category_name}`} className="text-orange-600 hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-950/50">
                                        <Trash2 className="size-3.5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isAddOpen} onOpenChange={(open) => !isSaving && setIsAddOpen(open)}>
                <DialogContent className="rounded-2xl border-orange-200 bg-white dark:border-orange-900/50 dark:bg-orange-950/95">
                    <DialogHeader>
                        <DialogTitle className="text-orange-950 dark:text-orange-50">Add Category</DialogTitle>
                        <DialogDescription className="text-orange-700/70 dark:text-orange-300/70">Create a new meal category.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAdd}>
                        <div className="space-y-2 py-4">
                            <Label htmlFor="new-category-name" className="text-orange-900 dark:text-orange-100">Category name</Label>
                            <Input id="new-category-name" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="Enter category name" disabled={isSaving} className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800" />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} disabled={isSaving} className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">Cancel</Button>
                            <Button type="submit" disabled={isSaving || !categoryName.trim()} className="bg-orange-600 text-white hover:bg-orange-700">
                                {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                                Add Category
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={Boolean(editingCategory)} onOpenChange={(open) => !isSaving && !open && setEditingCategory(null)}>
                <DialogContent className="rounded-2xl border-orange-200 bg-white dark:border-orange-900/50 dark:bg-orange-950/95">
                    <DialogHeader>
                        <DialogTitle className="text-orange-950 dark:text-orange-50">Edit Category</DialogTitle>
                        <DialogDescription className="text-orange-700/70 dark:text-orange-300/70">Update the selected category name.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                        <div className="space-y-2 py-4">
                            <Label htmlFor="edit-category-name" className="text-orange-900 dark:text-orange-100">Category name</Label>
                            <Input id="edit-category-name" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} disabled={isSaving} className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800" />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditingCategory(null)} disabled={isSaving} className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">Cancel</Button>
                            <Button type="submit" disabled={isSaving || !categoryName.trim()} className="bg-orange-600 text-white hover:bg-orange-700">
                                {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={Boolean(deletingCategory)} onOpenChange={(open) => !isDeleting && !open && setDeletingCategory(null)}>
                <AlertDialogContent className="max-w-md rounded-2xl border-orange-200 bg-white dark:border-orange-900/50 dark:bg-orange-950">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-orange-950 dark:text-orange-50">Delete Category?</AlertDialogTitle>
                        <AlertDialogDescription className="text-orange-700/70 dark:text-orange-300/70">
                            Are you sure you want to delete <span className="font-semibold text-orange-800 dark:text-orange-200">{deletingCategory?.category_name}</span>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting} className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-orange-600 text-white hover:bg-orange-700">
                            {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                            Delete Category
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default CategoryManagement;
