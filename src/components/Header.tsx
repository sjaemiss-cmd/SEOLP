"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";

/**
 * 헤더 컴포넌트 - 네비게이션 및 모바일 메뉴 포함
 * 클라이언트 컴포넌트 (useState 사용)
 */
import { usePathname } from "next/navigation";

// ... (imports)

import { siteConfig } from "@/data/siteConfig";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const getIntentLabel = (path: string) => {
        if (path.includes('/speed')) return "D-day 계산기";
        if (path.includes('/skill')) return "운전 DNA 테스트";
        if (path.includes('/phobia')) return "운전 처방전";
        if (path.includes('/practice')) return "커리큘럼 생성";
        return "비용 계산기"; // Default (Cost)
    };

    const calculatorLabel = getIntentLabel(pathname);

    return (
        <LazyMotion features={domAnimation}>
            <header
                className="fixed top-0 left-0 right-0 z-50 py-5 bg-brand-black/80 backdrop-blur-sm"
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* ... Logo ... */}
                    <div className="flex items-center">
                        <Image
                            src="/logo-white.webp"
                            alt={siteConfig.common.companyName}
                            width={160}
                            height={48}
                            className="h-10 md:h-12 w-auto object-contain"
                            priority
                        />
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex gap-6 text-sm font-medium text-gray-300">
                            <a href="#calculator" className="hover:text-white transition-colors">{calculatorLabel}</a>
                            <a href="#usp" className="hover:text-white transition-colors">{siteConfig.header.nav.usp}</a>
                            {/* ... other links ... */}
                            <a href="#reviews" className="hover:text-white transition-colors">{siteConfig.header.nav.reviews}</a>
                            <a href="#location" className="hover:text-white transition-colors">{siteConfig.header.nav.location}</a>
                            <a href="#event" className="hover:text-white transition-colors">{siteConfig.header.nav.event}</a>
                            <a href="#faq" className="hover:text-white transition-colors">{siteConfig.header.nav.faq}</a>
                        </nav>
                        <a
                            href={`tel:${siteConfig.common.phoneNumber}`}
                            className="flex items-center gap-2 bg-brand-yellow text-brand-black px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition-colors"
                        >
                            <Phone size={18} />
                            <span>{siteConfig.header.buttons.call}</span>
                        </a>
                    </div>

                    {/* Mobile: Phone Button + Hamburger Menu */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Phone Button */}
                        <a
                            href={`tel:${siteConfig.common.phoneNumber}`}
                            className="flex items-center justify-center gap-1.5 bg-brand-yellow text-brand-black px-3 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition-colors"
                        >
                            <Phone size={16} />
                            <span>전화</span>
                        </a>

                        {/* Hamburger Button */}
                        <button
                            className="p-2 text-white touch-manipulation"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="메뉴"
                            type="button"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav Dropdown - Outside header for proper z-index */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-[80px] left-0 right-0 z-40 md:hidden bg-brand-black border-t border-b border-gray-800 shadow-2xl"
                    >
                        <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                            <a
                                href="#calculator"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsMobileMenuOpen(false);
                                    setTimeout(() => {
                                        document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-700 transition-colors px-4 py-4 rounded-lg text-base font-medium touch-manipulation"
                            >
                                {calculatorLabel}
                            </a>
                            <a
                                href="#usp"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsMobileMenuOpen(false);
                                    setTimeout(() => {
                                        document.getElementById('usp')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-700 transition-colors px-4 py-4 rounded-lg text-base font-medium touch-manipulation"
                            >
                                {siteConfig.header.nav.usp}
                            </a>
                            <a
                                href="#reviews"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsMobileMenuOpen(false);
                                    setTimeout(() => {
                                        document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-700 transition-colors px-4 py-4 rounded-lg text-base font-medium touch-manipulation"
                            >
                                {siteConfig.header.nav.reviews}
                            </a>
                            <a
                                href="#location"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsMobileMenuOpen(false);
                                    setTimeout(() => {
                                        document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-700 transition-colors px-4 py-4 rounded-lg text-base font-medium touch-manipulation"
                            >
                                {siteConfig.header.nav.location}
                            </a>
                            <a
                                href="#event"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsMobileMenuOpen(false);
                                    setTimeout(() => {
                                        document.getElementById('event')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-700 transition-colors px-4 py-4 rounded-lg text-base font-medium touch-manipulation"
                            >
                                {siteConfig.header.nav.event}
                            </a>
                            <a
                                href="#faq"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsMobileMenuOpen(false);
                                    setTimeout(() => {
                                        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-700 transition-colors px-4 py-4 rounded-lg text-base font-medium touch-manipulation"
                            >
                                {siteConfig.header.nav.faq}
                            </a>
                        </nav>
                    </m.div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
};

export default Header;
