"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ArrowRight, Gift, Cookie } from "lucide-react";
import cookieEventBg from "../../cookieevent.png";

const CookieEvent = ({ theme = "#FECE48" }: { theme?: string }) => {
    return (
        <section id="event" className="py-16 md:py-24 bg-gradient-to-b from-[#3E2723] to-[#1A120B] border-y border-[#5D4037] relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={cookieEventBg}
                    alt="Cookie Event Background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#3E2723]/90 via-[#3E2723]/80 to-[#1A120B]/90"></div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >

                        <span
                            className="inline-block text-black font-bold px-4 py-1.5 rounded-full mb-6 text-sm md:text-base shadow-lg"
                            style={{ backgroundColor: theme, boxShadow: `0 10px 15px -3px ${theme}33` }}
                        >
                            선착순 한정 이벤트
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep font-hakgyoansim leading-tight">
                            등록하면 <span style={{ color: theme }}>두쫀쿠 2개 공짜</span><br />
                            <span className="text-gray-300 text-2xl md:text-3xl font-normal mt-2 block">1월 28일부터 50개 소진 시까지</span>
                        </h2>
                        <p className="text-orange-200/90 text-sm md:text-base font-medium bg-orange-900/30 inline-block px-4 py-2 rounded-lg border border-orange-500/20">
                            ※ 본 이벤트는 조기 마감될 수 있습니다.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {/* Benefit 1: Time-based Plan */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#4E342E]/50 backdrop-blur-sm rounded-3xl p-8 border border-[#795548] transition-colors group relative overflow-hidden"
                        style={{ borderColor: '#795548' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = `${theme}80`}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#795548'}
                    >
                        <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                            추천
                        </div>

                        <div className="mb-6">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4 text-orange-400">
                                <Cookie size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-hakgyoansim">시간제 요금제</h3>
                            <p className="text-gray-300 text-sm">24시간 이상 시간제 요금제 등록시<br />사은품 증정</p>
                        </div>

                        <div className="mb-8 p-4 bg-[#3E2723]/50 rounded-xl border border-[#5D4037]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-sm">혜택</span>
                                <span className="text-orange-300 font-bold bg-orange-900/30 px-2 py-0.5 rounded text-xs">Limited</span>
                            </div>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold text-white">두쫀쿠 2개 증정</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="text-orange-400 mt-0.5 shrink-0" />
                                <span>24시간 이상 등록 필수</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="text-orange-400 mt-0.5 shrink-0" />
                                <span>선착순 50명 한정</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="text-orange-400 mt-0.5 shrink-0" />
                                <span>재고 소진 시 자동 종료</span>
                            </li>
                        </ul>

                        <a
                            href="https://booking.naver.com/booking/6/bizes/697059/items/4416581?area=ple&lang=ko&theme=place"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block text-center bg-[#5D4037] hover:bg-[#4E342E] text-white font-bold py-4 rounded-xl transition-colors"
                        >
                            상담 예약하기
                        </a>
                    </motion.div>

                    {/* Benefit 2: Unlimited Pass */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-[#3E2723] rounded-3xl p-8 border-2 shadow-lg relative overflow-hidden flex flex-col"
                        style={{ borderColor: theme, boxShadow: `0 0 30px ${theme}1a` }}
                    >
                        <div
                            className="absolute top-0 right-0 text-black text-xs font-bold px-3 py-1 rounded-bl-xl animate-pulse"
                            style={{ backgroundColor: theme }}
                        >
                            BEST CHOICE
                        </div>

                        <div className="mb-6">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                                style={{ backgroundColor: `${theme}33`, color: theme }}
                            >
                                <Gift size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-hakgyoansim">합격무제한 요금제</h3>
                            <p className="text-gray-300 text-sm">3개월 합격무제한 요금제 등록시<br />사은품 증정</p>
                        </div>

                        <div className="mb-8 p-4 bg-[#2D1F1B]/80 rounded-xl border" style={{ borderColor: `${theme}4d` }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-sm" style={{ color: theme }}>특별 혜택</span>
                                <span className="font-bold px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${theme}1a`, color: theme }}>선착순</span>
                            </div>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold text-white">두쫀쿠 2개 증정</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="mt-0.5 shrink-0" style={{ color: theme }} />
                                <span className="font-bold text-white">3개월 등록 필수</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="mt-0.5 shrink-0" style={{ color: theme }} />
                                <span>합격할 때까지 무제한 연습</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="mt-0.5 shrink-0" style={{ color: theme }} />
                                <span>선착순 50명 한정</span>
                            </li>
                        </ul>

                        <a
                            href="https://booking.naver.com/booking/6/bizes/697059/items/4416581?area=ple&lang=ko&theme=place"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 text-black font-bold py-4 rounded-xl transition-colors shadow-lg hover:brightness-110"
                            style={{ backgroundColor: theme }}
                        >
                            무제한반 상담받기 <ArrowRight size={20} />
                        </a>
                    </motion.div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        * 사은품은 재고 소진 시 조기 마감될 수 있습니다. * 1인 1회 한정입니다.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CookieEvent;
