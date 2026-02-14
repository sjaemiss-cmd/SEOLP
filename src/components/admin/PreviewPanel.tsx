"use client";

import React, { useEffect, useState } from "react";
import { usePreview } from "@/contexts/PreviewContext";
import type { PreviewMessage } from "@/lib/admin/previewTypes";
import { X, Monitor, Smartphone, Maximize2, Minimize2 } from "lucide-react";

type Viewport = "desktop" | "mobile";

export default function PreviewPanel() {
    const {
        isPreviewOpen,
        setIsPreviewOpen,
        iframeRef,
        previewReady,
        setPreviewReady,
        previewIntent,
    } = usePreview();

    const [viewport, setViewport] = useState<Viewport>("desktop");
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Listen for PREVIEW_READY from iframe
    useEffect(() => {
        if (!isPreviewOpen) return;

        const handleMessage = (e: MessageEvent) => {
            if (e.origin !== window.location.origin) return;
            const msg = e.data as PreviewMessage;
            if (msg.type === "PREVIEW_READY") {
                setPreviewReady(true);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [isPreviewOpen, setPreviewReady]);

    // Reset ready state when panel closes
    useEffect(() => {
        if (!isPreviewOpen) setPreviewReady(false);
    }, [isPreviewOpen, setPreviewReady]);

    if (!isPreviewOpen) return null;

    const previewUrl = `/admin/preview?intent=${previewIntent}`;

    const panelClasses = isFullscreen
        ? "fixed inset-0 z-50 bg-white flex flex-col"
        : "w-[45%] min-w-[400px] border-l border-gray-200 bg-gray-50 flex flex-col shrink-0 max-lg:fixed max-lg:inset-0 max-lg:z-50 max-lg:w-full max-lg:min-w-0";

    const iframeWrapperClasses = viewport === "mobile" && !isFullscreen
        ? "mx-auto w-[390px] h-full border-x border-gray-300 bg-white"
        : "w-full h-full";

    return (
        <div className={panelClasses}>
            {/* Toolbar */}
            <div className="h-10 bg-white border-b border-gray-200 flex items-center justify-between px-3 shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-700">미리보기</span>
                    <span
                        className={`w-2 h-2 rounded-full ${previewReady ? "bg-green-500" : "bg-yellow-400 animate-pulse"}`}
                        title={previewReady ? "연결됨" : "로딩중..."}
                    />
                </div>

                <div className="flex items-center gap-1">
                    {/* Viewport toggles */}
                    <button
                        onClick={() => setViewport("desktop")}
                        className={`p-1.5 rounded ${viewport === "desktop" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                        title="데스크탑"
                    >
                        <Monitor size={14} />
                    </button>
                    <button
                        onClick={() => setViewport("mobile")}
                        className={`p-1.5 rounded ${viewport === "mobile" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                        title="모바일"
                    >
                        <Smartphone size={14} />
                    </button>

                    <div className="w-px h-4 bg-gray-200 mx-1" />

                    {/* Fullscreen toggle */}
                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-1.5 rounded text-gray-400 hover:text-gray-600"
                        title={isFullscreen ? "축소" : "전체화면"}
                    >
                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>

                    {/* Close */}
                    <button
                        onClick={() => { setIsPreviewOpen(false); setIsFullscreen(false); }}
                        className="p-1.5 rounded text-gray-400 hover:text-red-500"
                        title="닫기"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* iframe container */}
            <div className="flex-1 overflow-hidden bg-gray-100 flex items-start justify-center">
                <div className={iframeWrapperClasses}>
                    <iframe
                        ref={iframeRef}
                        src={previewUrl}
                        className="w-full h-full border-0"
                        title="미리보기"
                    />
                </div>
            </div>
        </div>
    );
}
