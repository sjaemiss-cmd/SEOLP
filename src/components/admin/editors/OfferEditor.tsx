"use client";

import React from "react";
import TextInput from "./TextInput";
import HtmlEditor from "./HtmlEditor";
import ArrayEditor from "./ArrayEditor";

interface OfferData {
    title: string;
    priceDescription: string;
    points: string[];
    ctaText: string;
    ctaLink?: string;
}

interface OfferEditorProps {
    data: OfferData;
    onChange: (data: OfferData) => void;
}

export default function OfferEditor({ data, onChange }: OfferEditorProps) {
    return (
        <div className="space-y-4">
            <HtmlEditor label="제목 (HTML 지원)" value={data.title || ""} onChange={(v) => onChange({ ...data, title: v })} />
            <TextInput label="가격 설명" value={data.priceDescription || ""} onChange={(v) => onChange({ ...data, priceDescription: v })} placeholder="예: 550,000원 (부가세 포함)" />
            <ArrayEditor<string>
                label="포인트 항목"
                items={data.points || []}
                onChange={(points) => onChange({ ...data, points })}
                createItem={() => ""}
                renderItem={(item, _index, update) => (
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => update(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                        placeholder="포인트 항목 입력"
                    />
                )}
            />
            <TextInput label="CTA 버튼 텍스트" value={data.ctaText || ""} onChange={(v) => onChange({ ...data, ctaText: v })} />
            <TextInput label="CTA 링크 (선택)" value={data.ctaLink || ""} onChange={(v) => onChange({ ...data, ctaLink: v })} placeholder="https://..." />
        </div>
    );
}
