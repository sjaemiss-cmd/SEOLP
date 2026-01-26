"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { landingData } from "@/data/landingData";

const LicenseDDayCalculator = () => {
    const theme = landingData.speed.theme;

    const [status, setStatus] = useState<"beginner" | "written" | "function">("beginner");
    const [hours, setHours] = useState<2 | 4 | 8>(2);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const calculateDays = () => {
        setIsCalculating(true);
        setShowResult(false);

        // Simulate calculation delay
        setTimeout(() => {
            setIsCalculating(false);
            setShowResult(true);
        }, 1500);
    };

    // Logic for days calculation
    const getDays = (type: "gosu" | "academy") => {
        if (type === "academy") return 30;

        const mapping: Record<string, Record<number, number>> = {
            beginner: { 2: 14, 4: 7, 8: 4 },
            written: { 2: 15, 4: 8, 8: 4.5 },
            function: { 2: 7, 4: 4, 8: 2 }
        };

        return mapping[status][hours] || 7;
    };

    const gosuDays = getDays("gosu");
    const academyDays = getDays("academy");
    const savedDays = Math.floor(academyDays - gosuDays);

    const today = new Date();
    const gosuDate = new Date(today);
    gosuDate.setDate(today.getDate() + gosuDays);

    const academyDate = new Date(today);
    academyDate.setDate(today.getDate() + academyDays);

    const formatDate = (date: Date) => {
        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    return (
        <section className="py-20 bg-brand-black relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-hakgyoansim">
                        <span style={{ color: theme }}>운전면허 취득 D-Day</span> 계산기
                    </h2>
                    <p className="text-gray-400 text-lg">
                        지금 시작하면 언제 운전면허증을 받을 수 있을까요?
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    {/* Input Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Status Selection */}
                        <div>
                            <label className="block text-gray-400 text-sm font-bold mb-4 flex items-center gap-2">
                                <CheckCircle2 size={16} style={{ color: theme }} />
                                현재 상태는?
                            </label>
                            <div className="space-y-3">
                                {[
                                    { id: "beginner", label: "완전 처음 (필기 전)" },
                                    { id: "written", label: "필기 합격 (기능 전)" },
                                    { id: "function", label: "기능 합격 (주행 전)" }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setStatus(item.id as "beginner" | "written" | "function");
                                            setShowResult(false);
                                        }}
                                        className={`w-full p-4 rounded-xl text-left font-bold transition-all border ${status === item.id
                                            ? `bg-gray-800 text-white border-[${theme}]`
                                            : "bg-gray-800/50 text-gray-500 border-transparent hover:bg-gray-800"
                                            }`}
                                        style={{
                                            borderColor: status === item.id ? theme : 'transparent',
                                            boxShadow: status === item.id ? `0 0 15px ${theme}33` : 'none'
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hours Selection */}
                        <div>
                            <label className="block text-gray-400 text-sm font-bold mb-4 flex items-center gap-2">
                                <Clock size={16} style={{ color: theme }} />
                                하루 투자 가능 시간?
                            </label>
                            <div className="space-y-3">
                                {[
                                    { val: 2, label: "2시간 (퇴근 후)" },
                                    { val: 4, label: "4시간 (반나절)" },
                                    { val: 8, label: "8시간 (하루 종일)" }
                                ].map((item) => (
                                    <button
                                        key={item.val}
                                        onClick={() => {
                                            setHours(item.val as 2 | 4 | 8);
                                            setShowResult(false);
                                        }}
                                        className={`w-full p-4 rounded-xl text-left font-bold transition-all border ${hours === item.val
                                            ? `bg-gray-800 text-white border-[${theme}]`
                                            : "bg-gray-800/50 text-gray-500 border-transparent hover:bg-gray-800"
                                            }`}
                                        style={{
                                            borderColor: hours === item.val ? theme : 'transparent',
                                            boxShadow: hours === item.val ? `0 0 15px ${theme}33` : 'none'
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Calculate Button */}
                    {!showResult && !isCalculating && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={calculateDays}
                            className="w-full py-5 rounded-xl font-bold text-xl text-white shadow-lg transition-all"
                            style={{ backgroundColor: theme }}
                        >
                            내 예상 합격일 확인하기
                        </motion.button>
                    )}

                    {/* Loading State */}
                    {isCalculating && (
                        <div className="py-10 text-center">
                            <div className="inline-block w-12 h-12 border-4 border-gray-700 border-t-white rounded-full animate-spin mb-4" style={{ borderTopColor: theme }}></div>
                            <p className="text-gray-400 animate-pulse">최적의 커리큘럼을 분석 중입니다...</p>
                        </div>
                    )}

                    {/* Result Section */}
                    <AnimatePresence>
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700"
                            >
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                                    {/* Gosu Result */}
                                    <div className="flex-1 text-center md:text-left">
                                        <p className="text-gray-400 text-sm mb-1">고수의 운전면허</p>
                                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 font-hakgyoansim">
                                            {formatDate(gosuDate)} <span className="text-lg font-normal text-gray-400">합격 예정</span>
                                        </h3>
                                        <p className="text-sm font-medium inline-block px-3 py-1 rounded-full bg-gray-700 text-white">
                                            소요 기간: 단 <span style={{ color: theme }}>{gosuDays}일</span>
                                        </p>
                                    </div>

                                    {/* VS Badge */}
                                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center font-bold text-gray-400 text-sm">
                                        VS
                                    </div>

                                    {/* Academy Result */}
                                    <div className="flex-1 text-center md:text-right opacity-50">
                                        <p className="text-gray-400 text-sm mb-1">일반 운전면허학원</p>
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-300 mb-2">
                                            {formatDate(academyDate)}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-500">
                                            소요 기간: 약 {academyDays}일
                                        </p>
                                    </div>
                                </div>

                                {/* Savings Highlight */}
                                <div
                                    className="bg-gray-900/50 rounded-xl p-6 text-center border mb-6"
                                    style={{ borderColor: `${theme}4d` }}
                                >
                                    <p className="text-lg md:text-xl text-white">
                                        남들보다 <span className="font-bold text-2xl md:text-3xl mx-1" style={{ color: theme }}>{savedDays}일</span> 더 빨리 운전면허를 딸 수 있어요!
                                    </p>
                                </div>

                                {/* CTA */}
                                <button
                                    className="w-full py-4 rounded-xl font-bold text-lg text-brand-black transition-all hover:brightness-110 flex items-center justify-center gap-2"
                                    style={{ backgroundColor: theme }}
                                    onClick={() => {
                                        const element = document.getElementById('offer');
                                        element?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <span>이 날짜에 합격 예약하기</span>
                                    <ArrowRight size={20} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default LicenseDDayCalculator;
