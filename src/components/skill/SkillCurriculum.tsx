"use client";

import React from "react";
import { motion } from "framer-motion";

const SkillCurriculum = () => {
    const steps = [
        {
            step: "01",
            title: "공식 이해 (Input)",
            desc: "주차, 차선 변경, 좌/우회전 등 모든 동작을 수학 공식처럼 도식화하여 머리로 먼저 이해합니다."
        },
        {
            step: "02",
            title: "가이드 주행 (Process)",
            desc: "시뮬레이터 화면에 표시된 '가이드라인'을 따라 빠르게 주행코스를 학습합니다"
        },
        {
            step: "03",
            title: "오차 수정 (Debug)",
            desc: "나의 주행 데이터와 정답 데이터를 비교하여 빗나간 각도와 타이밍을 미세 조정합니다."
        },
        {
            step: "04",
            title: "합격 완성 (Output)",
            desc: "공식이 몸에 익을 때까지 무한 반복하여, 시험장에서 생각하지 않고도 몸이 반응하게 만듭니다."
        }
    ];

    return (
        <section id="curriculum" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">Curriculum</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-hakgyoansim text-gray-900">
                        합격 알고리즘
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {steps.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
                        >
                            <div className="text-5xl font-black text-gray-100 mb-6 group-hover:text-blue-50 transition-colors font-mono">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm break-keep">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillCurriculum;
