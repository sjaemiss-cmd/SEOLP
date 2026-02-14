"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import TextInput from "@/components/admin/editors/TextInput";
import TextArea from "@/components/admin/editors/TextArea";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";
import { usePreviewSync } from "@/hooks/usePreviewSync";

interface FooterData {
    customerCenter: string;
    operatingHours: string;
}

export default function AdminFooterPage() {
    const [data, setData] = useState<FooterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config/footer")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/config/footer", {
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

    usePreviewSync({ section: "footer", data });

    if (loading) return <AdminPageWrapper><div className="animate-pulse">로딩 중...</div></AdminPageWrapper>;

    return (
        <AdminPageWrapper>
            <div className="max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">푸터 설정</h1>
                {data && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                        <TextInput label="고객센터 라벨" value={data.customerCenter} onChange={(v) => setData({ ...data, customerCenter: v })} />
                        <TextArea label="영업시간" value={data.operatingHours} onChange={(v) => setData({ ...data, operatingHours: v })} rows={3} helperText="줄바꿈은 \n으로 표시됩니다" />
                        <div className="pt-4">
                            <SaveButton onClick={handleSave} loading={saving} />
                        </div>
                    </div>
                )}
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </AdminPageWrapper>
    );
}
