"use client";

import React, { useState } from "react";

interface HtmlEditorProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    helperText?: string;
}

export default function HtmlEditor({ label, value, onChange, rows = 4, helperText }: HtmlEditorProps) {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                >
                    {showPreview ? "편집" : "미리보기"}
                </button>
            </div>
            {showPreview ? (
                <div
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 min-h-[80px]"
                    dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, "<br/>") }}
                />
            ) : (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-y"
                />
            )}
            {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
        </div>
    );
}
