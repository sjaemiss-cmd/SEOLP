"use client";

import React from "react";
import AuthGuard from "./AuthGuard";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import PreviewPanel from "./PreviewPanel";
import { PreviewProvider } from "@/contexts/PreviewContext";

export default function AdminPageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <PreviewProvider>
                <div className="flex h-screen overflow-hidden">
                    <AdminSidebar />
                    <div className="flex-1 flex overflow-hidden">
                        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                            <AdminHeader />
                            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                                {children}
                            </main>
                        </div>
                        <PreviewPanel />
                    </div>
                </div>
            </PreviewProvider>
        </AuthGuard>
    );
}
