"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const SpeedCTA = () => {
    return (
        <section id="speed-cta" className="py-24 bg-red-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-hakgyoansim leading-tight">
                        지금 시작하지 않으면<br />
                        <span className="text-brand-black">일주일이 또 늦어집니다.</span>
                    </h2>

                    <p className="text-white/80 text-xl mb-12 font-medium">
                        고민하는 순간에도 예약은 차고 있습니다.<br />
                        가장 빠른 합격, 지금 바로 상담하세요.
                    </p>

                    {/* Value Stack */}
                    <div className="bg-black backdrop-blur-sm rounded-3xl p-8 mb-12 text-left max-w-2xl mx-auto border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">
                            <span className="text-white">2주 완성 패키지 포함 내역</span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="bg-red-600 rounded-full p-1 mt-1 shrink-0">
                                    <Check size={12} className="text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <span className="text-white font-bold">합격할 때까지 무제한 시뮬레이터</span>
                                    <span className="block text-sm text-yellow-400">추가 비용 없이 100시간이고 타세요</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-red-600 rounded-full p-1 mt-1 shrink-0">
                                    <Check size={12} className="text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <span className="text-white font-bold">시험장 4개 코스 완벽 분석 리포트</span>
                                    <span className="block text-sm text-yellow-400">다년간의 데이터를 바탕으로 감점,실격 포인트 집중공략</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-red-600 rounded-full p-1 mt-1 shrink-0">
                                    <Check size={12} className="text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <span className="text-white font-bold">1:1 밀착 약점 교정 코칭</span>
                                    <span className="block text-sm text-yellow-400">매니저님이 옆에서 될 때까지 알려드립니다</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="bg-red-600 rounded-full p-1 mt-1 shrink-0">
                                    <Check size={12} className="text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <span className="text-white font-bold">불합격 시 추가 교육비 0원</span>
                                    <span className="block text-sm text-yellow-400">심리적 부담 없이 편안하게 연습하세요</span>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <div className="bg-gradient-to-b from-white/10 to-transparent rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden group">
                                <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 flex flex-col items-center justify-center">
                                    <p className="text-lg text-white/90 mb-1">이 모~든 혜택을</p>
                                    <p className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                        일반 학원<br></br> <span className="text-yellow-400 inline-block transform group-hover:scale-105 transition-transform duration-300">절반 가격</span>으로
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://booking.naver.com/booking/6/bizes/697059/items/4416581?area=ple&lang=ko&theme=place"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 hover:bg-gray-900 transition-all duration-300 shadow-2xl"
                    >
                        <span>순식간에 취득하러가기</span>
                        <ArrowRight />
                    </a>
                </motion.div>
            </div>
        </section >
    );
};

export default SpeedCTA;
