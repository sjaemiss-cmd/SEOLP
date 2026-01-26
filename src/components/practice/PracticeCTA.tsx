"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target } from "lucide-react";
import { landingData } from "@/data/landingData";

const PracticeCTA = () => {
    const data = landingData.practice.offer;
    const theme = landingData.practice.theme;

    return (
        <section className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
            {/* Background Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none"
                style={{ backgroundColor: theme }}
            ></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-3xl p-8 md:p-16 shadow-2xl"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-8">
                        <Target size={32} style={{ color: theme }} />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-hakgyoansim leading-tight">
                        {data?.title}
                    </h2>

                    <p className="text-gray-400 text-lg md:text-2xl mb-12 leading-relaxed break-keep">
                        {data?.priceDescription}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {data?.points.map((point, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-full text-sm font-bold bg-gray-700 text-white border border-gray-600"
                            >
                                # {point}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <a
                            href="https://pcmap.place.naver.com/place/38729351/ticket"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 px-9 py-5 rounded-full text-lg font-bold text-white shadow-lg transition-all hover:scale-105 w-full md:w-auto overflow-hidden relative"
                            style={{ backgroundColor: theme }}
                        >
                            <span className="relative z-10">{data?.ctaText}</span>
                            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />

                            {/* Shine Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PracticeCTA;
