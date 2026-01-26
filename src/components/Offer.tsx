"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { OfferContent } from "@/data/landingData";

interface OfferProps {
    offer: OfferContent;
    theme: string;
}

const Offer: React.FC<OfferProps> = ({ offer, theme }) => {
    if (!offer || !offer.title) return null;

    return (
        <LazyMotion features={domAnimation}>
            <section id="offer" className="py-20 md:py-32 bg-brand-black relative overflow-hidden">
                {/* Background Glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: theme }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-[2.5rem] p-8 md:p-16 text-center shadow-2xl overflow-hidden relative"
                    >
                        {/* Top Accent Line */}
                        <div
                            className="absolute top-0 left-0 right-0 h-2"
                            style={{ backgroundColor: theme }}
                        />

                        <h2
                            className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep font-hakgyoansim"
                            dangerouslySetInnerHTML={{ __html: offer.title }}
                        />

                        <p
                            className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed break-keep"
                            dangerouslySetInnerHTML={{ __html: offer.priceDescription }}
                        />

                        <div className="flex flex-col gap-4 mb-12 max-w-lg mx-auto">
                            {offer.points.map((point, index) => (
                                <div key={index} className="flex items-center gap-3 text-left bg-gray-800/50 p-4 rounded-xl">
                                    <div
                                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: `${theme}20` }} // 20% opacity
                                    >
                                        <Check size={14} style={{ color: theme }} strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-200 font-medium">{point}</span>
                                </div>
                            ))}
                        </div>

                        <m.a
                            href={offer.ctaLink || "https://pf.kakao.com/_xmxnmnG/chat"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full md:w-auto"
                            style={{
                                backgroundColor: theme,
                                color: theme === '#FECE48' ? '#000' : '#FFF', // Black text for yellow theme, white for others
                                boxShadow: `0 10px 30px -10px ${theme}66` // Colored shadow
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>{offer.ctaText}</span>
                            <ArrowRight size={20} />
                        </m.a>
                    </m.div>
                </div>
            </section>
        </LazyMotion>
    );
};

export default Offer;
