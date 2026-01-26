"use client";

import React, { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

/**
 * 비용 계산기 컴포넌트
 * 슬라이더를 통해 학원 vs 고수의 운전면허 비용 비교
 * 클라이언트 컴포넌트 (useState 사용)
 * LazyMotion 적용으로 초기 번들 사이즈 최적화
 */
const CostCalculator = () => {
    const [fails, setFails] = useState(2);

    // Costs
    const academyBase = 1000000;
    const academyFailCost = 150000;
    const gosuBase = 550000;
    const gosuFailCost = 25000;

    const academyTotal = academyBase + (fails * academyFailCost);
    const gosuTotal = gosuBase + (fails * gosuFailCost);
    const savings = academyTotal - gosuTotal;

    const maxCost = academyBase + (5 * academyFailCost); // Max possible cost for scaling

    return (
        <LazyMotion features={domAnimation}>
            <section id="calculator" className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-20 bg-brand-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 break-keep font-hakgyoansim">
                            운전면허 취득 비용,<br className="md:hidden" /> <span className="text-status-red">얼마나 낭비하시겠습니까?</span>
                        </h2>
                        <p className="text-gray-400 break-keep">슬라이더를 움직여서 절약 금액을 확인해보세요.</p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl shadow-xl p-6 md:p-12 border border-gray-800">
                        {/* Custom Interactive Slider */}
                        <div className="mb-16 relative">
                            <div className="text-center mb-8">
                                <span className="text-gray-400 text-sm font-medium bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
                                    👇 아래 버튼을 좌우로 움직여보세요
                                </span>
                            </div>

                            <div className="relative h-12 flex items-center justify-center select-none touch-none">
                                {/* Hidden Native Input for Interaction */}
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="1"
                                    value={fails}
                                    onChange={(e) => setFails(Number(e.target.value))}
                                    className="absolute w-full h-full opacity-0 z-30 cursor-pointer"
                                    aria-label="예상 불합격 횟수 설정"
                                />

                                {/* Visual Track Container */}
                                <div className="relative w-full h-4 bg-gray-800 rounded-full shadow-inner border border-gray-700 overflow-hidden">
                                    {/* Filled Track */}
                                    <m.div
                                        className="absolute top-0 left-0 h-full bg-brand-yellow"
                                        initial={{ width: "40%" }}
                                        animate={{ width: `${(fails / 5) * 100}%` }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                </div>

                                {/* Ticks */}
                                <div className="absolute inset-0 w-full h-4 top-1/2 -translate-y-1/2 flex justify-between items-center px-1 pointer-events-none">
                                    {[0, 1, 2, 3, 4, 5].map((step) => (
                                        <div key={step} className={`w-1 h-1 rounded-full transition-colors duration-300 z-10 ${step <= fails ? 'bg-brand-black/50' : 'bg-gray-600'}`} />
                                    ))}
                                </div>

                                {/* Visual Thumb */}
                                <m.div
                                    className="absolute top-1/2 w-8 h-8 bg-white border-4 border-brand-yellow rounded-full shadow-[0_0_15px_rgba(254,206,72,0.5)] z-20 flex items-center justify-center pointer-events-none"
                                    initial={{ left: "40%" }}
                                    animate={{ left: `${(fails / 5) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    style={{ x: "-50%", y: "-50%" }}
                                >
                                    <div className="w-2 h-2 bg-brand-black rounded-full" />
                                </m.div>

                                {/* Floating Label */}
                                <m.div
                                    className="absolute -top-10 bg-brand-yellow text-brand-black font-bold px-3 py-1 rounded-lg text-sm shadow-lg pointer-events-none whitespace-nowrap"
                                    initial={{ left: "40%" }}
                                    animate={{ left: `${(fails / 5) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    style={{ x: "-50%" }}
                                >
                                    {fails}회 불합격
                                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-yellow rotate-45"></div>
                                </m.div>
                            </div>

                            <div className="flex justify-between text-xs md:text-sm text-gray-500 mt-2 font-medium px-1">
                                <span>0회 (한방 합격)</span>
                                <span>5회 (보통)</span>
                            </div>
                        </div>

                        {/* Horizontal Stacked Bar Chart */}
                        <div className="flex flex-col gap-6 mb-12">
                            {/* Academy Row */}
                            <div className="w-full">
                                <div className="flex justify-between mb-2 text-sm font-bold text-gray-400">
                                    <span>일반 학원</span>
                                    <span>{academyTotal.toLocaleString()}원</span>
                                </div>
                                <div className="w-full h-12 bg-gray-800 rounded-full overflow-hidden relative">
                                    <m.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(academyTotal / maxCost) * 100}%` }}
                                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                        className="h-full bg-status-red flex items-center justify-end px-4"
                                    >
                                        <span className="text-white font-bold whitespace-nowrap text-sm md:text-base">비용 발생</span>
                                    </m.div>
                                </div>
                            </div>

                            {/* Gosu Row */}
                            <div className="w-full">
                                <div className="flex justify-between mb-2 text-sm font-bold text-gray-400">
                                    <span>고수의 운전면허</span>
                                    <span>{gosuTotal.toLocaleString()}원</span>
                                </div>
                                <div className="w-full h-12 bg-gray-800 rounded-full overflow-hidden relative flex">
                                    {/* Gosu Cost */}
                                    <m.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(gosuTotal / maxCost) * 100}%` }}
                                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                        className="h-full bg-white flex items-center justify-start px-4 z-10"
                                    >
                                        <span className="text-brand-black font-bold whitespace-nowrap text-sm md:text-base">고수</span>
                                    </m.div>

                                    {/* Savings (The Gap) */}
                                    <m.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(savings / maxCost) * 100}%` }}
                                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                        className="h-full bg-brand-yellow flex items-center justify-center relative"
                                    >
                                        {/* Animated Stripes Pattern */}
                                        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]"></div>

                                        <span className="text-brand-black font-extrabold whitespace-nowrap z-10 px-2 text-sm md:text-base">
                                            {savings.toLocaleString()}원 SAVE!
                                        </span>
                                    </m.div>
                                </div>
                            </div>
                        </div>

                        {/* Result */}
                        <div className="bg-gray-800 border border-brand-yellow/30 text-white rounded-2xl p-6 text-center transform scale-100 md:scale-105 shadow-2xl">
                            <p className="text-gray-400 text-sm mb-1">고수에서 시작하면</p>
                            <div className="text-3xl md:text-5xl font-extrabold text-brand-yellow mb-2 break-keep">
                                총 {savings.toLocaleString()}원 절약!
                            </div>
                            <p className="text-sm text-gray-500 break-keep">
                                * 일반 학원 평균 재시험 비용 기준<br className="md:hidden" /> (2시간 추가연습 + 재시험 응시료)
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
};

export default CostCalculator;
