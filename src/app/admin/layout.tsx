import React from "react";

export const metadata = {
    title: "CMS 관리자 - 고수의 운전면허 도봉점",
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {children}
        </div>
    );
}
