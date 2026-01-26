"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, RefreshCw, ArrowRight, ShieldCheck } from "lucide-react";
import { landingData } from "@/data/landingData";

const triggers = [
    { id: "truck", label: "큰 트럭이나 버스가 옆에 지나갈 때" },
    { id: "honk", label: "좁은 골목길을 지나갈 때" },
    { id: "merge", label: "끼어들기(차선 변경)를 해야 할 때" },
    { id: "speed", label: "고속도로 등 빠른 속도로 달릴 때" },
    { id: "night", label: "구불구불한 커브길이 연속될 때" },
    { id: "accident", label: "과거 사고 경험이 떠오를 때" }
];

const AnxietyReliefPrescription = () => {
    const theme = landingData.phobia.theme;
    const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
    const [showPrescription, setShowPrescription] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const toggleTrigger = (id: string) => {
        if (selectedTriggers.includes(id)) {
            setSelectedTriggers(selectedTriggers.filter(t => t !== id));
        } else {
            setSelectedTriggers([...selectedTriggers, id]);
        }
    };

    const generatePrescription = () => {
        if (selectedTriggers.length === 0) return;

        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowPrescription(true);
        }, 1500);
    };

    return (
        <section className="py-20 bg-brand-black relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-hakgyoansim">
                        운전 <span style={{ color: theme }}>불안감 처방전</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        무엇이 가장 두려우신가요? 솔직하게 체크해보세요.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        {!showPrescription && !isProcessing ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-gray-900 rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {triggers.map((trigger) => (
                                        <div
                                            key={trigger.id}
                                            onClick={() => toggleTrigger(trigger.id)}
                                            className={`cursor-pointer p-5 rounded-xl border transition-all flex items-center gap-4 ${selectedTriggers.includes(trigger.id)
                                                ? "bg-gray-800 border-opacity-100"
                                                : "bg-gray-800/30 border-transparent hover:bg-gray-800/50"
                                                }`}
                                            style={{
                                                borderColor: selectedTriggers.includes(trigger.id) ? theme : "transparent"
                                            }}
                                        >
                                            <div
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedTriggers.includes(trigger.id)
                                                    ? "bg-transparent"
                                                    : "border-gray-600"
                                                    }`}
                                                style={{
                                                    borderColor: selectedTriggers.includes(trigger.id) ? theme : undefined
                                                }}
                                            >
                                                {selectedTriggers.includes(trigger.id) && (
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme }} />
                                                )}
                                            </div>
                                            <span className={`font-medium ${selectedTriggers.includes(trigger.id) ? "text-white" : "text-gray-400"}`}>
                                                {trigger.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={generatePrescription}
                                    disabled={selectedTriggers.length === 0}
                                    className={`w-full py-5 rounded-xl font-bold text-xl transition-all flex items-center justify-center gap-2 ${selectedTriggers.length > 0
                                        ? "text-brand-black hover:brightness-110 shadow-lg"
                                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                                        }`}
                                    style={{
                                        backgroundColor: selectedTriggers.length > 0 ? theme : undefined
                                    }}
                                >
                                    {selectedTriggers.length > 0 ? (
                                        <>
                                            <span>맞춤 처방전 발급받기</span>
                                            <FileText size={20} />
                                        </>
                                    ) : (
                                        <span>항목을 선택해주세요</span>
                                    )}
                                </button>
                            </motion.div>
                        ) : isProcessing ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-gray-900 rounded-3xl border border-gray-800 p-20 text-center shadow-2xl"
                            >
                                <div className="inline-block w-16 h-16 border-4 border-gray-700 border-t-transparent rounded-full animate-spin mb-6" style={{ borderTopColor: theme }}></div>
                                <h3 className="text-2xl font-bold text-white mb-2">불안 요소를 분석 중입니다...</h3>
                                <p className="text-gray-400">심리적 안정을 위한 최적의 솔루션을 준비하고 있어요.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#fff9f0] text-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative max-w-2xl mx-auto transform rotate-1"
                            >
                                {/* Paper Texture Effect */}
                                <div className="absolute top-0 left-0 w-full h-8 bg-[#e6e0d6] rounded-t-3xl opacity-50"></div>
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900/20"></div>

                                <div className="text-center mb-8 pt-4">
                                    <h3 className="text-3xl font-bold text-gray-900 mb-2 font-hakgyoansim border-b-2 border-gray-900 inline-block pb-1">
                                        고수의 운전 처방전
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-2">Date: {new Date().toLocaleDateString()}</p>
                                </div>

                                <div className="space-y-6 mb-10">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                            <ShieldCheck className="text-gray-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900 mb-1">안전 시뮬레이터 처방</h4>
                                            <p className="text-gray-600 leading-relaxed">
                                                현장감 넘치는 안전한 시뮬레이터로, 무제한 반복연습이 가능합니다. 사고 걱정은 내려놓으세요.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                            <RefreshCw className="text-gray-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900 mb-1">반복 노출 요법</h4>
                                            <p className="text-gray-600 leading-relaxed">
                                                가장 두려워하는 상황(끼어들기, 고속주행 등)을 시뮬레이터로 무한 반복 연습하여, 몸이 기억하는 자신감을 만들어드립니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
                                    <p className="text-sm text-gray-500 mb-1 font-bold">추천 프로그램</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        장롱면허 탈출 24시간 완성반
                                    </p>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <button
                                        onClick={() => {
                                            const element = document.getElementById('offer');
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="flex-1 py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all hover:brightness-110 flex items-center justify-center gap-2 bg-gray-900"
                                    >
                                        <span>처방전대로 시작하기</span>
                                        <ArrowRight size={20} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowPrescription(false);
                                            setSelectedTriggers([]);
                                        }}
                                        className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors"
                                    >
                                        다시하기
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default AnxietyReliefPrescription;
