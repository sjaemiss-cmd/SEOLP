"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/data/siteConfig";
import type { PreviewMessage, PreviewSection } from "@/lib/admin/previewTypes";
import { SECTION_TO_SCROLL_ID } from "@/lib/admin/previewTypes";

// Landing page components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import USP from "@/components/USP";
import ProgramTeaser from "@/components/ProgramTeaser";
import PriceAnchor from "@/components/PriceAnchor";
import SocialProof from "@/components/SocialProof";
import LocationSection from "@/components/LocationSection";
import CookieEvent from "@/components/CookieEvent";
import FAQ from "@/components/FAQ";
import FloatingCTA from "@/components/FloatingCTA";

function getIntentFromUrl(): string {
    if (typeof window === "undefined") return "cost";
    const params = new URLSearchParams(window.location.search);
    return params.get("intent") || "cost";
}

export default function PreviewPage() {
    const intent = getIntentFromUrl();
    const intentData = siteConfig.landing[intent as keyof typeof siteConfig.landing];

    // Overrideable state for props-based components
    const [heroData, setHeroData] = useState(intentData?.hero || siteConfig.landing.cost.hero);
    const [uspData, setUspData] = useState(intentData?.problem || siteConfig.landing.cost.problem);
    const [theme, setTheme] = useState(intentData?.theme || "#FECE48");
    const [designStyle, setDesignStyle] = useState<'aggressive' | 'trust' | 'premium' | undefined>(
        (intentData as { designStyle?: 'aggressive' | 'trust' | 'premium' })?.designStyle
    );

    // Highlight state
    const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
    const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Send PREVIEW_READY on mount
    useEffect(() => {
        window.parent.postMessage({ type: "PREVIEW_READY" } satisfies PreviewMessage, window.location.origin);
    }, []);

    // Listen for messages from parent (CMS editor)
    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            if (e.origin !== window.location.origin) return;
            const msg = e.data as PreviewMessage;

            if (msg.type === "PREVIEW_UPDATE" && msg.section) {
                handleUpdate(msg);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleUpdate(msg: PreviewMessage) {
        const { section, data, theme: newTheme } = msg;
        if (!section) return;

        // Apply overrides for props-based components
        switch (section) {
            case "intent-hero":
                if (data?.hero) setHeroData(data.hero);
                if (data?.theme || newTheme) setTheme(data?.theme || newTheme!);
                if (data?.designStyle) setDesignStyle(data.designStyle);
                break;
            case "intent-problem":
                if (data?.problem) setUspData(data.problem);
                break;
            case "intent-theme":
                if (data?.theme || newTheme) setTheme(data?.theme || newTheme!);
                break;
            case "intent-curriculum":
            case "intent-offer":
                // These sections are rendered from siteConfig; highlight only
                break;
        }

        // Highlight the target section
        const scrollId = SECTION_TO_SCROLL_ID[section as PreviewSection];
        if (scrollId) {
            highlightSection(scrollId);
        }
    }

    function highlightSection(elementId: string) {
        // Clear previous highlight
        if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
        setHighlightedSection(null);

        // Apply after a tick to restart animation
        requestAnimationFrame(() => {
            setHighlightedSection(elementId);

            // Scroll to the section
            const el = document.getElementById(elementId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            // Remove highlight after 2 seconds
            highlightTimerRef.current = setTimeout(() => {
                setHighlightedSection(null);
            }, 2000);
        });
    }

    function getHighlightStyle(sectionId: string): React.CSSProperties | undefined {
        if (highlightedSection !== sectionId) return undefined;
        return {
            outline: "3px solid rgba(59, 130, 246, 0.6)",
            outlineOffset: "4px",
            borderRadius: "8px",
            animation: "previewHighlightPulse 1s ease-in-out 2",
        };
    }

    return (
        <main className="min-h-screen bg-brand-black font-sans text-white selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden relative">
            <div className="relative z-10">
                <div id="header" style={getHighlightStyle("header")}>
                    <Header />
                </div>

                <div id="hero" style={getHighlightStyle("hero")}>
                    <Hero
                        data={heroData}
                        theme={theme}
                        designStyle={designStyle}
                    />
                </div>

                <div id="usp" style={getHighlightStyle("usp")}>
                    <USP data={uspData} theme={theme} />
                </div>

                <ProgramTeaser slug="dobong" />

                <div id="price" style={getHighlightStyle("price")}>
                    <PriceAnchor theme={theme} />
                </div>

                <SocialProof theme={theme} />
                <LocationSection theme={theme} />

                <div id="event" style={getHighlightStyle("event")}>
                    <CookieEvent theme={theme} />
                </div>

                <div id="faq" style={getHighlightStyle("faq")}>
                    <FAQ theme={theme} />
                </div>

                <div id="footer" style={getHighlightStyle("footer")}>
                    <Footer theme={theme} />
                </div>

                <FloatingCTA theme={theme} />
            </div>
        </main>
    );
}
