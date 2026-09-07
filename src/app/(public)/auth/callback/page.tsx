"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const error = searchParams.get("error");
    const redirect = searchParams.get("redirect") || "/";

    useEffect(() => {
        if (!error) {
            router.replace(redirect);
        }
    }, [error, redirect, router]);

    if (error === "signup_disabled") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
                <Card className="w-full max-w-md border-orange-100 shadow-lg">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                            <AlertCircle className="h-7 w-7 text-orange-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Account Not Registered</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5 text-center">
                        <p className="text-sm leading-6 text-gray-600">
                            We couldnt find a FoodHub account associated with this Google account. Please sign up first to continue.
                        </p>

                        <div className="flex flex-col gap-3">
                            <Button onClick={() => router.push("/signup")} className="w-full bg-orange-500 hover:bg-orange-600">
                                Sign Up with Google
                            </Button>

                            <Button variant="outline" onClick={() => router.push("/signin")} className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                                Back to Sign In
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-orange-50">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                <p className="text-sm text-gray-500">Completing authentication...</p>
            </div>
        </div>
    );
}