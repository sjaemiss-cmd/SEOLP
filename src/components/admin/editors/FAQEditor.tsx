"use client";

import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import ArrayEditor from "./ArrayEditor";

interface FAQItem {
    q: string;
    a: string;
}

interface FAQData {
    title: string;
    items: FAQItem[];
}

interface FAQEditorProps {
    data: FAQData;
    onChange: (data: FAQData) => void;
}

export default function FAQEditor({ data, onChange }: FAQEditorProps) {
    return (
        <div className="space-y-4">
            <TextInput label="FAQ 섹션 제목" value={data.title || ""} onChange={(v) => onChange({ ...data, title: v })} />
            <ArrayEditor<FAQItem>
                label="FAQ 항목"
                items={data.items || []}
                onChange={(items) => onChange({ ...data, items })}
                createItem={() => ({ q: "", a: "" })}
                renderItem={(item, _index, update) => (
                    <div className="space-y-3">
                        <TextInput label="질문" value={item.q} onChange={(v) => update({ ...item, q: v })} />
                        <TextArea label="답변" value={item.a} onChange={(v) => update({ ...item, a: v })} rows={3} />
                    </div>
                )}
            />
        </div>
    );
}
