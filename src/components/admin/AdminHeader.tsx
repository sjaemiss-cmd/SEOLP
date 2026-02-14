"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, Eye, EyeOff } from "lucide-react";
import { usePreview } from "@/contexts/PreviewContext";

export default function AdminHeader() {
    const router = useRouter();
    const { isPreviewOpen, setIsPreviewOpen } = usePreview();

    const handleLogout = async () => {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.replace("/admin/login");
    };

    const isProduction = process.env.NODE_ENV === "production";

    return (
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium text-gray-700">콘텐츠 관리 시스템</h2>
                {isProduction && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">
                        읽기 전용
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors ${
                        isPreviewOpen
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    {isPreviewOpen ? <EyeOff size={14} /> : <Eye size={14} />}
                    미리보기
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <LogOut size={16} />
                    로그아웃
                </button>
            </div>
        </header>
    );
}
