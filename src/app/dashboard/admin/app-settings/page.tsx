"use client";

import * as React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Separator } from "@/components/ui/separator";
import { getAppSettings, updateAppSetting } from "@/lib/api/app-settings";
import { Category, createCategory, deleteCategory, getCategories, updateCategory } from "@/lib/api/category";
import { createDietryType, deleteDietryType, DietryType, getDietryTypes, updateDietryType } from "@/lib/api/dietry";
import { createCuisineType, CuisineType, deleteCuisineType, getCuisineTypes, updateCuisineType } from "@/lib/api/cuisine";
import { AppSetting } from "@/types/app-settings";
import AppSettingLoading from "./loading";
import AppSettingsError from "./error";
import HomePageManagement, { HomePageSetting } from "./(components)/HomePageManagement";
import ContactInformation, { ContactSetting } from "./(components)/ContactInformation";
import CategoryManagement from "./(components)/CategoryManagement";
import DietryTypeManagement from "./(components)/DietryTypeManagement";
import CuisineTypeManagement from "./(components)/CuisineTypeManagement";

const contactSettingMetadata: Record<string, Pick<ContactSetting, "label" | "placeholder" | "icon">> = {
    "contact.Address": {
        label: "Address",
        placeholder: "Enter business address",
        icon: MapPin,
    },
    "contact.Phone": {
        label: "Phone",
        placeholder: "Enter phone number",
        icon: Phone,
    },
    "contact.Email": {
        label: "Email",
        placeholder: "Enter email address",
        icon: Mail,
    },
};

const AppSettingsPage = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["app-settings"],
        queryFn: getAppSettings,
    });
    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    const dietryTypesQuery = useQuery({
        queryKey: ["dietry-types"],
        queryFn: getDietryTypes,
    });
    const cuisineTypesQuery = useQuery({
        queryKey: ["cuisine-types"],
        queryFn: getCuisineTypes,
    });
    const [contactValues, setContactValues] = React.useState<Record<string, string>>({});

    const updateMutation = useMutation({
        mutationFn: updateAppSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["app-settings"],
            });
        },
    });
    const categoryCreateMutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
    const categoryUpdateMutation = useMutation({
        mutationFn: ({ id, categoryName }: { id: string; categoryName: string }) =>
            updateCategory(id, categoryName),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
    const categoryDeleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
    const dietryCreateMutation = useMutation({
        mutationFn: createDietryType,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dietry-types"] }),
    });
    const dietryUpdateMutation = useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) => updateDietryType(id, name),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dietry-types"] }),
    });
    const dietryDeleteMutation = useMutation({
        mutationFn: deleteDietryType,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dietry-types"] }),
    });
    const cuisineCreateMutation = useMutation({
        mutationFn: createCuisineType,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cuisine-types"] }),
    });
    const cuisineUpdateMutation = useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) => updateCuisineType(id, name),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cuisine-types"] }),
    });
    const cuisineDeleteMutation = useMutation({
        mutationFn: deleteCuisineType,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cuisine-types"] }),
    });

    const homePageSettings = React.useMemo(() => {
        const settings: AppSetting[] = data?.data ?? [];

        return settings
            .filter((setting) => setting.key.startsWith("homepage.") && setting.type === "BOOLEAN" && setting.key.endsWith(".show"))
            .map((setting): HomePageSetting => {
                const componentName = setting.key.replace("homepage.", "").replace(".show", "");
                const label = componentName.replace(/([A-Z])/g, " $1").trim();

                return {
                    ...setting,
                    label,
                    description: `Control whether the ${label.toLowerCase()} section is visible on the FoodHub home page.`,
                };
            });
    }, [data?.data]);

    const contactSettings = React.useMemo(() => {
        const settings: AppSetting[] = data?.data ?? [];

        return settings
            .filter((setting) => setting.key.startsWith("contact.") && setting.type === "STRING")
            .filter((setting) => Boolean(contactSettingMetadata[setting.key]))
            .map((setting): ContactSetting => ({
                ...setting,
                value: contactValues[setting.id] ?? setting.value,
                ...contactSettingMetadata[setting.key],
            }))
    }, [contactValues, data?.data]);

    const handleToggle = (setting: AppSetting, checked: boolean) => {
        updateMutation.mutate({
            id: setting.id,
            value: String(checked),
        });
    };

    const handleContactChange = (settingId: string, value: string) => {
        setContactValues((currentValues) => ({
            ...currentValues,
            [settingId]: value,
        }));
    };

    const handleContactSave = (setting: ContactSetting) => {
        updateMutation.mutate({
            id: setting.id,
            value: setting.value,
        });
    };

    const handleAddCategory = async (categoryName: string) => {
        await categoryCreateMutation.mutateAsync(categoryName);
    };

    const handleEditCategory = async (category: Category, categoryName: string) => {
        await categoryUpdateMutation.mutateAsync({ id: category.id, categoryName });
    };

    const handleDeleteCategory = async (category: Category) => {
        await categoryDeleteMutation.mutateAsync(category.id);
    };

    const handleAddDietryType = async (name: string) => {
        await dietryCreateMutation.mutateAsync(name);
    };

    const handleEditDietryType = async (type: DietryType, name: string) => {
        await dietryUpdateMutation.mutateAsync({ id: type.id, name });
    };

    const handleDeleteDietryType = async (type: DietryType) => {
        await dietryDeleteMutation.mutateAsync(type.id);
    };

    const handleAddCuisineType = async (name: string) => {
        await cuisineCreateMutation.mutateAsync(name);
    };

    const handleEditCuisineType = async (type: CuisineType, name: string) => {
        await cuisineUpdateMutation.mutateAsync({ id: type.id, name });
    };

    const handleDeleteCuisineType = async (type: CuisineType) => {
        await cuisineDeleteMutation.mutateAsync(type.id);
    };

    if (isLoading) return <AppSettingLoading />;

    if (isError) return <AppSettingsError onRetry={refetch} />;

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    App Settings
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage FoodHub application settings and website configuration.
                </p>
            </div>

            <Separator />

            <HomePageManagement
                settings={homePageSettings}
                isUpdating={(settingId) =>
                    updateMutation.isPending && updateMutation.variables?.id === settingId
                }
                hasUpdateError={updateMutation.isError}
                onToggle={handleToggle}
            />

            <ContactInformation
                settings={contactSettings}
                isUpdating={(settingId) =>
                    updateMutation.isPending && updateMutation.variables?.id === settingId
                }
                hasUpdateError={
                    updateMutation.isError &&
                    contactSettings.some((setting) => setting.id === updateMutation.variables?.id)
                }
                onChange={handleContactChange}
                onSave={handleContactSave}
            />

            <CategoryManagement
                categories={categoriesQuery.data?.data ?? []}
                isSaving={categoryCreateMutation.isPending || categoryUpdateMutation.isPending}
                isDeleting={categoryDeleteMutation.isPending}
                hasError={
                    categoryCreateMutation.isError ||
                    categoryUpdateMutation.isError ||
                    categoryDeleteMutation.isError
                }
                onAdd={handleAddCategory}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
            />

            <DietryTypeManagement
                dietryTypes={dietryTypesQuery.data?.data ?? []}
                isSaving={dietryCreateMutation.isPending || dietryUpdateMutation.isPending}
                isDeleting={dietryDeleteMutation.isPending}
                hasError={
                    dietryCreateMutation.isError ||
                    dietryUpdateMutation.isError ||
                    dietryDeleteMutation.isError
                }
                onAdd={handleAddDietryType}
                onEdit={handleEditDietryType}
                onDelete={handleDeleteDietryType}
            />

            <CuisineTypeManagement
                cuisineTypes={cuisineTypesQuery.data?.data ?? []}
                isSaving={cuisineCreateMutation.isPending || cuisineUpdateMutation.isPending}
                isDeleting={cuisineDeleteMutation.isPending}
                hasError={
                    cuisineCreateMutation.isError ||
                    cuisineUpdateMutation.isError ||
                    cuisineDeleteMutation.isError
                }
                onAdd={handleAddCuisineType}
                onEdit={handleEditCuisineType}
                onDelete={handleDeleteCuisineType}
            />
        </div>
    );
};

export default AppSettingsPage;
