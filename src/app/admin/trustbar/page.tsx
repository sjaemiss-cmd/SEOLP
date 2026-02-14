"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import TextInput from "@/components/admin/editors/TextInput";
import ArrayEditor from "@/components/admin/editors/ArrayEditor";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";

interface TrustBarItem {
    value: string;
    prefix?: string;
    suffix?: string;
}

export default function AdminTrustBarPage() {
    const [data, setData] = useState<TrustBarItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config/trustBar")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/config/trustBar", {
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

    if (loading) return <AdminPageWrapper><div className="animate-pulse">로딩 중...</div></AdminPageWrapper>;

    return (
        <AdminPageWrapper>
            <div className="max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Trust Bar (신뢰 지표)</h1>
                <p className="text-sm text-gray-500 mb-6">Hero 섹션 하단에 표시되는 통계 지표입니다. (예: 5,000+ 명 합격)</p>
                {data && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <ArrayEditor
                            label="지표 항목"
                            items={data}
                            onChange={setData}
                            maxItems={5}
                            createItem={() => ({ value: "", prefix: "", suffix: "" })}
                            renderItem={(item, _idx, update) => (
                                <div className="space-y-3">
                                    <TextInput label="값 (굵게 표시)" value={item.value} onChange={(v) => update({ ...item, value: v })} />
                                    <div className="grid grid-cols-2 gap-3">
                                        <TextInput label="접두어 (앞)" value={item.prefix || ""} onChange={(v) => update({ ...item, prefix: v })} />
                                        <TextInput label="접미어 (뒤)" value={item.suffix || ""} onChange={(v) => update({ ...item, suffix: v })} />
                                    </div>
                                </div>
                            )}
                        />
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
