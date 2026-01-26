"use client";

import React from "react";
import { Monitor, CheckCircle, Shield } from "lucide-react";
import { landingData } from "@/data/landingData";

const SkillProblem = () => {
    const data = landingData.skill.problem;

    const iconMap = {
        monitor: Monitor,
        check: CheckCircle,
        shield: Shield
    };

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2
                        className="text-3xl md:text-5xl font-bold mb-6 font-hakgyoansim text-gray-900"
                        dangerouslySetInnerHTML={{ __html: data.title }}
                    />
                    <p
                        className="text-xl text-gray-600 max-w-2xl mx-auto break-keep"
                        dangerouslySetInnerHTML={{ __html: data.subtitle }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {data.features.map((feature, index) => {
                        const Icon = iconMap[feature.icon as keyof typeof iconMap] || CheckCircle;

                        return (
                            <div
                                key={index}
                                className={`p-8 rounded-3xl border transition-all duration-300 ${feature.highlight
                                    ? 'bg-blue-600 text-white shadow-xl scale-105 z-10'
                                    : 'bg-white text-gray-800 border-gray-100 hover:shadow-lg'
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.highlight ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                                    }`}>
                                    <Icon size={32} />
                                </div>
                                <h3 className={`text-2xl font-bold mb-4 ${feature.highlight ? 'text-white' : 'text-gray-900'}`}>
                                    {feature.title}
                                </h3>
                                <p
                                    className={`leading-relaxed break-keep ${feature.highlight ? 'text-blue-100' : 'text-gray-600'}`}
                                    dangerouslySetInnerHTML={{ __html: feature.description }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SkillProblem;
