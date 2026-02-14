"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import TextInput from "@/components/admin/editors/TextInput";
import TextArea from "@/components/admin/editors/TextArea";
import ArrayEditor from "@/components/admin/editors/ArrayEditor";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";

interface LocationFeature {
    icon: string;
    title: string;
    description: string;
}

interface LocationData {
    stationName: string;
    walkTime: string;
    subtitle: string;
    mapLink: string;
    mapButtonText: string;
    features: LocationFeature[];
}

export default function AdminLocationPage() {
    const [data, setData] = useState<LocationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config/location")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/config/location", {
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
                <h1 className="text-2xl font-bold text-gray-900 mb-6">위치 안내 섹션</h1>
                {data && (
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">헤더 정보</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <TextInput label="역 이름" value={data.stationName} onChange={(v) => setData({ ...data, stationName: v })} />
                                <TextInput label="도보 시간" value={data.walkTime} onChange={(v) => setData({ ...data, walkTime: v })} />
                            </div>
                            <TextInput label="부제목" value={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} />
                            <TextInput label="지도 링크" value={data.mapLink} onChange={(v) => setData({ ...data, mapLink: v })} />
                            <TextInput label="지도 버튼 텍스트" value={data.mapButtonText} onChange={(v) => setData({ ...data, mapButtonText: v })} />
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <ArrayEditor
                                label="특징 항목"
                                items={data.features}
                                onChange={(features) => setData({ ...data, features })}
                                maxItems={5}
                                createItem={() => ({ icon: "MapPin", title: "", description: "" })}
                                renderItem={(item, _idx, update) => (
                                    <div className="space-y-3">
                                        <TextInput label="아이콘" value={item.icon} onChange={(v) => update({ ...item, icon: v })} helperText="MapPin, Check, Clock" />
                                        <TextInput label="제목" value={item.title} onChange={(v) => update({ ...item, title: v })} />
                                        <TextArea label="설명" value={item.description} onChange={(v) => update({ ...item, description: v })} rows={3} />
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
