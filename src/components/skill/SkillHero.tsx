"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Binary, ChevronRight } from "lucide-react";
import { landingData } from "@/data/landingData";

interface SkillHeroProps {
    locationName?: string;
    keyword?: string;
}

const SkillHero = ({ locationName, keyword }: SkillHeroProps) => {
    const titleContent = locationName
        ? `<span class="block text-2xl md:text-4xl font-bold text-white/70 mb-4">${locationName} ${keyword || "운전면허"},</span>공식과 반복이 <span class="text-blue-400">합격의 지름길</span>입니다.`
        : landingData.skill.hero.title;

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[3px] scale-105"
                style={{ backgroundImage: "url('/skill_hero_bg.jpg')" }}
            />
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

            <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/90 text-white rounded-lg font-bold mb-8 font-mono text-sm shadow-lg">
                            <Binary size={16} />
                            <span>{landingData.skill.hero.badge}</span>
                        </div>

                        <h1
                            className="text-4xl md:text-7xl font-bold leading-tight mb-8 font-hakgyoansim tracking-tight break-keep text-white"
                            dangerouslySetInnerHTML={{ __html: titleContent }}
                        />

                        <p
                            className="text-white/80 text-xl md:text-2xl mb-10 leading-relaxed font-medium break-keep"
                            dangerouslySetInnerHTML={{ __html: landingData.skill.hero.subtitle }}
                        />

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="#skill-cta"
                                className="group px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {landingData.skill.hero.ctaText} <ArrowRight size={20} />
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                커리큘럼 보기 <ChevronRight size={20} />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SkillHero;
