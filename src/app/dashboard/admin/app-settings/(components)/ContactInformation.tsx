"use client";

import { Loader2, Phone, Save } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppSetting } from "@/types/app-settings";

export interface ContactSetting extends AppSetting {
    label: string;
    placeholder: string;
    icon: LucideIcon;
}

interface ContactInformationProps {
    settings: ContactSetting[];
    isUpdating: (settingId: string) => boolean;
    hasUpdateError: boolean;
    onChange: (settingId: string, value: string) => void;
    onSave: (setting: ContactSetting) => void;
}

const ContactInformation = ({
    settings,
    isUpdating,
    hasUpdateError,
    onChange,
    onSave,
}: ContactInformationProps) => {
    return (
        <Card className="border-orange-100 shadow-sm dark:border-orange-900/30">
            <CardHeader className="border-b border-orange-100 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Phone className="h-5 w-5 text-orange-600" />
                    Contact Information
                </CardTitle>
                <CardDescription>
                    Manage the contact details displayed throughout the FoodHub website.
                </CardDescription>
            </CardHeader>

            <CardContent className="p-4">
                {hasUpdateError && (
                    <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/20 dark:text-orange-400">
                        Failed to update the contact information. Please try again.
                    </div>
                )}

                {settings.length === 0 ? (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                        No contact settings were found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {settings.map((setting) => {
                            const Icon = setting.icon;
                            const updating = isUpdating(setting.id);

                            return (
                                <div key={setting.id} className="space-y-2 rounded-lg border p-4">
                                    <Label htmlFor={setting.id} className="flex items-center gap-2 font-semibold">
                                        <Icon className="size-4 text-orange-600" />
                                        {setting.label}
                                    </Label>

                                    <div className="flex items-center gap-2">
                                        <Input
                                            id={setting.id}
                                            value={setting.value}
                                            placeholder={setting.placeholder}
                                            disabled={updating}
                                            onChange={(event) => onChange(setting.id, event.target.value)}
                                            className="border-orange-200 focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-800"
                                        />
                                        <Button
                                            type="button"
                                            size="icon"
                                            aria-label={`Save ${setting.label}`}
                                            title={`Save ${setting.label}`}
                                            disabled={updating}
                                            onClick={() => onSave(setting)}
                                            className="shrink-0 bg-orange-600 text-white hover:bg-orange-700"
                                        >
                                            {updating ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ContactInformation;
