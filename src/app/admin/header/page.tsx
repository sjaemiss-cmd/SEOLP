"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import TextInput from "@/components/admin/editors/TextInput";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";
import { usePreviewSync } from "@/hooks/usePreviewSync";

interface HeaderData {
    nav: { usp: string; reviews: string; location: string; event: string; faq: string };
    buttons: { call: string };
}

export default function AdminHeaderPage() {
    const [data, setData] = useState<HeaderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config/header")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/config/header", {
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

    usePreviewSync({ section: "header", data });

    if (loading) return <AdminPageWrapper><div className="animate-pulse">로딩 중...</div></AdminPageWrapper>;

    return (
        <AdminPageWrapper>
            <div className="max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">헤더 설정</h1>
                {data && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">네비게이션 라벨</h2>
                            <TextInput label="특장점" value={data.nav.usp} onChange={(v) => setData({ ...data, nav: { ...data.nav, usp: v } })} />
                            <TextInput label="후기" value={data.nav.reviews} onChange={(v) => setData({ ...data, nav: { ...data.nav, reviews: v } })} />
                            <TextInput label="약도" value={data.nav.location} onChange={(v) => setData({ ...data, nav: { ...data.nav, location: v } })} />
                            <TextInput label="이벤트" value={data.nav.event} onChange={(v) => setData({ ...data, nav: { ...data.nav, event: v } })} />
                            <TextInput label="FAQ" value={data.nav.faq} onChange={(v) => setData({ ...data, nav: { ...data.nav, faq: v } })} />
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">버튼</h2>
                            <TextInput label="전화 상담 버튼" value={data.buttons.call} onChange={(v) => setData({ ...data, buttons: { ...data.buttons, call: v } })} />
                        </div>
                        <SaveButton onClick={handleSave} loading={saving} />
                    </div>
                )}
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </AdminPageWrapper>
    );
}
