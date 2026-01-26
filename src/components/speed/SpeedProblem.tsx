"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Check, AlertTriangle } from "lucide-react";

const SpeedProblem = () => {
    return (
        <section className="py-20 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 font-hakgyoansim uppercase italic tracking-tight">
                        <span className="text-gray-700 line-through decoration-red-600 decoration-4">3일 완성?</span> <span className="text-red-600">거짓말입니다.</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        학원들의 달콤한 상술에 속지 마세요.<br />
                        현실은 그렇게 호락호락하지 않습니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* The Lie */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 md:p-12 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800"></div>
                        <div className="flex items-start justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-400">타 학원 광고</h3>
                            <X className="text-gray-600 w-8 h-8" />
                        </div>

                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 opacity-50">
                                <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={20} />
                                <div>
                                    <strong className="block text-lg text-gray-300">기능 4시간 + 주행 6시간</strong>
                                    <span className="text-sm text-gray-500">법정 최소 시간만 이수</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 opacity-50">
                                <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={20} />
                                <div>
                                    <strong className="block text-lg text-gray-300">90% 불합격</strong>
                                    <span className="text-sm text-gray-500">충분한 연습 없이 시험장 직행</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 opacity-50">
                                <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={20} />
                                <div>
                                    <strong className="block text-lg text-gray-300">결국 4주 소요</strong>
                                    <span className="text-sm text-gray-500">재시험 대기 + 추가 교육비 발생</span>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* The Truth */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-red-950/20 border border-red-900/50 rounded-3xl p-8 md:p-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
                        <div className="flex items-start justify-between mb-8">
                            <h3 className="text-2xl font-bold text-white">고수의 2주 플랜</h3>
                            <Check className="text-red-500 w-8 h-8" />
                        </div>

                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="bg-red-600/20 p-1 rounded-full text-red-500 mt-1">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <div>
                                    <strong className="block text-lg text-white">무제한 연습</strong>
                                    <span className="text-sm text-red-200/60">감이 잡힐 때까지 10시간이고 20시간이고</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-red-600/20 p-1 rounded-full text-red-500 mt-1">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <div>
                                    <strong className="block text-lg text-white">시뮬레이션 무한 리셋</strong>
                                    <span className="text-sm text-red-200/60">사고 걱정 없이 과감하게 밟으세요</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-red-600/20 p-1 rounded-full text-red-500 mt-1">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <div>
                                    <strong className="block text-lg text-white">진짜 2주일 완성</strong>
                                    <span className="text-sm text-red-200/60">재시험 없이 한 번에 붙는 게 가장 빠릅니다</span>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpeedProblem;

