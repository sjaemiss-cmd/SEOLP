"use client";

import React from "react";
import { motion } from "framer-motion";
import { landingData } from "@/data/landingData";

const PhobiaCurriculum = () => {
    const data = landingData.phobia.curriculum;
    const theme = landingData.phobia.theme;

    return (
        <section className="py-20 md:py-32 bg-brand-black relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 font-hakgyoansim leading-tight"
                    >
                        {data.title}
                    </motion.h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {data.steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative flex flex-col md:flex-row items-center gap-8 bg-gray-900/50 rounded-3xl p-8 border border-gray-800 hover:border-opacity-50 transition-all duration-300"
                            style={{
                                borderColor: 'rgba(31, 41, 55, 1)',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = theme || '#4ADE80'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 1)'}
                        >
                            {/* Step Number */}
                            <div
                                className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold text-brand-black shadow-lg"
                                style={{ backgroundColor: theme }}
                            >
                                {step.step}
                            </div>

                            {/* Content */}
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-2xl font-bold text-white mb-3 font-hakgyoansim">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed break-keep">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector Line (Desktop only, except last item) */}
                            {index < data.steps.length - 1 && (
                                <div
                                    className="hidden md:block absolute left-12 top-full w-0.5 h-8 -mb-8 z-0"
                                    style={{ backgroundColor: `${theme}4d` }}
                                ></div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PhobiaCurriculum;
