"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import type { PreviewMessage } from "@/lib/admin/previewTypes";

interface PreviewContextValue {
    isPreviewOpen: boolean;
    setIsPreviewOpen: (open: boolean) => void;
    iframeRef: React.RefObject<HTMLIFrameElement | null>;
    previewReady: boolean;
    setPreviewReady: (ready: boolean) => void;
    previewIntent: string;
    setPreviewIntent: (intent: string) => void;
    sendToPreview: (msg: PreviewMessage) => void;
}

const PreviewContext = createContext<PreviewContextValue | null>(null);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewReady, setPreviewReady] = useState(false);
    const [previewIntent, setPreviewIntent] = useState("cost");
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const sendToPreview = useCallback(
        (msg: PreviewMessage) => {
            if (!iframeRef.current?.contentWindow) return;
            iframeRef.current.contentWindow.postMessage(msg, window.location.origin);
        },
        [],
    );

    return (
        <PreviewContext.Provider
            value={{
                isPreviewOpen,
                setIsPreviewOpen,
                iframeRef,
                previewReady,
                setPreviewReady,
                previewIntent,
                setPreviewIntent,
                sendToPreview,
            }}
        >
            {children}
        </PreviewContext.Provider>
    );
}

export function usePreview() {
    const ctx = useContext(PreviewContext);
    if (!ctx) throw new Error("usePreview must be used within PreviewProvider");
    return ctx;
}

/** Safe version that returns null outside the provider — used by usePreviewSync */
export function usePreviewSafe() {
    return useContext(PreviewContext);
}
