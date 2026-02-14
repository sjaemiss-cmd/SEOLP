"use client";

import React, { createContext, useContext } from "react";
import type { SiteConfig, LandingContent } from "@/data/siteConfig";

interface SiteConfigContextValue {
    siteConfig: SiteConfig;
    landingData: Record<string, LandingContent>;
}

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null);

export function SiteConfigProvider({
    config,
    children,
}: {
    config: SiteConfig;
    children: React.ReactNode;
}) {
    const value: SiteConfigContextValue = {
        siteConfig: config,
        landingData: config.landing,
    };

    return (
        <SiteConfigContext.Provider value={value}>
            {children}
        </SiteConfigContext.Provider>
    );
}

export function useSiteConfig(): SiteConfigContextValue {
    const ctx = useContext(SiteConfigContext);
    if (!ctx) {
        throw new Error("useSiteConfig must be used within SiteConfigProvider");
    }
    return ctx;
}
