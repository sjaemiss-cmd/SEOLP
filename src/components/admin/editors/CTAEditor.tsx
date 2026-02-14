"use client";

import React from "react";
import TextInput from "./TextInput";

interface CTAData {
    title: string;
    subtitle: string;
    button: string;
    link?: string;
}

interface CTAEditorProps {
    data: CTAData;
    onChange: (data: CTAData) => void;
}

export default function CTAEditor({ data, onChange }: CTAEditorProps) {
    return (
        <div className="space-y-4">
            <TextInput label="제목" value={data.title || ""} onChange={(v) => onChange({ ...data, title: v })} />
            <TextInput label="부제목" value={data.subtitle || ""} onChange={(v) => onChange({ ...data, subtitle: v })} />
            <TextInput label="버튼 텍스트" value={data.button || ""} onChange={(v) => onChange({ ...data, button: v })} />
            <TextInput label="링크 (선택)" value={data.link || ""} onChange={(v) => onChange({ ...data, link: v })} placeholder="https://..." />
        </div>
    );
}
