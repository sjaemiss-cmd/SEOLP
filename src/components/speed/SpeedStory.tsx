"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const SpeedStory = () => {
    const { landingData } = useSiteConfig();
    const ctaLink = landingData.speed.offer?.ctaLink || "https://pcmap.place.naver.com/place/38729351/ticket";
    const cs = landingData.speed.caseStudy;

    // Fallback values
    const badge = cs?.badge || "REAL CASE STUDY";
    const title = cs?.title || "\"3일 만에 딴다더니...";
    const titleHighlight = cs?.titleHighlight || "4주가 걸렸어요\"";
    const subtitle = cs?.subtitle || "수강생들의 실제 이야기를 통해 학원들의 '단기 완성' 마케팅 이면을 확인해보세요.";
    const before = cs?.before;
    const after = cs?.after;

    return (
        <section className="py-24 bg-white text-black overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-sm font-bold mb-4">
                        {badge}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-hakgyoansim">
                        {title} <span className="text-red-600">{titleHighlight}</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                    {/* Before: Traditional Academy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <AlertCircle className="text-gray-500" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{before?.title || "BEFORE: 일반 학원"}</h3>
                                <p className="text-sm text-gray-500">{before?.subtitle || "황*정씨의 뼈아픈 경험"}</p>
                            </div>
                        </div>

                        <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden border border-gray-200 bg-white">
                            <Image
                                src={before?.image || "/images/usp/badcasestudy.webp"}
                                alt="일반 학원의 문제점"
                                fill
                                className="object-contain p-4"
                            />
                        </div>

                        <div className="space-y-4 flex-1">
                            <p className="text-gray-700 leading-relaxed italic">
                                &quot;{before?.quote || "3일 완성이라는 말만 믿고 등록했는데..."}&quot;
                            </p>
                            <div className="pt-4 border-t border-gray-200">
                                {(before?.stats || []).map((stat, idx) => (
                                    <div key={idx} className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-500">{stat.label}</span>
                                        <span className={`font-bold ${stat.negative ? 'text-red-600' : 'text-gray-800'}`}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* After: Gosu Driving Range */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-red-600 rounded-3xl p-8 md:p-12 text-white flex flex-col shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{after?.title || "AFTER: 고수의 운전면허"}</h3>
                                    <p className="text-red-100 text-sm">{after?.subtitle || "김*정 학생의 2주일 합격의 비결"}</p>
                                </div>
                            </div>

                            <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden bg-white border border-white/20 flex items-center justify-center group">
                                <Image
                                    src={after?.image || "/images/usp/goodcasestudy.webp"}
                                    alt="고수의 운전면허 성공 사례"
                                    fill
                                    className="object-contain p-4"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-700/50 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 z-20">
                                    <h4 className="text-xl font-bold">{after?.imageTitle || "14일 만에 원패스!"}</h4>
                                    <p className="text-red-100 text-xs">{after?.imageSubtitle || "사고 걱정 없는 무제한 연습의 힘"}</p>
                                </div>
                            </div>

                            <div className="space-y-4 flex-1">
                                <p className="text-red-50 leading-relaxed italic">
                                    &quot;{after?.quote || "고수에서는 떨어질 걱정 없이..."}&quot;
                                </p>
                                <div className="pt-4 border-t border-white/20">
                                    {(after?.stats || []).map((stat, idx) => (
                                        <div key={idx} className="flex justify-between text-sm mb-2">
                                            <span className="text-red-200">{stat.label}</span>
                                            <span className="font-bold text-white text-lg">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8">
                                <a
                                    href={ctaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-white text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                                >
                                    {after?.ctaText || "나도 2주일 만에 따기"} <ArrowRight size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpeedStory;
