"use client";

import React from "react";
import { ArrowRight, FileText } from "lucide-react";
import { landingData } from "@/data/landingData";

const SkillCTA = () => {
    const data = landingData.skill.offer;

    return (
        <section id="skill-cta" className="py-24 bg-blue-900 relative overflow-hidden text-white">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 md:p-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-8 shadow-lg">
                        <FileText size={32} className="text-white" />
                    </div>

                    <h2
                        className="text-3xl md:text-5xl font-bold mb-6 font-hakgyoansim"
                        dangerouslySetInnerHTML={{ __html: data.title }}
                    />

                    <p
                        className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed break-keep"
                        dangerouslySetInnerHTML={{ __html: data.priceDescription }}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://pf.kakao.com/_xmxnmnG/chat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg min-w-[200px]"
                        >
                            <span>{data.ctaText}</span>
                            <ArrowRight size={20} />
                        </a>
                    </div>

                    <div className="mt-8 text-sm text-blue-300 space-y-1">
                        {data.points.map((point, index) => (
                            <p key={index}>* {point}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillCTA;
