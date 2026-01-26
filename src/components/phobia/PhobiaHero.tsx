"use client";

import React from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { landingData } from "@/data/landingData";
import Image from "next/image";

interface PhobiaHeroProps {
    locationName?: string;
    keyword?: string;
}

const PhobiaHero = ({ locationName, keyword }: PhobiaHeroProps) => {
    const data = landingData.phobia.hero;
    const theme = landingData.phobia.theme;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero3.webp"
                    alt="고수의 운전면허 도봉점 실내 운전연습장 전경"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/50 to-brand-black z-10"></div>
            </div>

            <div className="container mx-auto px-4 relative z-20 text-center">
                <div className="animate-fade-in-up">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border backdrop-blur-md shadow-lg animate-fade-in delay-200"
                        style={{
                            borderColor: `${theme}66`,
                            backgroundColor: `${theme}26`
                        }}
                    >
                        <ShieldCheck size={18} style={{ color: theme }} />
                        <span className="text-sm md:text-base font-bold text-white tracking-wide">
                            {data.badge}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight font-hakgyoansim break-keep drop-shadow-2xl">
                        {locationName && (
                            <span className="block text-xl md:text-3xl font-bold text-gray-400 mb-3">
                                {locationName} {keyword || "도로연수"},
                            </span>
                        )}
                        <span className="block mb-2 text-gray-200">
                            도로 위가 무서우신가요?
                        </span>
                        <span
                            className="relative z-10 inline px-1"
                            style={{
                                backgroundImage: `linear-gradient(to top, ${theme}80 40%, transparent 40%)`,
                                boxDecorationBreak: 'clone',
                                WebkitBoxDecorationBreak: 'clone'
                            }}
                        >
                            그건 당신의 잘못이 아닙니다.
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-200 text-lg md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto break-keep font-medium drop-shadow-lg">
                        {data.subtitle.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br className="hidden md:block" />
                            </React.Fragment>
                        ))}
                    </p>

                    {/* CTA Button */}
                    <a
                        href={data.ctaLink || "#offer"}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold text-brand-black shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all hover:shadow-[0_0_50px_rgba(74,222,128,0.5)] hover:scale-105 active:scale-95"
                        style={{ backgroundColor: theme }}
                    >
                        <span>{data.ctaText}</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />

                        {/* Ripple Effect */}
                        <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: theme }}></span>
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default PhobiaHero;
