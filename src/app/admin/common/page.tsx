"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import TextInput from "@/components/admin/editors/TextInput";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";
import { usePreviewSync } from "@/hooks/usePreviewSync";

interface CommonData {
    companyName: string;
    phoneNumber: string;
    address: string;
    businessNumber: string;
    copyright: string;
}

export default function AdminCommonPage() {
    const [data, setData] = useState<CommonData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config/common")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/config/common", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setToast({ message: "저장 완료!", type: "success" });
            } else {
                const err = await res.json();
                setToast({ message: err.error || "저장 실패", type: "error" });
            }
        } catch {
            setToast({ message: "저장 중 오류 발생", type: "error" });
        } finally {
            setSaving(false);
        }
    }, [data]);

    usePreviewSync({ section: "common", data });

    if (loading) return <AdminPageWrapper><div className="animate-pulse">로딩 중...</div></AdminPageWrapper>;

    return (
        <AdminPageWrapper>
            <div className="max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">공통정보</h1>
                {data && (
                    <div className="space-y-4 bg-white rounded-xl border border-gray-200 p-6">
                        <TextInput label="회사명" value={data.companyName} onChange={(v) => setData({ ...data, companyName: v })} />
                        <TextInput label="전화번호" value={data.phoneNumber} onChange={(v) => setData({ ...data, phoneNumber: v })} />
                        <TextInput label="주소" value={data.address} onChange={(v) => setData({ ...data, address: v })} />
                        <TextInput label="사업자번호" value={data.businessNumber} onChange={(v) => setData({ ...data, businessNumber: v })} />
                        <TextInput label="저작권 문구" value={data.copyright} onChange={(v) => setData({ ...data, copyright: v })} helperText="{{YEAR}}는 현재 연도로 자동 치환됩니다" />
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
