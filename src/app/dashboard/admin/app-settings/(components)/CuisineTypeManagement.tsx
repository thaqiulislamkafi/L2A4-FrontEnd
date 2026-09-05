"use client";

import * as React from "react";
import { ChefHat, Edit2, Loader2, Plus, Save, Trash2 } from "lucide-react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CuisineType } from "@/lib/api/cuisine";

interface CuisineTypeManagementProps {
    cuisineTypes: CuisineType[];
    isSaving: boolean;
    isDeleting: boolean;
    hasError: boolean;
    onAdd: (name: string) => Promise<void>;
    onEdit: (type: CuisineType, name: string) => Promise<void>;
    onDelete: (type: CuisineType) => Promise<void>;
}

const CuisineTypeManagement = ({
    cuisineTypes,
    isSaving,
    isDeleting,
    hasError,
    onAdd,
    onEdit,
    onDelete,
}: CuisineTypeManagementProps) => {
    const [addOpen, setAddOpen] = React.useState(false);
    const [editing, setEditing] = React.useState<CuisineType | null>(null);
    const [deleting, setDeleting] = React.useState<CuisineType | null>(null);
    const [name, setName] = React.useState("");

    const add = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!name.trim()) return;
        await onAdd(name.trim());
        setAddOpen(false);
    };

    const edit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!editing || !name.trim()) return;
        await onEdit(editing, name.trim());
        setEditing(null);
    };

    const remove = async () => {
        if (!deleting) return;
        await onDelete(deleting);
        setDeleting(null);
    };

    return (
        <>
            <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
                <CardHeader className="border-b border-orange-100 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <ChefHat className="h-5 w-5 text-orange-600" />
                                Cuisine Types Management
                            </CardTitle>
                            <CardDescription className="mt-1">
                                Add, edit, and remove cuisine types.
                            </CardDescription>
                        </div>
                        <Button type="button" onClick={() => { setName(""); setAddOpen(true); }} className="bg-orange-600 text-white hover:bg-orange-700">
                            <Plus className="size-4" />
                            Add Cuisine Type
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-4">
                    {hasError && (
                        <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/20 dark:text-orange-400">
                            Unable to update cuisine types. Please try again.
                        </div>
                    )}

                    {cuisineTypes.length === 0 ? (
                        <p className="py-6 text-center text-sm text-muted-foreground">No cuisine types found.</p>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {cuisineTypes.map((type) => (
                                <div key={type.id} className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50/50 px-3 py-2 dark:border-orange-900/50 dark:bg-orange-950/20">
                                    <span className="text-sm font-medium">{type.cuisine_type_name}</span>
                                    <Button type="button" variant="ghost" size="icon-xs" onClick={() => { setName(type.cuisine_type_name); setEditing(type); }} aria-label={`Edit ${type.cuisine_type_name}`} className="text-orange-600 hover:bg-orange-100 hover:text-orange-700">
                                        <Edit2 className="size-3.5" />
                                    </Button>
                                    <Button type="button" variant="ghost" size="icon-xs" onClick={() => setDeleting(type)} aria-label={`Delete ${type.cuisine_type_name}`} className="text-orange-600 hover:bg-orange-100 hover:text-orange-700">
                                        <Trash2 className="size-3.5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={addOpen} onOpenChange={(open) => !isSaving && setAddOpen(open)}>
                <DialogContent className="rounded-2xl border-orange-200 bg-white dark:border-orange-900/50 dark:bg-orange-950/95">
                    <DialogHeader>
                        <DialogTitle className="text-orange-950 dark:text-orange-50">Add Cuisine Type</DialogTitle>
                        <DialogDescription>Create a new cuisine type.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={add}>
                        <div className="space-y-2 py-4">
                            <Label htmlFor="new-cuisine-type">Cuisine type name</Label>
                            <Input id="new-cuisine-type" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter cuisine type" disabled={isSaving} className="border-orange-200 focus-visible:border-orange-500" />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setAddOpen(false)} disabled={isSaving}>Cancel</Button>
                            <Button type="submit" disabled={isSaving || !name.trim()} className="bg-orange-600 text-white hover:bg-orange-700">
                                {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                                Add Cuisine Type
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={Boolean(editing)} onOpenChange={(open) => !isSaving && !open && setEditing(null)}>
                <DialogContent className="rounded-2xl border-orange-200 bg-white dark:border-orange-900/50 dark:bg-orange-950/95">
                    <DialogHeader>
                        <DialogTitle className="text-orange-950 dark:text-orange-50">Edit Cuisine Type</DialogTitle>
                        <DialogDescription>Update the selected cuisine type.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={edit}>
                        <div className="space-y-2 py-4">
                            <Label htmlFor="edit-cuisine-type">Cuisine type name</Label>
                            <Input id="edit-cuisine-type" value={name} onChange={(event) => setName(event.target.value)} disabled={isSaving} className="border-orange-200 focus-visible:border-orange-500" />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditing(null)} disabled={isSaving}>Cancel</Button>
                            <Button type="submit" disabled={isSaving || !name.trim()} className="bg-orange-600 text-white hover:bg-orange-700">
                                {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={Boolean(deleting)} onOpenChange={(open) => !isDeleting && !open && setDeleting(null)}>
                <AlertDialogContent className="max-w-md rounded-2xl border-orange-200 bg-white dark:border-orange-900/50 dark:bg-orange-950">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-orange-950 dark:text-orange-50">Delete Cuisine Type?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete <span className="font-semibold">{deleting?.cuisine_type_name}</span>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={remove} disabled={isDeleting} className="bg-orange-600 text-white hover:bg-orange-700">
                            {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                            Delete Cuisine Type
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default CuisineTypeManagement;
