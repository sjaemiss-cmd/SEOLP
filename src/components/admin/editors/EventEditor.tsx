"use client";

import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import ArrayEditor from "./ArrayEditor";

interface EventPlan {
    tag: string;
    icon: string;
    title: string;
    description: string;
    benefitLabel: string;
    benefitBadge: string;
    benefitText: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    highlighted: boolean;
}

interface EventData {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    urgencyNote: string;
    plans: EventPlan[];
    disclaimer: string;
}

interface EventEditorProps {
    data: EventData;
    onChange: (data: EventData) => void;
}

export default function EventEditor({ data, onChange }: EventEditorProps) {
    return (
        <div className="space-y-4">
            <TextInput label="배지 텍스트" value={data.badge || ""} onChange={(v) => onChange({ ...data, badge: v })} />
            <TextInput label="제목" value={data.title || ""} onChange={(v) => onChange({ ...data, title: v })} />
            <TextInput label="제목 강조 부분" value={data.titleHighlight || ""} onChange={(v) => onChange({ ...data, titleHighlight: v })} />
            <TextInput label="부제목" value={data.subtitle || ""} onChange={(v) => onChange({ ...data, subtitle: v })} />
            <TextArea label="긴급 안내" value={data.urgencyNote || ""} onChange={(v) => onChange({ ...data, urgencyNote: v })} rows={2} />

            <ArrayEditor<EventPlan>
                label="요금제 카드"
                items={data.plans || []}
                onChange={(plans) => onChange({ ...data, plans })}
                maxItems={2}
                createItem={() => ({
                    tag: "",
                    icon: "Cookie",
                    title: "",
                    description: "",
                    benefitLabel: "",
                    benefitBadge: "",
                    benefitText: "",
                    features: [],
                    ctaText: "",
                    ctaLink: "",
                    highlighted: false,
                })}
                renderItem={(plan, _index, update) => (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput label="태그" value={plan.tag} onChange={(v) => update({ ...plan, tag: v })} />
                            <TextInput label="아이콘" value={plan.icon} onChange={(v) => update({ ...plan, icon: v })} helperText="Cookie, Gift 등" />
                        </div>
                        <TextInput label="제목" value={plan.title} onChange={(v) => update({ ...plan, title: v })} />
                        <TextArea label="설명" value={plan.description} onChange={(v) => update({ ...plan, description: v })} rows={2} />
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput label="혜택 라벨" value={plan.benefitLabel} onChange={(v) => update({ ...plan, benefitLabel: v })} />
                            <TextInput label="혜택 배지" value={plan.benefitBadge} onChange={(v) => update({ ...plan, benefitBadge: v })} />
                        </div>
                        <TextInput label="혜택 텍스트" value={plan.benefitText} onChange={(v) => update({ ...plan, benefitText: v })} />
                        <ArrayEditor<string>
                            label="특징 목록"
                            items={plan.features || []}
                            onChange={(features) => update({ ...plan, features })}
                            createItem={() => ""}
                            renderItem={(feat, _fi, updateFeat) => (
                                <input type="text" value={feat} onChange={(e) => updateFeat(e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none" />
                            )}
                        />
                        <TextInput label="CTA 텍스트" value={plan.ctaText} onChange={(v) => update({ ...plan, ctaText: v })} />
                        <TextInput label="CTA 링크" value={plan.ctaLink} onChange={(v) => update({ ...plan, ctaLink: v })} />
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={plan.highlighted} onChange={(e) => update({ ...plan, highlighted: e.target.checked })} className="rounded border-gray-300" />
                            강조 (BEST CHOICE)
                        </label>
                    </div>
                )}
            />

            <TextArea label="면책조항" value={data.disclaimer || ""} onChange={(v) => onChange({ ...data, disclaimer: v })} rows={2} />
        </div>
    );
}
