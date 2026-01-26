"use client";

import React from "react";
import { motion } from "framer-motion";
import { CurriculumStep } from "@/data/landingData";

interface CurriculumProps {
    title: string;
    steps: CurriculumStep[];
    theme: string;
}

const Curriculum: React.FC<CurriculumProps> = ({ title, steps, theme }) => {
    if (!steps || steps.length === 0) return null;

    return (
        <section id="curriculum" className="py-20 md:py-32 bg-brand-black relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <h2
                        className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep leading-tight font-hakgyoansim"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 h-full hover:border-gray-600 transition-colors duration-300">
                                <div
                                    className="text-sm font-bold mb-4 inline-block px-3 py-1 rounded-full bg-gray-800 text-gray-300"
                                    style={{ color: theme }}
                                >
                                    {step.step}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 font-hakgyoansim">
                                    {step.title}
                                </h3>
                                <p
                                    className="text-gray-400 leading-relaxed break-keep"
                                    dangerouslySetInnerHTML={{ __html: step.description }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Curriculum;
