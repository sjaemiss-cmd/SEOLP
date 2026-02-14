"use client";

import { useEffect, useRef } from "react";
import { usePreviewSafe } from "@/contexts/PreviewContext";
import type { PreviewSection } from "@/lib/admin/previewTypes";

interface UsePreviewSyncOptions {
    section: PreviewSection;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    intent?: string;
    theme?: string;
}

/**
 * Debounced sync hook — sends preview updates via postMessage.
 * Safe to call outside PreviewProvider (silently no-ops).
 *
 * Usage: usePreviewSync({ section: 'faq', data })
 */
export function usePreviewSync({ section, data, intent, theme }: UsePreviewSyncOptions) {
    const ctx = usePreviewSafe();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // No-op if outside PreviewProvider or preview not open/ready
        if (!ctx || !ctx.isPreviewOpen || !ctx.previewReady || !data) return;

        // Clear previous debounce timer
        if (timerRef.current) clearTimeout(timerRef.current);

        // 300ms debounce
        timerRef.current = setTimeout(() => {
            ctx.sendToPreview({
                type: "PREVIEW_UPDATE",
                section,
                data,
                intent,
                theme,
            });
        }, 300);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [data, section, intent, theme, ctx]);
}
