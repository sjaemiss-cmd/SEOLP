"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const SpeedCurriculum = () => {
    const { landingData } = useSiteConfig();
    const curriculum = landingData.speed.curriculum;
    const steps = curriculum.steps.map((s) => ({
        day: s.step,
        title: s.title,
        desc: s.description,
    }));

    return (
        <section className="py-20 bg-black text-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold font-hakgyoansim mb-4" dangerouslySetInnerHTML={{ __html: curriculum.title.replace(/\n/g, '<br/>') }} />
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 md:-translate-x-1/2"></div>

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[9px] md:left-1/2 top-0 md:top-1/2 w-3 h-3 bg-red-600 rounded-full md:-translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_10px_#dc2626] z-10"></div>

                                {/* Content Box */}
                                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                                    <div className={`bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-red-900/50 transition-colors duration-300 ${index % 2 === 0 ? 'text-left' : 'text-left md:text-right'}`}>
                                        <span className="inline-block text-red-500 font-bold text-sm mb-2 tracking-wider">{step.day}</span>
                                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed break-keep">{step.desc}</p>
                                    </div>
                                </div>

                                {/* Empty Space for the other side */}
                                <div className="hidden md:block w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpeedCurriculum;

