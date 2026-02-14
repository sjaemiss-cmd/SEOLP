"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Check, AlertTriangle } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const SpeedProblem = () => {
    const { landingData } = useSiteConfig();
    const problem = landingData.speed.problem;
    const sol = landingData.speed.solution;

    const competitorTitle = sol?.competitorTitle || "타 학원 광고";
    const solutionTitle = sol?.title || "고수의 2주 플랜";
    const solutionItems = sol?.items || [
        { title: "무제한 연습", description: "감이 잡힐 때까지 10시간이고 20시간이고" },
        { title: "시뮬레이션 무한 리셋", description: "사고 걱정 없이 과감하게 밟으세요" },
        { title: "진짜 2주일 완성", description: "재시험 없이 한 번에 붙는 게 가장 빠릅니다" },
    ];

    return (
        <section className="py-20 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 font-hakgyoansim uppercase italic tracking-tight" dangerouslySetInnerHTML={{ __html: problem.title }} />
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: problem.subtitle }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* The Lie */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 md:p-12 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800"></div>
                        <div className="flex items-start justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-400">{competitorTitle}</h3>
                            <X className="text-gray-600 w-8 h-8" />
                        </div>

                        <ul className="space-y-6">
                            {problem.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-4 opacity-50">
                                    <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong className="block text-lg text-gray-300">{feature.title}</strong>
                                        <span className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: feature.description.replace(/\n/g, '<br/>') }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* The Truth */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-red-950/20 border border-red-900/50 rounded-3xl p-8 md:p-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
                        <div className="flex items-start justify-between mb-8">
                            <h3 className="text-2xl font-bold text-white">{solutionTitle}</h3>
                            <Check className="text-red-500 w-8 h-8" />
                        </div>

                        <ul className="space-y-6">
                            {solutionItems.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="bg-red-600/20 p-1 rounded-full text-red-500 mt-1">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <strong className="block text-lg text-white">{item.title}</strong>
                                        <span className="text-sm text-red-200/60">{item.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpeedProblem;
