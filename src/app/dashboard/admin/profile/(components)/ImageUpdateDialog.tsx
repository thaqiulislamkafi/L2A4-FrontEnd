import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';
import { uploadUserImage } from '@/lib/api/auth';
import { updateUser, UpdateUserPayload } from '@/lib/api/user';
import { AuthUser } from '@/store/auth.store';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImagePlus, Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ImageUpdateDialogProps {
    user: AuthUser;
    imageDialogOpen: boolean;
    onOpenChange: (open: boolean) => void;

}

const ImageUpdateDialog = ({ user, imageDialogOpen, onOpenChange }: ImageUpdateDialogProps) => {

    const queryClient = useQueryClient();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const uploadImageMutation = useMutation({

        mutationFn: (file: File) => uploadUserImage(file),
        onSuccess: (response) => {
            const uploadedImage = response?.data?.imageUrl ?? response?.url;
            if (!uploadedImage) {
                toast.add({
                    title: "Image Upload Failed",
                    description: "The server did not return an image URL.",
                    type: "error",
                });

                return;
            }

            setSelectedFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            updateMutation.mutate({
                image : uploadedImage
            })
        },

        onError: () => {
            toast.add({
                title: "Image Upload Failed",
                description: "Unable to upload the image. Please try again.",
                type: "error",
            });
        },
    });


    const updateMutation = useMutation({
        mutationFn: (payload: Partial<UpdateUserPayload>) => {
            if (!user) {
                throw new Error("User not found");
            }

            return updateUser(user.id, payload);
        },

        onSuccess: async () => {
            onOpenChange(false);
             toast.add({
                title: "Image Uploaded Successfully!",
                description: "The new profile image is ready to be saved.",
                type: "success",
            });
            await queryClient.invalidateQueries({
                queryKey: ["admin-profile"],
            });
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.add({
                title: "Invalid File",
                description: "Please select a valid image file.",
                type: "error",
            });

            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.add({
                title: "File Too Large",
                description: "Image size must be less than 5MB.",
                type: "error",
            });

            event.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const handleImageUpload = () => {
        if (!selectedFile) {
            toast.add({
                title: "Select an Image",
                description: "Please select an image before uploading.",
                type: "error",
            });

            return;
        }

        uploadImageMutation.mutate(selectedFile);
    };

    const handleImageDialogClose = (value: boolean) => {
        if (updateMutation.isPending || uploadImageMutation.isPending) return;
        onOpenChange(value);
    };

    return (
        <Dialog open={imageDialogOpen} onOpenChange={handleImageDialogClose}>
            <DialogContent className="max-w-md rounded-2xl border-orange-200/80 bg-white shadow-2xl shadow-orange-950/10 dark:border-orange-900/50 dark:bg-orange-950/95">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-bold text-orange-950 dark:text-orange-50">
                        <ImagePlus className="size-5 text-orange-500" />
                        Update Profile Image
                    </DialogTitle>

                    <DialogDescription className="text-orange-700/60 dark:text-orange-300/60">
                        Select a new profile image for {user?.name ?? "this user"}.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-2">
                    <div className="flex justify-center">
                        {selectedFile ? (
                            <div className="relative size-32 overflow-hidden rounded-2xl ring-2 ring-orange-200 dark:ring-orange-900/60">
                                <Image
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Selected profile image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : 
                         <div className="relative size-32 overflow-hidden rounded-2xl ring-2 ring-orange-200 dark:ring-orange-900/60">
                                <Image
                                    src={user?.image?? ''}
                                    alt={user?.name ?? "Current profile image"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        }
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="profile-image-upload"
                            className="font-semibold text-orange-900 dark:text-orange-100"
                        >
                            Choose Image
                        </Label>

                        <Input
                            ref={fileInputRef}
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploadImageMutation.isPending}
                            className="cursor-pointer border-orange-200 file:mr-3 file:rounded-md file:border-0 file:bg-orange-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-orange-700 hover:file:bg-orange-200 dark:border-orange-800 dark:bg-orange-950/30 dark:file:bg-orange-950/60 dark:file:text-orange-300"
                        />

                        <p className="text-xs text-orange-700/60 dark:text-orange-300/60">
                            Supported image files up to 5MB.
                        </p>
                    </div>

                    {selectedFile && (
                        <div className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300">
                            Selected: {selectedFile.name}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleImageDialogClose(false)}
                        disabled={uploadImageMutation.isPending}
                        className="rounded-lg border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/40"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleImageUpload}
                        disabled={!selectedFile || uploadImageMutation.isPending}
                        className="rounded-lg bg-orange-500 font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600"
                    >
                        {uploadImageMutation.isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="size-4" />
                                Upload Image
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ImageUpdateDialog;