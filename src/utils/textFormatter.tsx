/**
 * Text Formatter Utilities
 * 
 * These utilities handle text formatting that was previously done via
 * inline HTML in data files. This separates presentation from data.
 */

import React from "react";

/**
 * Configuration for highlighting specific keywords in text.
 */
export interface HighlightConfig {
    keyword: string;
    className: string;
}

/**
 * Converts a plain text string with newlines (\n) into an array of React elements
 * with proper line breaks.
 * 
 * @param text - Plain text with \n for line breaks
 * @returns Array of React nodes with <br /> elements
 */
export function formatLineBreaks(text: string): React.ReactNode[] {
    if (!text) return [];

    const lines = text.split("\n");
    return lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
        </React.Fragment>
    ));
}

/**
 * Formats text with highlighted keywords.
 * 
 * @param text - Plain text to format
 * @param highlights - Array of keyword/className pairs to highlight
 * @returns React node with highlighted spans
 */
export function formatWithHighlights(
    text: string,
    highlights: HighlightConfig[]
): React.ReactNode {
    if (!text || highlights.length === 0) {
        return formatLineBreaks(text);
    }

    // Process text with highlights
    let parts: Array<string | React.ReactElement> = [text];

    highlights.forEach(({ keyword, className }) => {
        const newParts: Array<string | React.ReactElement> = [];

        parts.forEach((part, partIndex) => {
            if (typeof part !== "string") {
                newParts.push(part);
                return;
            }

            const segments = part.split(keyword);
            segments.forEach((segment, segmentIndex) => {
                if (segment) {
                    newParts.push(segment);
                }
                if (segmentIndex < segments.length - 1) {
                    newParts.push(
                        <span key={`${partIndex}-${segmentIndex}`} className={className}>
                            {keyword}
                        </span>
                    );
                }
            });
        });

        parts = newParts;
    });

    // Handle line breaks in the final result
    return (
        <>
            {parts.map((part, index) => {
                if (typeof part === "string") {
                    return <React.Fragment key={index}>{formatLineBreaks(part)}</React.Fragment>;
                }
                return part;
            })}
        </>
    );
}

/**
 * Common highlight configurations used across the app.
 */
export const COMMON_HIGHLIGHTS = {
    brandYellow: { className: "text-brand-yellow font-bold" },
    statusRed: { className: "text-status-red font-bold" },
    blue600: { className: "text-blue-600 font-bold" },
    blueHighlight: { className: "text-black bg-blue-100 px-1 font-bold" },
} as const;

/**
 * Strips all HTML tags from a string.
 * Useful for converting legacy HTML data to plain text.
 * 
 * @param html - String potentially containing HTML
 * @returns Plain text without HTML tags
 */
export function stripHtml(html: string): string {
    if (!html) return "";
    // Replace <br/> and <br /> with newlines first
    let text = html.replace(/<br\s*\/?>/gi, "\n");
    // Remove all other HTML tags
    text = text.replace(/<[^>]*>/g, "");
    // Decode common HTML entities
    text = text.replace(/&amp;/g, "&");
    text = text.replace(/&lt;/g, "<");
    text = text.replace(/&gt;/g, ">");
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");
    return text;
}
