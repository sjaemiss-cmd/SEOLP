"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { landingData } from "@/data/landingData";

const PhobiaCTA = () => {
    const data = landingData.phobia.cta;
    const theme = landingData.phobia.theme;

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
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-hakgyoansim leading-tight">
                        {data?.title}
                    </h2>

                    <p className="text-gray-400 text-lg md:text-2xl mb-12 leading-relaxed break-keep">
                        {data?.subtitle}
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <a
                            href="https://m.place.naver.com/place/38729351/ticket"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-bold text-brand-black shadow-lg transition-all hover:scale-105 w-full md:w-auto"
                            style={{ backgroundColor: theme }}
                        >
                            <span>{data?.button}</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PhobiaCTA;
