"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        fetch("/api/admin/auth/verify")
            .then((res) => {
                if (!res.ok) {
                    router.replace("/admin/login");
                } else {
                    setIsAuthed(true);
                }
            })
            .catch(() => {
                router.replace("/admin/login");
            })
            .finally(() => {
                setIsChecking(false);
            });
    }, [router]);

    if (isChecking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        );
    }

    if (!isAuthed) return null;

    return <>{children}</>;
}
