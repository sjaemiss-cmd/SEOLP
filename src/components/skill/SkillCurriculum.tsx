"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const SkillCurriculum = () => {
    const { landingData } = useSiteConfig();
    const curriculum = landingData.skill.curriculum;
    const steps = curriculum.steps.map((s) => ({
        step: s.step.replace(/[^0-9]/g, '').padStart(2, '0'),
        title: s.title,
        desc: s.description,
    }));

    return (
        <section id="curriculum" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">Curriculum</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-hakgyoansim text-gray-900" dangerouslySetInnerHTML={{ __html: curriculum.title.replace(/\n/g, '<br/>') }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {steps.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
                        >
                            <div className="text-5xl font-black text-gray-100 mb-6 group-hover:text-blue-50 transition-colors font-mono">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm break-keep">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillCurriculum;
