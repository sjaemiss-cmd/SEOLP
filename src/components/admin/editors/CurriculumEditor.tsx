"use client";

import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import HtmlEditor from "./HtmlEditor";
import ArrayEditor from "./ArrayEditor";

interface CurriculumStep {
    step: string;
    title: string;
    description: string;
}

interface CurriculumData {
    title: string;
    steps: CurriculumStep[];
}

interface CurriculumEditorProps {
    data: CurriculumData;
    onChange: (data: CurriculumData) => void;
}

export default function CurriculumEditor({ data, onChange }: CurriculumEditorProps) {
    return (
        <div className="space-y-4">
            <HtmlEditor label="제목 (HTML 지원)" value={data.title || ""} onChange={(v) => onChange({ ...data, title: v })} />
            <ArrayEditor<CurriculumStep>
                label="커리큘럼 단계"
                items={data.steps || []}
                onChange={(steps) => onChange({ ...data, steps })}
                createItem={() => ({ step: `Step ${(data.steps?.length || 0) + 1}`, title: "", description: "" })}
                renderItem={(item, _index, update) => (
                    <div className="space-y-3">
                        <TextInput label="단계 라벨" value={item.step} onChange={(v) => update({ ...item, step: v })} placeholder="예: Step 1" />
                        <TextInput label="제목" value={item.title} onChange={(v) => update({ ...item, title: v })} />
                        <TextArea label="설명" value={item.description} onChange={(v) => update({ ...item, description: v })} rows={2} helperText="줄바꿈: \n" />
                    </div>
                )}
            />
        </div>
    );
}
