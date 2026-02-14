"use client";

import React from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { MapPin, Check, Clock, ArrowRight } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const ICON_MAP: Record<string, typeof MapPin> = {
    MapPin,
    Check,
    Clock,
};

const LocationSection = ({ theme = "#FECE48" }: { theme?: string }) => {
    const { siteConfig } = useSiteConfig();
    const loc = siteConfig.location;
    const stationName = loc?.stationName || "노원역 3번 출구";
    const walkTime = loc?.walkTime || "단 2분";
    const subtitle = loc?.subtitle || "더 이상 멀리 다니지 마세요. 역세권 최고의 접근성!";
    const mapLink = loc?.mapLink || "https://map.naver.com/p/entry/place/38729351";
    const mapButtonText = loc?.mapButtonText || "네이버 지도로 보기";
    const features = loc?.features || [];

    return (
        <LazyMotion features={domAnimation}>
        <section id="location" className="pt-24 pb-12 md:pt-32 md:pb-20 bg-brand-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 break-keep font-hakgyoansim">
                        <span style={{ color: theme }}>{stationName}</span>에서<br className="md:hidden" /> 걸어서 <span style={{ color: theme }}>{walkTime}</span>
                    </h2>
                    <p className="text-gray-400 break-keep">{subtitle}</p>
                </div>

                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Naver Map Image */}
                    <m.div
                        className="w-full md:w-1/2 flex flex-col gap-4"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <a
                            href={mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl group"
                        >
                            <Image
                                src={siteConfig.media?.mapImage || "/images/naver_map.webp"}
                                alt="고수의 운전면허 도봉점 네이버 지도"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 bg-brand-black/80 text-white px-4 py-2 rounded-full text-sm font-bold transition-opacity duration-300">지도 크게 보기</span>
                            </div>
                        </a>

                        <a
                            href={mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-[#03C75A] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#02b351] transition-colors duration-300 shadow-lg"
                        >
                            {mapButtonText} <ArrowRight size={20} />
                        </a>
                    </m.div>

                    {/* Text Content */}
                    <m.div
                        className="w-full md:w-1/2 text-left"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="space-y-8">
                            {features.map((feature, idx) => {
                                const Icon = ICON_MAP[feature.icon] || MapPin;
                                return (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="p-3 rounded-full" style={{ backgroundColor: `${theme}1a` }}>
                                            <Icon size={24} style={{ color: theme }} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2 font-hakgyoansim">{feature.title}</h3>
                                            <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
        </LazyMotion>
    );
};

export default LocationSection;
