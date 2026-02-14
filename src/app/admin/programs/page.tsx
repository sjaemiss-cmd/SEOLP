"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import TextInput from "@/components/admin/editors/TextInput";
import TextArea from "@/components/admin/editors/TextArea";
import ArrayEditor from "@/components/admin/editors/ArrayEditor";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";

interface ProgramItem {
    id: string;
    title: string;
    description: string;
    badge: string;
}

interface ProgramTeaserData {
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaText: string;
    programs: ProgramItem[];
}

export default function AdminProgramsPage() {
    const [data, setData] = useState<ProgramTeaserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config/programTeaser")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/config/programTeaser", {
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
                <h1 className="text-2xl font-bold text-gray-900 mb-6">프로그램 카드 관리</h1>
                {data && (
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">섹션 헤더</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <TextInput label="제목" value={data.title} onChange={(v) => setData({ ...data, title: v })} />
                                <TextInput label="강조 텍스트" value={data.titleHighlight} onChange={(v) => setData({ ...data, titleHighlight: v })} />
                            </div>
                            <TextInput label="부제목" value={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} />
                            <TextInput label="CTA 텍스트" value={data.ctaText} onChange={(v) => setData({ ...data, ctaText: v })} />
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <ArrayEditor
                                label="프로그램 카드"
                                items={data.programs}
                                onChange={(programs) => setData({ ...data, programs })}
                                maxItems={6}
                                createItem={() => ({ id: "", title: "", description: "", badge: "" })}
                                renderItem={(item, _idx, update) => (
                                    <div className="space-y-3">
                                        <TextInput label="ID (URL 경로)" value={item.id} onChange={(v) => update({ ...item, id: v })} helperText="speed, skill, cost, phobia, practice" />
                                        <TextInput label="제목" value={item.title} onChange={(v) => update({ ...item, title: v })} />
                                        <TextArea label="설명" value={item.description} onChange={(v) => update({ ...item, description: v })} rows={2} />
                                        <TextInput label="배지" value={item.badge} onChange={(v) => update({ ...item, badge: v })} />
                                    </div>
                                )}
                            />
                        </div>

                        <SaveButton onClick={handleSave} loading={saving} />
                    </div>
                )}
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </AdminPageWrapper>
    );
}
