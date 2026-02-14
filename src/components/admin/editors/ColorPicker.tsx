"use client";

import React from "react";

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex items-center gap-3">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                    placeholder="#000000"
                />
                <div
                    className="w-10 h-10 rounded-lg border border-gray-200"
                    style={{ backgroundColor: value }}
                />
            </div>
        </div>
    );
}
