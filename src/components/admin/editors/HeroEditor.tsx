"use client";

import React from "react";
import TextInput from "./TextInput";
import HtmlEditor from "./HtmlEditor";

interface HeroData {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink?: string;
}

interface HeroEditorProps {
    data: HeroData;
    onChange: (data: HeroData) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
    const update = (field: keyof HeroData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <TextInput label="배지 텍스트" value={data.badge || ""} onChange={(v) => update("badge", v)} placeholder="예: 노원·도봉 합격률 1위" />
            <HtmlEditor label="제목 (HTML 지원)" value={data.title || ""} onChange={(v) => update("title", v)} helperText="줄바꿈: \n 또는 <br/>, 강조: <span>..." />
            <HtmlEditor label="부제목 (HTML 지원)" value={data.subtitle || ""} onChange={(v) => update("subtitle", v)} />
            <TextInput label="CTA 버튼 텍스트" value={data.ctaText || ""} onChange={(v) => update("ctaText", v)} />
            <TextInput label="CTA 링크 (선택)" value={data.ctaLink || ""} onChange={(v) => update("ctaLink", v)} placeholder="https://..." />
        </div>
    );
}
