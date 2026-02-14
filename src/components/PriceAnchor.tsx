"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const PriceAnchor = ({ theme = "#FECE48" }: { theme?: string }) => {
    const { siteConfig } = useSiteConfig();
    const pa = siteConfig.priceAnchor;
    if (!pa) return null;

    return (
        <LazyMotion features={domAnimation}>
            <section id="price" className="py-16 md:py-24 bg-brand-black">
                <div className="container mx-auto px-4 max-w-4xl">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 break-keep font-hakgyoansim" dangerouslySetInnerHTML={{ __html: pa.title }} />
                        <p className="text-gray-400 text-lg break-keep">{pa.subtitle}</p>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* 경쟁사 평균 */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center relative">
                            <span className="text-gray-500 text-sm font-medium mb-4 block">{pa.competitor.label}</span>
                            <div className="relative inline-block">
                                <span className="text-4xl md:text-5xl font-bold text-gray-500">{pa.competitor.price}</span>
                                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 -rotate-6" />
                            </div>
                            <ul className="mt-6 space-y-2 text-sm text-gray-500 text-left max-w-[200px] mx-auto">
                                {pa.competitor.cons.map((con, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center text-xs">-</span>
                                        {con}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 우리 */}
                        <div
                            className="border-2 rounded-2xl p-8 text-center relative overflow-hidden"
                            style={{ borderColor: theme, backgroundColor: `${theme}0d` }}
                        >
                            <span
                                className="absolute top-0 right-0 text-black text-xs font-bold px-3 py-1 rounded-bl-xl"
                                style={{ backgroundColor: theme }}
                            >
                                {pa.ours.badge}
                            </span>
                            <span className="text-sm font-medium mb-4 block" style={{ color: theme }}>{pa.ours.label}</span>
                            <span className="text-4xl md:text-5xl font-bold text-white">{pa.ours.price}</span>
                            <span className="block text-gray-400 text-sm mt-1">{pa.ours.priceNote}</span>
                            <ul className="mt-6 space-y-2 text-sm text-left max-w-[220px] mx-auto">
                                {pa.ours.pros.map((pro, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-white">
                                        <Check size={16} style={{ color: theme }} className="shrink-0" />{pro}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={pa.ours.ctaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 w-full inline-flex items-center justify-center gap-2 text-black font-bold py-3 px-6 rounded-xl transition-all hover:brightness-110"
                                style={{ backgroundColor: theme }}
                            >
                                {pa.ours.ctaText} <ArrowRight size={18} />
                            </a>
                        </div>
                    </m.div>
                </div>
            </section>
        </LazyMotion>
    );
};

export default PriceAnchor;
