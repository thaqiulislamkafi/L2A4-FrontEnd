"use client";

import { ChefHat, Settings2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AppSetting } from "@/types/app-settings";

export interface HomePageSetting extends AppSetting {
    label: string;
    description: string;
}

interface HomePageManagementProps {
    settings: HomePageSetting[];
    isUpdating: (settingId: string) => boolean;
    hasUpdateError: boolean;
    onToggle: (setting: AppSetting, checked: boolean) => void;
}

const HomePageManagement = ({
    settings,
    isUpdating,
    hasUpdateError,
    onToggle,
}: HomePageManagementProps) => {
    if (settings.length === 0) {
        return (
            <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
                <CardContent className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
                    <div className="mb-4 rounded-full bg-orange-100 p-4 text-orange-600 dark:bg-orange-950/30">
                        <ChefHat className="h-8 w-8" />
                    </div>

                    <h3 className="text-xl font-semibold">
                        No home page settings
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        No configurable home page components were found.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
            <CardHeader className="border-b border-orange-100 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Settings2 className="h-5 w-5 text-orange-600" />
                            Home Page Management
                            <Badge className="bg-orange-600 text-white hover:bg-orange-700">{settings.length} Components</Badge>
                        </CardTitle>

                        <CardDescription className="mt-1">
                            Control which sections are visible on the FoodHub home page.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
                {hasUpdateError && (
                    <div className="m-4 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/20 dark:text-orange-400">
                        Failed to update the setting. Please try again.
                    </div>
                )}

                {settings.map((setting) => {
                    const isEnabled = setting.value === "true";
                    return (
                        <div key={setting.id} className="rounded-lg border p-5">
                            <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Label htmlFor={setting.id} className="cursor-pointer text-base font-semibold">
                                            {setting.label}
                                        </Label>

                                        <Badge variant={isEnabled ? "default" : "secondary"} className={isEnabled ? "bg-orange-600 text-white hover:bg-orange-700" : ""}>
                                            {isEnabled ? "Visible" : "Hidden"}
                                        </Badge>
                                    </div>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {setting.description}
                                    </p>
                                </div>

                                <Switch
                                    id={setting.id}
                                    checked={isEnabled}
                                    disabled={isUpdating(setting.id)}
                                    onCheckedChange={(checked) => onToggle(setting, checked)}
                                    className="data-[state=checked]:bg-orange-600"
                                />
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default HomePageManagement;
