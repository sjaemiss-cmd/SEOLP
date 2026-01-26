"use client";

import React from "react";
import { motion } from "framer-motion";
import { Repeat, Monitor, Award, CheckCircle2 } from "lucide-react";
import { landingData } from "@/data/landingData";

const PracticeProblem = () => {
    const data = landingData.practice.problem;
    const theme = landingData.practice.theme;

    const icons = {
        Repeat: Repeat,
        monitor: Monitor,
        award: Award
    };

    return (
        <section className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-5xl font-bold text-white mb-6 font-hakgyoansim leading-tight"
                        dangerouslySetInnerHTML={{ __html: data.title }}
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl"
                        dangerouslySetInnerHTML={{ __html: data.subtitle }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.features.map((feature, index) => {
                        const IconComponent = icons[feature.icon as keyof typeof icons];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative bg-gray-800 rounded-xl p-1 overflow-hidden group"
                            >
                                {/* Border Gradient Animation */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(45deg, transparent, ${theme}, transparent)`,
                                        backgroundSize: '200% 200%',
                                        animation: 'gradientMove 3s ease infinite'
                                    }}
                                ></div>

                                <div className="relative h-full bg-gray-900 rounded-lg p-8 flex flex-col items-center text-center border border-gray-700 group-hover:border-transparent transition-colors">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            backgroundColor: `${theme}1a`,
                                            boxShadow: `0 0 20px ${theme}33`
                                        }}
                                    >
                                        {IconComponent && (
                                            <IconComponent
                                                size={32}
                                                style={{ color: theme }}
                                            />
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 font-hakgyoansim">
                                        {feature.title}
                                    </h3>

                                    <p
                                        className="text-gray-400 leading-relaxed break-keep mb-6"
                                        dangerouslySetInnerHTML={{ __html: feature.description }}
                                    />

                                    {/* Checklist for "Pinpoint" feel */}
                                    <ul className="w-full text-left space-y-2 mt-auto pt-6 border-t border-gray-800">
                                        <li className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle2 size={14} style={{ color: theme }} />
                                            <span>집중 반복 훈련</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle2 size={14} style={{ color: theme }} />
                                            <span>데이터 기반 피드백</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PracticeProblem;
