"use client";

import React, { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { MapPin, Award, Users, ShieldCheck, Monitor, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LandingContent, FeatureItem } from "@/data/landingData";

interface USPProps {
    data: LandingContent['problem'];
    theme: string;
}

/**
 * USP (Unique Selling Proposition) 컴포넌트
 * 고수의 운전면허 특장점을 보여주는 섹션
 * 클라이언트 컴포넌트 (useState, useEffect, useRef 사용)
 * LazyMotion 적용으로 초기 번들 사이즈 최적화
 */
const USP = ({ data, theme }: USPProps) => {
    const stationVideoRef = useRef<HTMLVideoElement>(null);
    const accidentVideoRef = useRef<HTMLVideoElement>(null);
    const realisticVideoRef = useRef<HTMLVideoElement>(null);
    const celebVideoRef = useRef<HTMLVideoElement>(null);

    // State for Realistic Card Playlist
    const [realisticVideoSrc, setRealisticVideoSrc] = useState<'/function.mp4' | '/motion.mp4'>('/function.mp4');

    // Video effects logic
    useEffect(() => {
        const stationVideo = stationVideoRef.current;
        if (!stationVideo) return;
        stationVideo.playbackRate = 2.0;
        const handleStationTimeUpdate = () => {
            if (stationVideo.duration) {
                const endTime = Math.max(0, stationVideo.duration - 5);
                if (stationVideo.currentTime >= endTime) {
                    stationVideo.currentTime = 0;
                    stationVideo.play();
                }
            }
        };
        stationVideo.addEventListener('timeupdate', handleStationTimeUpdate);
        return () => stationVideo.removeEventListener('timeupdate', handleStationTimeUpdate);
    }, []);

    useEffect(() => {
        const accidentVideo = accidentVideoRef.current;
        if (!accidentVideo) return;
        const handleTimeUpdate = () => {
            if (accidentVideo.duration) {
                const startTime = Math.max(0, accidentVideo.duration - 15);
                if (accidentVideo.currentTime < startTime) accidentVideo.currentTime = startTime;
                if (accidentVideo.ended || accidentVideo.currentTime >= accidentVideo.duration) {
                    accidentVideo.currentTime = startTime;
                    accidentVideo.play();
                }
            }
        };
        const handleLoadedMetadata = () => {
            if (accidentVideo.duration) accidentVideo.currentTime = Math.max(0, accidentVideo.duration - 15);
        };
        accidentVideo.addEventListener('timeupdate', handleTimeUpdate);
        accidentVideo.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
            accidentVideo.removeEventListener('timeupdate', handleTimeUpdate);
            accidentVideo.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    useEffect(() => {
        const video = realisticVideoRef.current;
        if (!video) return;
        video.playbackRate = 2.0;
        const handleTimeUpdate = () => {
            if (!video.duration) return;
            if (realisticVideoSrc === '/motion.mp4') {
                const startTime = 10;
                const endTime = Math.max(10, video.duration - 10);
                if (video.currentTime < startTime) video.currentTime = startTime;
                if (video.currentTime >= endTime) setRealisticVideoSrc('/function.mp4');
            } else {
                const endTime = Math.max(0, video.duration - 10);
                if (video.currentTime >= endTime) setRealisticVideoSrc('/motion.mp4');
            }
        };
        const handleLoadedMetadata = () => {
            if (realisticVideoSrc === '/motion.mp4') video.currentTime = 10;
            video.playbackRate = 2.0;
            video.play().catch(() => { });
        };
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [realisticVideoSrc]);

    useEffect(() => {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                const video = entry.target as HTMLVideoElement;
                if (entry.isIntersecting) video.play().catch(() => { });
                else video.pause();
            });
        };
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        if (stationVideoRef.current) observer.observe(stationVideoRef.current);
        if (accidentVideoRef.current) observer.observe(accidentVideoRef.current);
        if (realisticVideoRef.current) observer.observe(realisticVideoRef.current);
        if (celebVideoRef.current) observer.observe(celebVideoRef.current);
        return () => observer.disconnect();
    }, [realisticVideoSrc]);

    // If we have features (Speed/Skill), render the feature list
    if (data.features && data.features.length > 0) {
        return (
            <LazyMotion features={domAnimation}>
                <section id="usp" className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-20 bg-brand-black">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12 md:mb-16">
                            <h2
                                className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep font-hakgyoansim"
                                dangerouslySetInnerHTML={{ __html: data.title }}
                            />
                            <p
                                className="text-gray-400 text-lg break-keep"
                                dangerouslySetInnerHTML={{ __html: data.subtitle }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {data.features.map((feature: FeatureItem, index: number) => (
                                <m.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={cn(
                                        "rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[320px] border transition-all duration-300",
                                        feature.highlight
                                            ? "bg-gray-900 border-2"
                                            : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                                    )}
                                    style={{
                                        borderColor: feature.highlight ? theme : undefined,
                                        boxShadow: feature.highlight ? `0 0 30px -10px ${theme}33` : undefined
                                    }}
                                >
                                    <div>
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                                            style={{ backgroundColor: feature.highlight ? theme : '#1f2937' }}
                                        >
                                            {/* Icon placeholder logic */}
                                            {feature.icon === 'clock' && <Clock className="w-8 h-8" style={{ color: feature.highlight ? '#000' : theme }} />}
                                            {feature.icon === 'shield' && <ShieldCheck className="w-8 h-8" style={{ color: feature.highlight ? '#000' : theme }} />}
                                            {feature.icon === 'check' && <Award className="w-8 h-8" style={{ color: feature.highlight ? '#000' : theme }} />}
                                            {feature.icon === 'monitor' && <Monitor className="w-8 h-8" style={{ color: feature.highlight ? '#000' : theme }} />}
                                            {!feature.icon && <Star className="w-8 h-8" style={{ color: feature.highlight ? '#000' : theme }} />}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4 break-keep font-hakgyoansim">
                                            {feature.title}
                                        </h3>
                                        <p
                                            className="text-gray-400 leading-relaxed break-keep"
                                            dangerouslySetInnerHTML={{ __html: feature.description }}
                                        />
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                </section>
            </LazyMotion>
        );
    }

    // Default USP (Cost/Original) - Video Grid
    return (
        <LazyMotion features={domAnimation}>
            <section id="usp" className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-20 bg-brand-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep font-hakgyoansim">
                            왜 <span className="text-brand-yellow">고수의 운전면허 도봉점</span>인가요?
                        </h2>
                        <p className="text-gray-400 text-lg break-keep">다른 곳과는 비교할 수 없는 압도적인 차이</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {/* 1. 합격 무제한 보장 (Text Card - Highlight) */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-brand-yellow rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="relative z-10">
                                <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                    <Award className="w-8 h-8 text-brand-black" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-4 break-keep font-hakgyoansim">
                                    합격할 때까지<br />무제한 보장
                                </h3>
                                <p className="text-brand-black/80 font-medium text-lg leading-relaxed break-keep">
                                    첫 결제후엔 걱정하지 마세요.<br />
                                    추가 비용 없이 끝까지 책임집니다.
                                </p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500" />
                        </m.div>

                        {/* 2. 연예인 선택 (Video Card) */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl overflow-hidden min-h-[320px] group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                            <video
                                ref={celebVideoRef}
                                src="/celebv.mp4"
                                loop
                                muted
                                playsInline
                                preload="none"
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-10">
                                <div className="bg-brand-yellow text-brand-black text-xs font-bold px-3 py-1 rounded-full inline-flex items-center w-fit mb-3">
                                    <Star className="w-3 h-3 mr-1" fill="currentColor" /> CELEB&apos;s PICK
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 break-keep font-hakgyoansim">
                                    연예인도 믿고 찾는<br />검증된 운전 연습장
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    수많은 셀럽들이 선택한 이유가 있습니다.
                                </p>
                            </div>
                        </m.div>

                        {/* 3. 최고의 접근성 (Video Card) */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl overflow-hidden min-h-[320px] group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                            <video
                                ref={stationVideoRef}
                                src="/stationmosaic.mp4"
                                loop
                                muted
                                playsInline
                                preload="none"
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-10">
                                <div className="bg-brand-yellow text-brand-black text-xs font-bold px-3 py-1 rounded-full inline-flex items-center w-fit mb-3">
                                    <MapPin className="w-3 h-3 mr-1" /> 2min WALK
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 break-keep font-hakgyoansim">
                                    노원역 3번 출구<br />도보 2분 컷!
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    도봉면허시험장도 걸어서 2분이면 도착해요.
                                </p>
                            </div>
                        </m.div>

                        {/* 4. 1:1 밀착 코칭 (Text Card - Dark) */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 hover:border-gray-700"
                        >
                            <div className="relative z-10">
                                <div className="bg-gray-800 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-colors">
                                    <Users className="w-8 h-8 text-brand-yellow" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 break-keep font-hakgyoansim">
                                    1:1 밀착<br />맞춤 코칭
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed break-keep">
                                    나의 운전 실력과 습관을 분석하여<br />
                                    부족한 부분을 집중적으로 케어해드립니다.
                                </p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl group-hover:bg-brand-yellow/10 transition-colors duration-500" />
                        </m.div>

                        {/* 5. 실수해도 괜찮아 (Video Card - Accident) */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl overflow-hidden min-h-[320px] group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                            <video
                                ref={accidentVideoRef}
                                src="/accident.mp4"
                                loop
                                muted
                                playsInline
                                preload="none"
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-10">
                                <div className="bg-brand-yellow text-brand-black text-xs font-bold px-3 py-1 rounded-full inline-flex items-center w-fit mb-3">
                                    <ShieldCheck className="w-3 h-3 mr-1" /> SAFE & EASY
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 break-keep font-hakgyoansim">
                                    실수해도 괜찮아요<br />사고 걱정 ZERO
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    교통사고 걱정 없이 마음껏 실수하며<br />진짜 실력을 키우세요.
                                </p>
                            </div>
                        </m.div>

                        {/* 6. 현실감 (Video Card - Realistic) */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl overflow-hidden min-h-[320px] group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                            <video
                                ref={realisticVideoRef}
                                src={realisticVideoSrc}
                                muted
                                playsInline
                                preload="none"
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-10">
                                <div className="bg-brand-yellow text-brand-black text-xs font-bold px-3 py-1 rounded-full inline-flex items-center w-fit mb-3">
                                    <Monitor className="w-3 h-3 mr-1" /> REALISTIC
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 break-keep font-hakgyoansim">
                                    풀 한 포기, 흔들림까지<br />그대로 재현
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    전국 시험장을 완벽하게 구현하고<br />모션 베이스로 현장감까지!
                                </p>
                            </div>
                        </m.div>
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
};

export default USP;
