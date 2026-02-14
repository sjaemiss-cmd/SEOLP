// Preview message protocol types for iframe communication

export type PreviewMessageType =
    | "PREVIEW_UPDATE"
    | "PREVIEW_SCROLL_TO"
    | "PREVIEW_HIGHLIGHT"
    | "PREVIEW_READY";

export type PreviewSection =
    | "common"
    | "header"
    | "footer"
    | "faq"
    | "event"
    | "media"
    | "intent-hero"
    | "intent-problem"
    | "intent-curriculum"
    | "intent-offer"
    | "intent-theme";

export interface PreviewMessage {
    type: PreviewMessageType;
    section?: PreviewSection;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    intent?: string;
    theme?: string;
}

/** Maps admin section to scroll target element ID in the preview page */
export const SECTION_TO_SCROLL_ID: Record<PreviewSection, string> = {
    common: "header",
    header: "header",
    footer: "footer",
    faq: "faq",
    event: "event",
    media: "hero",
    "intent-hero": "hero",
    "intent-problem": "usp",
    "intent-curriculum": "usp",
    "intent-offer": "price",
    "intent-theme": "hero",
};

/** Origin validation for postMessage security */
export const PREVIEW_ORIGIN = typeof window !== "undefined" ? window.location.origin : "";
