"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Film, X } from "lucide-react";
import MediaBrowser from "./MediaBrowser";

interface MediaPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: "image" | "video" | "all";
    helperText?: string;
}

export default function MediaPicker({ label, value, onChange, type = "all", helperText }: MediaPickerProps) {
    const [browserOpen, setBrowserOpen] = useState(false);
    const isVideo = value && (value.endsWith('.mp4') || value.endsWith('.webm'));

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex gap-3 items-start">
                {/* Preview */}
                <div className="w-24 h-24 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center relative shrink-0">
                    {value ? (
                        isVideo ? (
                            <div className="flex flex-col items-center gap-1 text-gray-400">
                                <Film size={24} />
                                <span className="text-[10px]">영상</span>
                            </div>
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={value} alt="미리보기" className="w-full h-full object-cover" />
                        )
                    ) : (
                        <ImageIcon size={24} className="text-gray-300" />
                    )}
                </div>

                {/* Controls */}
                <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setBrowserOpen(true)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
                        >
                            {value ? "변경" : "선택"}
                        </button>
                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange("")}
                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    {value && (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs font-mono text-gray-500 focus:ring-1 focus:ring-gray-900 focus:border-transparent outline-none"
                            placeholder="경로 직접 입력"
                        />
                    )}
                    {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
                </div>
            </div>

            <MediaBrowser
                open={browserOpen}
                onClose={() => setBrowserOpen(false)}
                onSelect={onChange}
                filter={type}
            />
        </div>
    );
}
