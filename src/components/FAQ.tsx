"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

import { useSiteConfig } from "@/contexts/SiteConfigContext";

const FAQ = ({ theme = "#FECE48" }: { theme?: string }) => {
    const { siteConfig } = useSiteConfig();
    const faqs = siteConfig.faq.items;

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <LazyMotion features={domAnimation}>
        <section id="faq" className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-20 bg-brand-black">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-8 md:mb-12 relative inline-block w-full">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-20 h-20 md:w-32 md:h-32 animate-bounce duration-[2000ms] z-0 opacity-80">
                        <Image
                            src={siteConfig.media?.speakerIcon || "/images/speaker.webp"}
                            alt="Speaker"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 relative z-10 font-hakgyoansim">{siteConfig.faq.title}</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border rounded-xl overflow-hidden transition-colors duration-300"
                            style={{ borderColor: openIndex === index ? theme : 'rgba(31, 41, 55, 1)' }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center p-6 bg-gray-900 hover:bg-gray-800 transition-colors text-left"
                            >
                                <span className="font-bold text-lg text-white break-keep pr-4">{faq.q}</span>
                                {openIndex === index ?
                                    <ChevronUp className="flex-shrink-0" style={{ color: theme }} /> :
                                    <ChevronDown className="text-gray-400 flex-shrink-0" />
                                }
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <m.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="bg-gray-900 px-6 pb-6 text-gray-400 leading-relaxed"
                                    >
                                        <div className="pt-2 border-t border-gray-800 mt-2 break-keep">
                                            {faq.a}
                                        </div>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </LazyMotion>
    );
};

export default FAQ;
