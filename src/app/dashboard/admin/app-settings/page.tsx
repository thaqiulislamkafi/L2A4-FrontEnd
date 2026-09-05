"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Separator } from "@/components/ui/separator";
import { getAppSettings, updateAppSetting } from "@/lib/api/app-settings";
import { AppSetting } from "@/types/app-settings";
import AppSettingLoading from "./loading";
import AppSettingsError from "./error";
import HomePageManagement, { HomePageSetting } from "./(components)/HomePageManagement";

const AppSettingsPage = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["app-settings"],
        queryFn: getAppSettings,
    });

    const updateMutation = useMutation({
        mutationFn: updateAppSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["app-settings"],
            });
        },
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

    const handleToggle = (setting: AppSetting, checked: boolean) => {
        updateMutation.mutate({
            id: setting.id,
            value: String(checked),
        });
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
        </div>
    );
};

export default AppSettingsPage;
