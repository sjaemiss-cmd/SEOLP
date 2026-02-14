"use client";

import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import ArrayEditor from "./ArrayEditor";

interface DiagnosisOption {
    id: string;
    text: string;
    score: number;
}

interface DiagnosisQuestion {
    id: number;
    question: string;
    options: DiagnosisOption[];
}

interface DiagnosisResult {
    minScore: number;
    maxScore: number;
    level: string;
    description: string;
    recommendation: string;
    color: string;
}

interface DiagnosisData {
    title: string;
    subtitle: string;
    questions: DiagnosisQuestion[];
    results: DiagnosisResult[];
}

interface DiagnosisEditorProps {
    data: DiagnosisData;
    onChange: (data: DiagnosisData) => void;
}

export default function DiagnosisEditor({ data, onChange }: DiagnosisEditorProps) {
    return (
        <div className="space-y-6">
            <TextInput label="제목" value={data.title || ""} onChange={(v) => onChange({ ...data, title: v })} />
            <TextInput label="부제목" value={data.subtitle || ""} onChange={(v) => onChange({ ...data, subtitle: v })} />

            <ArrayEditor<DiagnosisQuestion>
                label="질문"
                items={data.questions || []}
                onChange={(questions) => onChange({ ...data, questions })}
                createItem={() => ({
                    id: (data.questions?.length || 0) + 1,
                    question: "",
                    options: [
                        { id: "a", text: "", score: 1 },
                        { id: "b", text: "", score: 2 },
                        { id: "c", text: "", score: 3 },
                        { id: "d", text: "", score: 4 },
                    ],
                })}
                renderItem={(q, _index, updateQ) => (
                    <div className="space-y-3">
                        <TextInput label={`질문 ${q.id}`} value={q.question} onChange={(v) => updateQ({ ...q, question: v })} />
                        <div className="space-y-2 pl-4">
                            {q.options.map((opt, oi) => (
                                <div key={opt.id} className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-500 w-4">{opt.id}.</span>
                                    <input
                                        type="text"
                                        value={opt.text}
                                        onChange={(e) => {
                                            const newOptions = [...q.options];
                                            newOptions[oi] = { ...opt, text: e.target.value };
                                            updateQ({ ...q, options: newOptions });
                                        }}
                                        className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                                    />
                                    <input
                                        type="number"
                                        value={opt.score}
                                        onChange={(e) => {
                                            const newOptions = [...q.options];
                                            newOptions[oi] = { ...opt, score: parseInt(e.target.value) || 0 };
                                            updateQ({ ...q, options: newOptions });
                                        }}
                                        className="w-16 px-2 py-1.5 border border-gray-300 rounded text-sm text-center focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            />

            <ArrayEditor<DiagnosisResult>
                label="결과"
                items={data.results || []}
                onChange={(results) => onChange({ ...data, results })}
                createItem={() => ({
                    minScore: 0,
                    maxScore: 0,
                    level: "",
                    description: "",
                    recommendation: "",
                    color: "text-gray-500",
                })}
                renderItem={(r, _index, updateR) => (
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-500">최소 점수</label>
                                <input type="number" value={r.minScore} onChange={(e) => updateR({ ...r, minScore: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none" />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-500">최대 점수</label>
                                <input type="number" value={r.maxScore} onChange={(e) => updateR({ ...r, maxScore: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none" />
                            </div>
                        </div>
                        <TextInput label="레벨" value={r.level} onChange={(v) => updateR({ ...r, level: v })} />
                        <TextArea label="설명" value={r.description} onChange={(v) => updateR({ ...r, description: v })} rows={2} />
                        <TextInput label="추천" value={r.recommendation} onChange={(v) => updateR({ ...r, recommendation: v })} />
                        <TextInput label="색상 클래스" value={r.color} onChange={(v) => updateR({ ...r, color: v })} placeholder="예: text-red-500" />
                    </div>
                )}
            />
        </div>
    );
}
