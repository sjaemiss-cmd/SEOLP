"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Car, Clock, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { landingData } from "@/data/landingData";

const experienceLevels = [
    { id: "paper", label: "면허 따고 운전대 처음 잡아요 (장롱면허)", hours: 20 },
    { id: "novice", label: "가끔 운전해봤지만 아직 무서워요", hours: 15 },
    { id: "rusty", label: "예전엔 했는데 감을 다 잃었어요", hours: 10 },
    { id: "specific", label: "특정 부분만 집중 연습하고 싶어요", hours: 6 }
];

const goals = [
    { id: "parking", label: "주차 (후진/평행)", icon: <Car size={20} /> },
    { id: "lane", label: "차선 변경 & 끼어들기", icon: <ArrowRight size={20} /> },
    { id: "narrow", label: "골목길 & 코너링", icon: <Map size={20} /> },
    { id: "highway", label: "고속도로 & 간선도로", icon: <Clock size={20} /> }
];

const CurriculumBuilder = () => {
    const theme = landingData.practice?.theme || "#22C55E"; // Default to green if not found
    const [step, setStep] = useState(1);
    const [selectedExp, setSelectedExp] = useState<string | null>(null);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleExpSelect = (id: string) => {
        setSelectedExp(id);
        setTimeout(() => setStep(2), 300);
    };

    const toggleGoal = (id: string) => {
        if (selectedGoals.includes(id)) {
            setSelectedGoals(selectedGoals.filter(g => g !== id));
        } else {
            setSelectedGoals([...selectedGoals, id]);
        }
    };

    const calculateCurriculum = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
            setShowResult(true);
        }, 1500);
    };

    const getRecommendation = () => {
        const exp = experienceLevels.find(e => e.id === selectedExp);
        const baseHours = exp?.hours || 10;
        // Add 1 hour for each extra goal if more than 2 selected
        const extraHours = Math.max(0, selectedGoals.length - 2);
        const totalHours = baseHours + extraHours;

        return {
            totalHours,
            planName: totalHours > 12 ? "장롱면허 탈출 24시간 완성반" : "속성 12시간 마스터반",
            features: selectedGoals.map(g => goals.find(goal => goal.id === g)?.label).filter(Boolean)
        };
    };

    const result = showResult ? getRecommendation() : null;

    return (
        <section className="py-20 bg-brand-black relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-hakgyoansim">
                        나만의<br></br><span style={{ color: theme }}>운전 연수 커리큘럼</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        내 수준과 목표에 맞춰<br></br> 최적의 연습 계획을 짜드립니다.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-gray-900 rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl min-h-[450px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {step === 1 && !showResult && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-sm" style={{ color: theme, border: `1px solid ${theme}` }}>1</span>
                                    현재 운전 실력은 어떠신가요?
                                </h3>
                                <div className="space-y-3">
                                    {experienceLevels.map((exp) => (
                                        <button
                                            key={exp.id}
                                            onClick={() => handleExpSelect(exp.id)}
                                            className={`w-full p-5 rounded-xl text-left font-medium transition-all flex items-center justify-between group ${selectedExp === exp.id
                                                ? "bg-gray-800 border-opacity-100"
                                                : "bg-gray-800/50 border border-transparent hover:bg-gray-800 hover:border-gray-600"
                                                }`}
                                            style={{ borderColor: selectedExp === exp.id ? theme : undefined }}
                                        >
                                            <span className={selectedExp === exp.id ? "text-white" : "text-gray-300"}>{exp.label}</span>
                                            <ArrowRight size={20} className={`transition-opacity ${selectedExp === exp.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} style={{ color: theme }} />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && !showResult && !isCalculating && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-sm" style={{ color: theme, border: `1px solid ${theme}` }}>2</span>
                                    집중적으로 연습하고 싶은 부분은? (중복 선택 가능)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {goals.map((goal) => (
                                        <div
                                            key={goal.id}
                                            onClick={() => toggleGoal(goal.id)}
                                            className={`cursor-pointer p-5 rounded-xl border transition-all flex items-center gap-3 ${selectedGoals.includes(goal.id)
                                                ? "bg-gray-800"
                                                : "bg-gray-800/30 border-transparent hover:bg-gray-800/50"
                                                }`}
                                            style={{ borderColor: selectedGoals.includes(goal.id) ? theme : "transparent" }}
                                        >
                                            <div className={`${selectedGoals.includes(goal.id) ? "text-white" : "text-gray-500"}`} style={{ color: selectedGoals.includes(goal.id) ? theme : undefined }}>
                                                {goal.icon}
                                            </div>
                                            <span className={`font-medium ${selectedGoals.includes(goal.id) ? "text-white" : "text-gray-400"}`}>
                                                {goal.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-6 py-4 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                    >
                                        이전
                                    </button>
                                    <button
                                        onClick={calculateCurriculum}
                                        disabled={selectedGoals.length === 0}
                                        className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all flex items-center justify-center gap-2 ${selectedGoals.length > 0
                                            ? "text-brand-black hover:brightness-110 shadow-lg"
                                            : "bg-gray-800 text-gray-500 cursor-not-allowed"
                                            }`}
                                        style={{ backgroundColor: selectedGoals.length > 0 ? theme : undefined }}
                                    >
                                        커리큘럼 생성하기
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {isCalculating && (
                            <motion.div
                                key="calculating"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-10"
                            >
                                <div className="inline-block w-16 h-16 border-4 border-gray-700 border-t-transparent rounded-full animate-spin mb-6" style={{ borderTopColor: theme }}></div>
                                <h3 className="text-2xl font-bold text-white mb-2">맞춤 커리큘럼 설계 중...</h3>
                                <p className="text-gray-400">강사님 매칭 및 최적의 코스를 분석하고 있습니다.</p>
                            </motion.div>
                        )}

                        {showResult && result && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className="mb-2 text-sm font-bold tracking-wider uppercase" style={{ color: theme }}>Recommendation</div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-hakgyoansim">
                                    고객님께 딱 맞는 <br />
                                    <span style={{ color: theme }}>{`'${result.planName}'`}</span>을 추천해요!
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                                    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Calendar className="text-gray-400" size={24} />
                                            <span className="text-gray-300 font-bold">권장 교육 시간</span>
                                        </div>
                                        <div className="text-3xl font-bold text-white">
                                            총 <span style={{ color: theme }}>{result.totalHours}시간</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">하루 2시간씩 {Math.ceil(result.totalHours / 2)}일 완성</p>
                                    </div>

                                    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                                        <div className="flex items-center gap-3 mb-4">
                                            <CheckCircle2 className="text-gray-400" size={24} />
                                            <span className="text-gray-300 font-bold">중점 교육 항목</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {result.features.map((feature, idx) => (
                                                <span key={idx} className="bg-gray-700 text-white text-sm px-3 py-1 rounded-full">
                                                    {feature}
                                                </span>
                                            ))}
                                            <span className="bg-gray-700 text-white text-sm px-3 py-1 rounded-full">
                                                + 기초 주행
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        const element = document.getElementById('offer');
                                        element?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full md:w-auto px-10 py-4 rounded-xl font-bold text-lg text-brand-black transition-all hover:brightness-110 flex items-center justify-center gap-2 mx-auto shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                                    style={{ backgroundColor: theme }}
                                >
                                    <span>이 커리큘럼으로 상담받기</span>
                                    <ArrowRight size={20} />
                                </button>

                                <button
                                    onClick={() => {
                                        setShowResult(false);
                                        setStep(1);
                                        setSelectedExp(null);
                                        setSelectedGoals([]);
                                    }}
                                    className="mt-6 text-gray-500 hover:text-white text-sm underline underline-offset-4"
                                >
                                    다시 설계하기
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CurriculumBuilder;
