import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { LandingContent, TrustBarItem } from "@/data/siteConfig";

interface HeroProps {
    data: LandingContent['hero'];
    theme: string;
    locationName?: string;
    keyword?: string;
    designStyle?: 'aggressive' | 'trust' | 'premium';
    trustBar?: TrustBarItem[];
    heroBackground?: string;
}

/**
 * Hero 섹션 컴포넌트
 * Props로 데이터를 받아 렌더링하는 프레젠테이션 컴포넌트
 * LCP 최적화를 위해 framer-motion 제거하고 CSS 애니메이션 사용
 */
const Hero = ({ data, theme, locationName, keyword, designStyle = 'premium', trustBar, heroBackground }: HeroProps) => {
    // 지역명이 있으면 별도 라인으로 분리하고, 타이틀에서 "운전면허" 중복 제거
    const mainTitle = locationName
        ? data.title.replace("운전면허 ", "")
        : data.title;

    const isPremium = designStyle === 'premium';

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBackground || "/images/heroes/hero3.webp"}
                    alt="고수의 운전면허 도봉점 실내 운전연습장 전경"
                    fill
                    className="object-cover"
                    priority
                />
                <div className={`absolute inset-0 z-10 ${isPremium ? 'bg-gradient-to-r from-black/90 via-black/60 to-transparent' : 'bg-black/60'}`}></div>
            </div>

            <div className={`container mx-auto px-4 relative z-20 ${isPremium ? 'text-left' : 'text-center'}`}>
                <div className={`${isPremium ? 'max-w-4xl mr-auto' : 'max-w-5xl mx-auto'} animate-fade-in-up`}>
                    {data.badge && (
                        <span
                            className={`inline-block px-4 py-1.5 text-sm md:text-base font-bold rounded-full mb-6 border backdrop-blur-sm ${isPremium ? 'bg-brand-yellow/20 text-brand-yellow border-brand-yellow/30' : ''}`}
                            style={!isPremium ? {
                                backgroundColor: `${theme}33`, // 20% opacity
                                color: theme,
                                borderColor: `${theme}4d` // 30% opacity
                            } : undefined}
                        >
                            {data.badge}
                        </span>
                    )}

                    <div className="mb-8">
                        {locationName && (
                            <span className={`block font-bold mb-4 ${isPremium ? 'text-lg md:text-2xl text-white/60' : 'text-2xl md:text-4xl text-white/70'}`}>
                                {locationName} {keyword || "운전면허"}
                            </span>
                        )}
                        <h1
                            className={`${isPremium ? 'text-5xl md:text-8xl' : 'text-4xl md:text-7xl font-hakgyoansim'} font-extrabold leading-tight text-white break-keep tracking-tight`}
                        >
                            <span dangerouslySetInnerHTML={{ __html: mainTitle }} />
                        </h1>
                    </div>

                    <p
                        className={`text-gray-300 text-lg md:text-2xl mb-10 leading-relaxed break-keep ${isPremium ? 'max-w-2xl' : 'max-w-3xl mx-auto'}`}
                        dangerouslySetInnerHTML={{ __html: data.subtitle }}
                    />

                    <a
                        href={data.ctaLink || "#offer"}
                        className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${isPremium ? 'min-w-[240px]' : ''}`}
                        style={{
                            backgroundColor: theme,
                            color: theme === '#FECE48' ? '#000' : '#FFF',
                            boxShadow: `0 0 20px ${theme}66`
                        }}
                    >
                        {data.ctaText}
                        <ArrowRight size={20} />
                    </a>

                    {/* Trust Bar */}
                    {trustBar && trustBar.length > 0 && (
                        <div className="flex flex-wrap items-center justify-start gap-4 md:gap-8 mt-10 text-white/70 text-sm md:text-base">
                            {trustBar.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    {idx > 0 && <div className="w-px h-5 bg-white/20 hidden sm:block" />}
                                    <div className="flex items-center gap-2">
                                        {item.prefix && <span>{item.prefix}</span>}
                                        <span className="font-bold text-lg md:text-xl" style={idx === trustBar.length - 1 ? { color: theme } : { color: 'white' }}>{item.value}</span>
                                        {item.suffix && <span>{item.suffix}</span>}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <a
                href="#usp"
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2 cursor-pointer animate-pulse-soft"
            >
                <span className="text-xs font-medium tracking-widest">더 알아보기</span>
                <ArrowRight className="rotate-90" size={20} />
            </a>
        </section>
    );
};

export default Hero;
