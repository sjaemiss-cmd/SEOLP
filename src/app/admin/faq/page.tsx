"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import FAQEditor from "@/components/admin/editors/FAQEditor";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";
import { usePreviewSync } from "@/hooks/usePreviewSync";

interface FAQData {
    title: string;
    items: { q: string; a: string }[];
}

export default function AdminFAQPage() {
    const [data, setData] = useState<FAQData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config/faq")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/config/faq", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) setToast({ message: "저장 완료!", type: "success" });
            else setToast({ message: "저장 실패", type: "error" });
        } catch {
            setToast({ message: "저장 중 오류 발생", type: "error" });
        } finally {
            setSaving(false);
        }
    }, [data]);

    usePreviewSync({ section: "faq", data });

    if (loading) return <AdminPageWrapper><div className="animate-pulse">로딩 중...</div></AdminPageWrapper>;

    return (
        <AdminPageWrapper>
            <div className="max-w-3xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">FAQ 관리</h1>
                {data && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <FAQEditor data={data} onChange={setData} />
                        <div className="pt-6">
                            <SaveButton onClick={handleSave} loading={saving} />
                        </div>
                    </div>
                )}
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </AdminPageWrapper>
    );
}
