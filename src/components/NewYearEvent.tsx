"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star, ShieldCheck } from "lucide-react";

const NewYearEvent = ({ theme = "#FECE48" }: { theme?: string }) => {
    return (
        <section id="event" className="py-16 md:py-24 bg-gradient-to-b from-brand-black to-gray-900 border-y border-gray-800 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/red_horse_bg.webp"
                    alt="Red Horse Background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover opacity-80 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/80 to-brand-black/90"></div>
            </div>

            {/* Background Elements (Optional: Keep or remove based on visual preference, keeping subtle glow) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
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
                            새해 맞이 특별 이벤트
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep font-hakgyoansim leading-tight">
                            새해에는 나도 <span style={{ color: theme }}>뚜벅이 탈출!</span><br />
                            <span className="text-gray-400 text-2xl md:text-3xl font-normal mt-2 block">망설임은 비용만 높일 뿐입니다.</span>
                        </h2>
                        <p className="text-status-red/90 text-sm md:text-base font-medium bg-status-red/10 inline-block px-4 py-2 rounded-lg border border-status-red/20">
                            ※ 본 이벤트는 이 페이지를 통해 예약하신 분들께만 제공되는 단독 혜택입니다.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {/* Benefit 1: Experience Ticket */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 transition-colors group relative overflow-hidden"
                        style={{ borderColor: 'rgba(55, 65, 81, 1)' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = `${theme}80`}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 1)'}
                    >
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                            입문자 추천
                        </div>

                        <div className="mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 text-blue-400">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-hakgyoansim">1시간 체험권</h3>
                            <p className="text-gray-400 text-sm">운전, 나에게 맞을까? 고민된다면<br />부담 없이 먼저 체험해보세요.</p>
                        </div>

                        <div className="mb-8 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 line-through text-sm">정가 44,000원</span>
                                <span className="text-status-red font-bold bg-status-red/10 px-2 py-0.5 rounded text-xs">50% 할인</span>
                            </div>
                            <div className="flex items-end gap-1">
                                <span className="text-3xl font-bold text-white">22,000</span>
                                <span className="text-gray-400 mb-1">원</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="text-blue-400 mt-0.5 shrink-0" />
                                <span>기초 주행 능력 테스트</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="text-blue-400 mt-0.5 shrink-0" />
                                <span>시뮬레이터 적응 및 체험</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="text-blue-400 mt-0.5 shrink-0" />
                                <span>고수 매니저의 1:1 피드백</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="text-blue-400 mt-0.5 shrink-0" />
                                <span>카카오톡 메세지로 &apos;체험권&apos;이라고 보내기만 하면 신청완료!</span>
                            </li>
                        </ul>

                        <a
                            href="https://pf.kakao.com/_hxlxnIs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl transition-colors"
                        >
                            체험권 예약하기
                        </a>
                    </motion.div>

                    {/* Benefit 2: Unlimited Pass */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gray-800 rounded-3xl p-8 border-2 shadow-lg relative overflow-hidden flex flex-col"
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
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-hakgyoansim">3개월 합격 무제한반</h3>
                            <p className="text-gray-400 text-sm">합격할 때까지 추가 비용 0원!<br />가장 확실하고 경제적인 선택입니다.</p>
                        </div>

                        <div className="mb-8 p-4 bg-gray-900/80 rounded-xl border" style={{ borderColor: `${theme}4d` }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-sm" style={{ color: theme }}>선착순 추가 할인</span>
                                <span className="font-bold px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${theme}1a`, color: theme }}>3만원 즉시 할인</span>
                            </div>
                            <div className="flex items-end gap-1">
                                <span className="text-4xl font-bold text-white">상담 문의</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="mt-0.5 shrink-0" style={{ color: theme }} />
                                <span className="font-bold text-white">합격할 때까지 무제한 연습</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="mt-0.5 shrink-0" style={{ color: theme }} />
                                <span>모든 기능/도로주행 코스 완비</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check size={16} className="mt-0.5 shrink-0" style={{ color: theme }} />
                                <span>불합격 시 추가 수강료 0원</span>
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
                        * 체험권은 1인 1회 한정입니다. * 무제한반은 등록일로부터 3개월간 유효합니다.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NewYearEvent;
