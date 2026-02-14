"use client";

import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import HtmlEditor from "./HtmlEditor";
import ArrayEditor from "./ArrayEditor";
import IconSelector from "./IconSelector";

interface FeatureItem {
    title: string;
    description: string;
    icon?: string;
    highlight?: boolean;
}

interface ProblemData {
    title: string;
    subtitle: string;
    features: FeatureItem[];
}

interface ProblemEditorProps {
    data: ProblemData;
    onChange: (data: ProblemData) => void;
}

export default function ProblemEditor({ data, onChange }: ProblemEditorProps) {
    return (
        <div className="space-y-4">
            <HtmlEditor label="제목 (HTML 지원)" value={data.title || ""} onChange={(v) => onChange({ ...data, title: v })} />
            <TextInput label="부제목" value={data.subtitle || ""} onChange={(v) => onChange({ ...data, subtitle: v })} />
            <ArrayEditor<FeatureItem>
                label="특징 항목"
                items={data.features || []}
                onChange={(features) => onChange({ ...data, features })}
                createItem={() => ({ title: "", description: "", icon: "check", highlight: false })}
                renderItem={(item, _index, update) => (
                    <div className="space-y-3">
                        <TextInput label="제목" value={item.title} onChange={(v) => update({ ...item, title: v })} />
                        <TextArea label="설명" value={item.description} onChange={(v) => update({ ...item, description: v })} rows={2} helperText="줄바꿈: \n" />
                        <IconSelector label="아이콘" value={item.icon || "check"} onChange={(v) => update({ ...item, icon: v })} />
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={item.highlight || false} onChange={(e) => update({ ...item, highlight: e.target.checked })} className="rounded border-gray-300" />
                            강조 표시
                        </label>
                    </div>
                )}
            />
        </div>
    );
}
