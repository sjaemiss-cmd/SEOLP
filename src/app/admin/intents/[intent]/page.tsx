"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import ColorPicker from "@/components/admin/editors/ColorPicker";
import TextInput from "@/components/admin/editors/TextInput";
import TextArea from "@/components/admin/editors/TextArea";
import ArrayEditor from "@/components/admin/editors/ArrayEditor";
import HeroEditor from "@/components/admin/editors/HeroEditor";
import ProblemEditor from "@/components/admin/editors/ProblemEditor";
import CurriculumEditor from "@/components/admin/editors/CurriculumEditor";
import OfferEditor from "@/components/admin/editors/OfferEditor";
import DiagnosisEditor from "@/components/admin/editors/DiagnosisEditor";
import CTAEditor from "@/components/admin/editors/CTAEditor";
import SaveButton from "@/components/admin/editors/SaveButton";
import Toast from "@/components/admin/Toast";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { usePreviewSync } from "@/hooks/usePreviewSync";

const INTENT_LABELS: Record<string, string> = {
    speed: "속성 (Speed)",
    skill: "스킬 (Skill)",
    cost: "가성비 (Cost)",
    phobia: "공포증 (Phobia)",
    practice: "연습 (Practice)",
};

const INTENT_COLORS: Record<string, string> = {
    speed: "#EF4444",
    skill: "#3B82F6",
    cost: "#FECE48",
    phobia: "#4ADE80",
    practice: "#8B5CF6",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IntentData = any;

function AccordionPanel({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
            >
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <ChevronDown size={20} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && <div className="px-6 pb-6">{children}</div>}
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CaseStudyEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const update = (key: string, value: unknown) => onChange({ ...data, [key]: value });
    const updateSide = (side: 'before' | 'after', key: string, value: unknown) =>
        onChange({ ...data, [side]: { ...(data[side] || {}), [key]: value } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateStat = (side: 'before' | 'after', idx: number, stat: any) => {
        const stats = [...(data[side]?.stats || [])];
        stats[idx] = stat;
        updateSide(side, 'stats', stats);
    };

    return (
        <div className="space-y-6">
            <TextInput label="배지" value={data.badge || ""} onChange={(v) => update("badge", v)} />
            <TextInput label="제목" value={data.title || ""} onChange={(v) => update("title", v)} />
            <TextInput label="강조 텍스트" value={data.titleHighlight || ""} onChange={(v) => update("titleHighlight", v)} />
            <TextArea label="부제목" value={data.subtitle || ""} onChange={(v) => update("subtitle", v)} />

            <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">BEFORE (일반 학원)</h4>
                <div className="space-y-3 pl-4">
                    <TextInput label="제목" value={data.before?.title || ""} onChange={(v) => updateSide("before", "title", v)} />
                    <TextInput label="부제목" value={data.before?.subtitle || ""} onChange={(v) => updateSide("before", "subtitle", v)} />
                    <TextInput label="이미지 경로" value={data.before?.image || ""} onChange={(v) => updateSide("before", "image", v)} />
                    <TextArea label="인용문" value={data.before?.quote || ""} onChange={(v) => updateSide("before", "quote", v)} rows={3} />
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">통계</label>
                        {(data.before?.stats || []).map((stat: { label: string; value: string; negative: boolean }, idx: number) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <input className="flex-1 px-2 py-1 border rounded text-sm" value={stat.label} onChange={(e) => updateStat("before", idx, { ...stat, label: e.target.value })} placeholder="라벨" />
                                <input className="flex-1 px-2 py-1 border rounded text-sm" value={stat.value} onChange={(e) => updateStat("before", idx, { ...stat, value: e.target.value })} placeholder="값" />
                                <label className="flex items-center gap-1 text-xs">
                                    <input type="checkbox" checked={stat.negative} onChange={(e) => updateStat("before", idx, { ...stat, negative: e.target.checked })} />
                                    부정
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">AFTER (고수의 운전면허)</h4>
                <div className="space-y-3 pl-4">
                    <TextInput label="제목" value={data.after?.title || ""} onChange={(v) => updateSide("after", "title", v)} />
                    <TextInput label="부제목" value={data.after?.subtitle || ""} onChange={(v) => updateSide("after", "subtitle", v)} />
                    <TextInput label="이미지 경로" value={data.after?.image || ""} onChange={(v) => updateSide("after", "image", v)} />
                    <TextInput label="이미지 제목" value={data.after?.imageTitle || ""} onChange={(v) => updateSide("after", "imageTitle", v)} />
                    <TextInput label="이미지 부제목" value={data.after?.imageSubtitle || ""} onChange={(v) => updateSide("after", "imageSubtitle", v)} />
                    <TextArea label="인용문" value={data.after?.quote || ""} onChange={(v) => updateSide("after", "quote", v)} rows={3} />
                    <TextInput label="CTA 텍스트" value={data.after?.ctaText || ""} onChange={(v) => updateSide("after", "ctaText", v)} />
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">통계</label>
                        {(data.after?.stats || []).map((stat: { label: string; value: string; negative: boolean }, idx: number) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <input className="flex-1 px-2 py-1 border rounded text-sm" value={stat.label} onChange={(e) => updateStat("after", idx, { ...stat, label: e.target.value })} placeholder="라벨" />
                                <input className="flex-1 px-2 py-1 border rounded text-sm" value={stat.value} onChange={(e) => updateStat("after", idx, { ...stat, value: e.target.value })} placeholder="값" />
                                <label className="flex items-center gap-1 text-xs">
                                    <input type="checkbox" checked={stat.negative} onChange={(e) => updateStat("after", idx, { ...stat, negative: e.target.checked })} />
                                    부정
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SolutionEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    return (
        <div className="space-y-4">
            <TextInput label="경쟁사 제목" value={data.competitorTitle || ""} onChange={(v) => onChange({ ...data, competitorTitle: v })} />
            <TextInput label="솔루션 제목" value={data.title || ""} onChange={(v) => onChange({ ...data, title: v })} />
            <ArrayEditor
                label="솔루션 항목"
                items={data.items || []}
                onChange={(items) => onChange({ ...data, items })}
                maxItems={6}
                createItem={() => ({ title: "", description: "" })}
                renderItem={(item, _idx, update) => (
                    <div className="space-y-2">
                        <TextInput label="제목" value={item.title} onChange={(v) => update({ ...item, title: v })} />
                        <TextInput label="설명" value={item.description} onChange={(v) => update({ ...item, description: v })} />
                    </div>
                )}
            />
        </div>
    );
}

function ChecklistEditor({ checklist, onChange }: { checklist: string[]; onChange: (items: string[]) => void }) {
    return (
        <div className="space-y-3">
            <p className="text-sm text-gray-500">Practice 문제 섹션 카드 하단에 표시되는 체크리스트 항목입니다.</p>
            {checklist.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                    <input
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        value={item}
                        onChange={(e) => {
                            const updated = [...checklist];
                            updated[idx] = e.target.value;
                            onChange(updated);
                        }}
                    />
                    <button
                        onClick={() => onChange(checklist.filter((_, i) => i !== idx))}
                        className="p-2 text-red-400 hover:text-red-600"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}
            <button
                onClick={() => onChange([...checklist, ""])}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
            >
                <Plus size={14} /> 항목 추가
            </button>
        </div>
    );
}

export default function AdminIntentPage() {
    const params = useParams();
    const intent = params.intent as string;
    const [data, setData] = useState<IntentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/admin/config/intents/${intent}`)
            .then((r) => r.json())
            .then((d) => { setData(d); setHasChanges(false); })
            .catch(() => setToast({ message: "데이터 로드 실패", type: "error" }))
            .finally(() => setLoading(false));
    }, [intent]);

    useEffect(() => {
        if (!hasChanges) return;
        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };
        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [hasChanges]);

    const updateData = useCallback((newData: IntentData) => {
        setData(newData);
        setHasChanges(true);
    }, []);

    const handleSave = useCallback(async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/config/intents/${intent}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setToast({ message: "저장 완료!", type: "success" });
                setHasChanges(false);
            } else {
                const err = await res.json();
                setToast({ message: err.error || "저장 실패", type: "error" });
            }
        } catch {
            setToast({ message: "저장 중 오류 발생", type: "error" });
        } finally {
            setSaving(false);
        }
    }, [data, intent]);

    usePreviewSync({ section: "intent-hero", data, intent, theme: data?.theme });

    if (loading) return <AdminPageWrapper><div className="animate-pulse">로딩 중...</div></AdminPageWrapper>;
    if (!data) return <AdminPageWrapper><div>인텐트를 찾을 수 없습니다.</div></AdminPageWrapper>;

    return (
        <AdminPageWrapper>
            <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: INTENT_COLORS[intent] || data.theme }}
                        />
                        <h1 className="text-2xl font-bold text-gray-900">
                            {INTENT_LABELS[intent] || intent}
                        </h1>
                        {data.designStyle && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {data.designStyle}
                            </span>
                        )}
                        {hasChanges && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">
                                미저장 변경
                            </span>
                        )}
                    </div>
                    <SaveButton onClick={handleSave} loading={saving} />
                </div>

                <div className="space-y-4">
                    {/* Theme & Design */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">테마 설정</h3>
                        <ColorPicker label="테마 컬러" value={data.theme || "#000000"} onChange={(v) => updateData({ ...data, theme: v })} />
                        {data.designStyle !== undefined && (
                            <TextInput label="디자인 스타일" value={data.designStyle || ""} onChange={(v) => updateData({ ...data, designStyle: v })} helperText="aggressive, trust, premium 중 하나" />
                        )}
                    </div>

                    {/* Hero */}
                    <AccordionPanel title="Hero 섹션" defaultOpen={true}>
                        <HeroEditor data={data.hero || {}} onChange={(hero) => updateData({ ...data, hero })} />
                    </AccordionPanel>

                    {/* Problem/USP */}
                    <AccordionPanel title="Problem / USP 섹션">
                        <ProblemEditor data={data.problem || {}} onChange={(problem) => updateData({ ...data, problem })} />
                    </AccordionPanel>

                    {/* Curriculum */}
                    <AccordionPanel title="커리큘럼 섹션">
                        <CurriculumEditor data={data.curriculum || {}} onChange={(curriculum) => updateData({ ...data, curriculum })} />
                    </AccordionPanel>

                    {/* Offer */}
                    <AccordionPanel title="제안/가격 섹션">
                        <OfferEditor data={data.offer || {}} onChange={(offer) => updateData({ ...data, offer })} />
                    </AccordionPanel>

                    {/* Diagnosis (skill only) */}
                    {intent === "skill" && data.diagnosis && (
                        <AccordionPanel title="진단 테스트 (Skill 전용)">
                            <DiagnosisEditor data={data.diagnosis} onChange={(diagnosis) => updateData({ ...data, diagnosis })} />
                        </AccordionPanel>
                    )}

                    {/* CTA (phobia only) */}
                    {intent === "phobia" && data.cta && (
                        <AccordionPanel title="CTA 섹션 (Phobia 전용)">
                            <CTAEditor data={data.cta} onChange={(cta) => updateData({ ...data, cta })} />
                        </AccordionPanel>
                    )}

                    {/* Case Study (speed only) */}
                    {intent === "speed" && (
                        <AccordionPanel title="사례 비교 (Speed 전용)">
                            <CaseStudyEditor
                                data={data.caseStudy || {}}
                                onChange={(caseStudy) => updateData({ ...data, caseStudy })}
                            />
                        </AccordionPanel>
                    )}

                    {/* Solution (speed only) */}
                    {intent === "speed" && (
                        <AccordionPanel title="솔루션 (Speed 전용)">
                            <SolutionEditor
                                data={data.solution || {}}
                                onChange={(solution) => updateData({ ...data, solution })}
                            />
                        </AccordionPanel>
                    )}

                    {/* Checklist (practice only) */}
                    {intent === "practice" && (
                        <AccordionPanel title="체크리스트 (Practice 전용)">
                            <ChecklistEditor
                                checklist={data.problem?.checklist || []}
                                onChange={(checklist) => updateData({ ...data, problem: { ...data.problem, checklist } })}
                            />
                        </AccordionPanel>
                    )}

                    {/* Bottom save button */}
                    <div className="pt-4">
                        <SaveButton onClick={handleSave} loading={saving} />
                    </div>
                </div>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </AdminPageWrapper>
    );
}
