"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

const SpeedStory = () => {
    return (
        <section className="py-24 bg-white text-black overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-sm font-bold mb-4">
                        REAL CASE STUDY
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-hakgyoansim">
                        &quot;3일 만에 딴다더니... <span className="text-red-600">4주가 걸렸어요</span>&quot;
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        수강생들의 실제 이야기를 통해 <br className="hidden md:block" />
                        학원들의 &apos;단기 완성&apos; 마케팅 이면을 확인해보세요.
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
                                <h3 className="text-xl font-bold text-gray-800">BEFORE: 일반 학원</h3>
                                <p className="text-sm text-gray-500">황*정씨의 뼈아픈 경험</p>
                            </div>
                        </div>

                        <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden border border-gray-200 bg-white">
                            <Image
                                src="/hwang_before.webp"
                                alt="황*정 수강생의 좌절"
                                fill
                                className="object-contain p-4"
                            />
                        </div>

                        <div className="space-y-4 flex-1">
                            <p className="text-gray-700 leading-relaxed italic">
                                &quot;3일 완성이라는 말만 믿고 등록했는데, 실제로는 예약 잡기도 힘들고 한 번 떨어지니까 재시험까지 일주일씩 밀리더라고요. 결국 면허 따는 데만 4주가 걸렸고, 추가 교육비로만 20만 원을 더 썼습니다.&quot;
                            </p>
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500">소요 기간</span>
                                    <span className="font-bold text-red-600">28일 (4주)</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500">기본 수강료</span>
                                    <span className="font-bold text-gray-800">900,000원</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">추가 비용</span>
                                    <span className="font-bold text-red-600">225,000원</span>
                                </div>
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
                                    <h3 className="text-xl font-bold">AFTER: 고수의 운전면허</h3>
                                    <p className="text-red-100 text-sm">김*정 학생의 2주일 합격의 비결</p>
                                </div>
                            </div>

                            <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden bg-white border border-white/20 flex items-center justify-center group">
                                <Image
                                    src="/hwang_after.webp"
                                    alt="황*정 수강생의 합격"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-700/50 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 z-20">
                                    <h4 className="text-xl font-bold">14일 만에 원패스!</h4>
                                    <p className="text-red-100 text-xs">사고 걱정 없는 무제한 연습의 힘</p>
                                </div>
                            </div>

                            <div className="space-y-4 flex-1">
                                <p className="text-red-50 leading-relaxed italic">
                                     &quot;고수에서는 떨어질 걱정 없이 제가 원하는 만큼 충분히 연습할 수 있었어요. 특히 주차 공식이 너무 명확해서 시험장에서 당황하지 않았죠. 딱 2주일 만에 면허증을 손에 쥐었을 때의 쾌감은 잊을 수 없어요!&quot;
                                </p>
                                <div className="pt-4 border-t border-white/20">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-red-200">소요 기간</span>
                                        <span className="font-bold text-white text-lg">14일 (2주)</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-red-200">기본 수강료</span>
                                        <span className="font-bold text-white text-lg">550,000원</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-red-200">추가 비용</span>
                                        <span className="font-bold text-white text-lg">0원 (합격보장)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <a
                                    href="https://booking.naver.com/booking/6/bizes/697059/items/4416581?area=ple&lang=ko&theme=place"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-white text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                                >
                                    나도 2주일 만에 따기 <ArrowRight size={20} />
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
