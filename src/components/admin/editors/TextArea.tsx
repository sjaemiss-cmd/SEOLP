"use client";

import React from "react";

interface TextAreaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    placeholder?: string;
    maxLength?: number;
    helperText?: string;
}

export default function TextArea({ label, value, onChange, rows = 3, placeholder, maxLength, helperText }: TextAreaProps) {
    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                {maxLength && (
                    <span className={`text-xs ${value.length > maxLength ? "text-red-500" : "text-gray-400"}`}>
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-y"
            />
            {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
        </div>
    );
}
