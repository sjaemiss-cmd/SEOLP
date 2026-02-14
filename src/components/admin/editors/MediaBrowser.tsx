"use client";

import React, { useState, useEffect, useRef } from "react";
import { Upload, X, Trash2, Image as ImageIcon, Film, Check } from "lucide-react";

interface MediaFile {
    name: string;
    path: string;
    size: number;
    type: "image" | "video";
    modified: string;
    isUpload: boolean;
}

interface MediaBrowserProps {
    open: boolean;
    onClose: () => void;
    onSelect: (path: string) => void;
    filter?: "image" | "video" | "all";
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaBrowser({ open, onClose, onSelect, filter = "all" }: MediaBrowserProps) {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [tab, setTab] = useState<"all" | "uploads" | "public">("all");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/media");
            const data = await res.json();
            if (data.files) setFiles(data.files);
        } catch {
            // ignore
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) fetchFiles();
    }, [open]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
            if (res.ok) {
                await fetchFiles();
            }
        } catch {
            // ignore
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (path: string) => {
        if (!confirm("이 파일을 삭제하시겠습니까?")) return;
        try {
            await fetch("/api/admin/media", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path }),
            });
            await fetchFiles();
        } catch {
            // ignore
        }
    };

    if (!open) return null;

    const filtered = files.filter((f) => {
        if (filter !== "all" && f.type !== filter) return false;
        if (tab === "uploads") return f.isUpload;
        if (tab === "public") return !f.isUpload;
        return true;
    });

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">미디어 선택</h2>
                    <div className="flex items-center gap-3">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/mp4,video/webm"
                            onChange={handleUpload}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                        >
                            <Upload size={16} />
                            {uploading ? "업로드 중..." : "파일 업로드"}
                        </button>
                        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 px-6 pt-3">
                    {(["all", "uploads", "public"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                tab === t ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            {t === "all" ? "전체" : t === "uploads" ? "업로드" : "기본 파일"}
                        </button>
                    ))}
                </div>

                {/* File Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="text-center py-12 text-gray-400">로딩 중...</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">파일이 없습니다.</div>
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {filtered.map((file) => (
                                <div key={file.path} className="group relative">
                                    <button
                                        onClick={() => { onSelect(file.path); onClose(); }}
                                        className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-transparent hover:border-gray-900 transition-colors flex items-center justify-center relative"
                                    >
                                        {file.type === "image" ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={file.path} alt={file.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                                <Film size={32} />
                                                <span className="text-xs">MP4</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <Check size={24} className="text-white opacity-0 group-hover:opacity-100 drop-shadow-lg" />
                                        </div>
                                    </button>
                                    <div className="mt-1.5 px-1">
                                        <p className="text-xs text-gray-600 truncate" title={file.name}>{file.name}</p>
                                        <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                                    </div>
                                    {file.isUpload && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(file.path); }}
                                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer info */}
                <div className="px-6 py-3 border-t border-gray-200 text-xs text-gray-400 flex items-center gap-2">
                    <ImageIcon size={12} />
                    {filtered.length}개 파일 | 업로드: JPG, PNG, WebP, GIF, SVG, MP4, WebM (최대 50MB)
                </div>
            </div>
        </div>
    );
}
