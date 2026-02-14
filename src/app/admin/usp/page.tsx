"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import TextInput from "@/components/admin/editors/TextInput";
import TextArea from "@/components/admin/editors/TextArea";
import ArrayEditor from "@/components/admin/editors/ArrayEditor";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";

interface UspCard {
    badge: string;
    title: string;
    description: string;
}

export default function AdminUSPPage() {
    const [data, setData] = useState<UspCard[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config/uspCards")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/config/uspCards", {
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
            <div className="max-w-3xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">USP 카드 텍스트</h1>
                <p className="text-sm text-gray-500 mb-6">
                    메인 페이지 비디오 그리드 카드의 텍스트를 관리합니다. 카드 순서: 1.합격무제한 2.연예인 3.접근성 4.1:1코칭 5.안전 6.현실감
                </p>
                {data && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <ArrayEditor
                            label="USP 카드"
                            items={data}
                            onChange={setData}
                            maxItems={6}
                            createItem={() => ({ badge: "", title: "", description: "" })}
                            renderItem={(item, idx, update) => (
                                <div className="space-y-3">
                                    <div className="text-xs font-medium text-gray-400 mb-1">카드 #{idx + 1}</div>
                                    <TextInput label="배지 텍스트" value={item.badge} onChange={(v) => update({ ...item, badge: v })} />
                                    <TextArea label="제목" value={item.title} onChange={(v) => update({ ...item, title: v })} rows={2} helperText="줄바꿈(\n) 사용 가능" />
                                    <TextArea label="설명" value={item.description} onChange={(v) => update({ ...item, description: v })} rows={2} />
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
