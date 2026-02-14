"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const SpeedCTA = () => {
    const { landingData } = useSiteConfig();
    const offer = landingData.speed.offer;

    return (
        <section id="speed-cta" className="py-24 bg-red-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-hakgyoansim leading-tight" dangerouslySetInnerHTML={{ __html: offer.title.replace(/\n/g, '<br/>') }} />

                    <p className="text-white/80 text-xl mb-12 font-medium" dangerouslySetInnerHTML={{ __html: offer.priceDescription }} />

                    {/* Value Stack */}
                    <div className="bg-black backdrop-blur-sm rounded-3xl p-8 mb-12 text-left max-w-2xl mx-auto border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">
                            <span className="text-white">{offer.title.split('\n')[0]}</span>
                        </h3>
                        <ul className="space-y-4">
                            {offer.points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="bg-red-600 rounded-full p-1 mt-1 shrink-0">
                                        <Check size={12} className="text-white" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <span className="text-white font-bold">{point}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <div className="bg-gradient-to-b from-white/10 to-transparent rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden group">
                                <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 flex flex-col items-center justify-center">
                                    <p className="text-lg text-white/90 mb-1">이 모~든 혜택을</p>
                                    <p className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                        일반 학원<br></br> <span className="text-yellow-400 inline-block transform group-hover:scale-105 transition-transform duration-300">절반 가격</span>으로
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a
                        href={offer.ctaLink || "https://pcmap.place.naver.com/place/38729351/ticket"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 hover:bg-gray-900 transition-all duration-300 shadow-2xl"
                    >
                        <span>{offer.ctaText}</span>
                        <ArrowRight />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default SpeedCTA;
