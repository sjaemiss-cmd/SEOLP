"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Check, Clock, ArrowRight } from "lucide-react";

const LocationSection = ({ theme = "#FECE48" }: { theme?: string }) => {
    return (
        <section id="location" className="pt-24 pb-12 md:pt-32 md:pb-20 bg-brand-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 break-keep font-hakgyoansim">
                        <span style={{ color: theme }}>노원역 3번 출구</span>에서<br className="md:hidden" /> 걸어서 <span style={{ color: theme }}>단 2분</span>
                    </h2>
                    <p className="text-gray-400 break-keep">더 이상 멀리 다니지 마세요. 역세권 최고의 접근성!</p>
                </div>

                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Naver Map Image */}
                    <motion.div
                        className="w-full md:w-1/2 flex flex-col gap-4"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <a
                            href="https://map.naver.com/p/entry/place/38729351"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl group"
                        >
                            <Image
                                src="/naver_map.webp"
                                alt="고수의 운전면허 도봉점 네이버 지도"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 bg-brand-black/80 text-white px-4 py-2 rounded-full text-sm font-bold transition-opacity duration-300">지도 크게 보기</span>
                            </div>
                        </a>

                        <a
                            href="https://map.naver.com/p/entry/place/38729351"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-[#03C75A] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#02b351] transition-colors duration-300 shadow-lg"
                        >
                            네이버 지도로 보기 <ArrowRight size={20} />
                        </a>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className="w-full md:w-1/2 text-left"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${theme}1a` }}>
                                    <MapPin size={24} style={{ color: theme }} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 font-hakgyoansim">편하게 걸어올 위치</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        <strong className="text-white font-hakgyoansim">노원역 3번 출구</strong>로 나오셔서 직진 100m,<br />
                                        미도빌딩 5층에 위치해 있습니다.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${theme}1a` }}>
                                    <Check size={24} style={{ color: theme }} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 font-hakgyoansim">시험장과 가까운 거리</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        <strong className="text-white">도봉운전면허시험장</strong>까지<br />
                                        도보로 <strong style={{ color: theme }}>단 2분</strong> 거리입니다.<br />
                                        연습 후 바로 시험 보러 가기 최적의 위치!
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${theme}1a` }}>
                                    <Clock size={24} style={{ color: theme }} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 font-hakgyoansim">편리한 방문</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        대중교통 이용이 매우 편리하며,<br />
                                        건물 내 주차도 가능합니다. (사전 문의 필수)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
