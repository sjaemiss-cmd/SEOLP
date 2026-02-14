"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import MediaPicker from "@/components/admin/editors/MediaPicker";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";

interface MediaData {
    logo: string;
    heroBackground: string;
    mapImage: string;
    speakerIcon: string;
    eventBackground: string;
    videos: {
        celeb: string;
        station: string;
        accident: string;
        function: string;
        motion: string;
    };
    programCards: {
        speed: string;
        skill: string;
        cost: string;
        phobia: string;
        practice: string;
    };
}

export default function AdminMediaPage() {
    const [data, setData] = useState<MediaData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config/media")
            .then((r) => r.json())
            .then((d) => setData(d))
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/config/media", {
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
                <h1 className="text-2xl font-bold text-gray-900 mb-6">미디어 관리</h1>

                {data && (
                    <div className="space-y-6">
                        {/* 공통 이미지 */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">공통 이미지</h2>
                            <MediaPicker label="로고" value={data.logo} onChange={(v) => setData({ ...data, logo: v })} type="image" />
                            <MediaPicker label="히어로 배경" value={data.heroBackground} onChange={(v) => setData({ ...data, heroBackground: v })} type="image" />
                            <MediaPicker label="네이버 지도 이미지" value={data.mapImage} onChange={(v) => setData({ ...data, mapImage: v })} type="image" />
                            <MediaPicker label="스피커 아이콘 (FAQ)" value={data.speakerIcon} onChange={(v) => setData({ ...data, speakerIcon: v })} type="image" />
                            <MediaPicker label="이벤트 배경 이미지" value={data.eventBackground} onChange={(v) => setData({ ...data, eventBackground: v })} type="image" />
                        </div>

                        {/* 영상 */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">영상 (USP 섹션)</h2>
                            <MediaPicker label="셀럽 영상" value={data.videos.celeb} onChange={(v) => setData({ ...data, videos: { ...data.videos, celeb: v } })} type="video" />
                            <MediaPicker label="시설 영상 (역세권)" value={data.videos.station} onChange={(v) => setData({ ...data, videos: { ...data.videos, station: v } })} type="video" />
                            <MediaPicker label="안전 영상 (사고)" value={data.videos.accident} onChange={(v) => setData({ ...data, videos: { ...data.videos, accident: v } })} type="video" />
                            <MediaPicker label="시뮬레이션 영상 (기능)" value={data.videos.function} onChange={(v) => setData({ ...data, videos: { ...data.videos, function: v } })} type="video" />
                            <MediaPicker label="시뮬레이션 영상 (모션)" value={data.videos.motion} onChange={(v) => setData({ ...data, videos: { ...data.videos, motion: v } })} type="video" />
                        </div>

                        {/* 프로그램 카드 */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">프로그램 카드 배경</h2>
                            <MediaPicker label="속성 (Speed)" value={data.programCards.speed} onChange={(v) => setData({ ...data, programCards: { ...data.programCards, speed: v } })} type="image" />
                            <MediaPicker label="스킬 (Skill)" value={data.programCards.skill} onChange={(v) => setData({ ...data, programCards: { ...data.programCards, skill: v } })} type="image" />
                            <MediaPicker label="가성비 (Cost)" value={data.programCards.cost} onChange={(v) => setData({ ...data, programCards: { ...data.programCards, cost: v } })} type="image" />
                            <MediaPicker label="공포증 (Phobia)" value={data.programCards.phobia} onChange={(v) => setData({ ...data, programCards: { ...data.programCards, phobia: v } })} type="image" />
                            <MediaPicker label="연습 (Practice)" value={data.programCards.practice} onChange={(v) => setData({ ...data, programCards: { ...data.programCards, practice: v } })} type="image" />
                        </div>

                        <SaveButton onClick={handleSave} loading={saving} />
                    </div>
                )}
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </AdminPageWrapper>
    );
}
