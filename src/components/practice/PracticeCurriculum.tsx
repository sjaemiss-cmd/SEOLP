"use client";

import React from "react";
import { motion } from "framer-motion";
import { landingData } from "@/data/landingData";

const PracticeCurriculum = () => {
    const data = landingData.practice.curriculum;
    const theme = landingData.practice.theme;

    return (
        <section className="py-20 md:py-32 bg-brand-black relative overflow-hidden">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(${theme} 1px, transparent 1px), linear-gradient(90deg, ${theme} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 font-hakgyoansim leading-tight"
                        dangerouslySetInnerHTML={{ __html: data.title }}
                    />
                </div>

                <div className="max-w-5xl mx-auto">
                    {data.steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 group"
                        >
                            {/* Timeline Line */}
                            {index < data.steps.length - 1 && (
                                <div
                                    className="absolute left-8 top-16 bottom-[-48px] w-0.5 bg-gray-800 md:left-1/2 md:-translate-x-1/2 z-0"
                                >
                                    <motion.div
                                        className="w-full bg-brand-yellow origin-top"
                                        style={{ backgroundColor: theme }}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: "100%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </div>
                            )}

                            {/* Step Number & Icon */}
                            <div className="relative z-10 flex-shrink-0">
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg border-2 transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: 'black',
                                        borderColor: theme,
                                        boxShadow: `0 0 15px ${theme}4d`
                                    }}
                                >
                                    <span style={{ color: theme }}>0{index + 1}</span>
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="flex-grow bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 shadow-xl">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <h3 className="text-2xl font-bold text-white font-hakgyoansim">
                                        {step.title}
                                    </h3>
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
                                        style={{
                                            color: theme,
                                            borderColor: `${theme}4d`,
                                            backgroundColor: `${theme}1a`
                                        }}
                                    >
                                        {step.step}
                                    </span>
                                </div>

                                <p
                                    className="text-gray-400 text-lg leading-relaxed break-keep"
                                    dangerouslySetInnerHTML={{ __html: step.description }}
                                />

                                {/* Progress Bar Decoration */}
                                <div className="mt-6 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: theme }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(index + 1) * 33}%` }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PracticeCurriculum;
