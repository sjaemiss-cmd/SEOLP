"use client";

import React from "react";
import { motion } from "framer-motion";

const SpeedCurriculum = () => {
    const steps = [
        {
            day: "STEP 1",
            title: "OT & 기능 기초",
            desc: "필기 시험 응시 요령 및 학습법을 코칭합니다. 좌회전, 우회전, 차선 유지(코스 따라가기)를 집중 연습합니다."
        },
        {
            day: "STEP 2",
            title: "장내 기능 마스터",
            desc: "기기 조작, 경사로, 돌발상황, 교차로, 가속구간을 완벽하게 공략합니다. 가장 어려운 직각(T자) 주차 공식을 전수합니다."
        },
        {
            day: "STEP 3",
            title: "도로 주행 핵심 스킬",
            desc: "가감속(정주행 연습), 차선 변경, 교차로(좌회전, 유턴, 우회전, 신호체계), 커브 연습, 급커브, 차간 거리 유지, 차로 진입 등 실전 스킬을 훈련합니다."
        },
        {
            day: "STEP 4",
            title: "시험 코스 시뮬레이션",
            desc: "운전면허시험장 도로주행 A, B, C, D 코스를 완벽 분석합니다. 네비게이션 음성과 코스를 통째로 암기합니다."
        }
    ];

    return (
        <section className="py-20 bg-black text-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold font-hakgyoansim mb-4">
                        <span className="text-red-600">재수 없는</span> 2주일 루틴
                    </h2>
                    <p className="text-gray-400">NO FAIL ROUTINE</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 md:-translate-x-1/2"></div>

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[9px] md:left-1/2 top-0 md:top-1/2 w-3 h-3 bg-red-600 rounded-full md:-translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_10px_#dc2626] z-10"></div>

                                {/* Content Box */}
                                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                                    <div className={`bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-red-900/50 transition-colors duration-300 ${index % 2 === 0 ? 'text-left' : 'text-left md:text-right'}`}>
                                        <span className="inline-block text-red-500 font-bold text-sm mb-2 tracking-wider">{step.day}</span>
                                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed break-keep">{step.desc}</p>
                                    </div>
                                </div>

                                {/* Empty Space for the other side */}
                                <div className="hidden md:block w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpeedCurriculum;

