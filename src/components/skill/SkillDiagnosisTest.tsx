"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, ArrowRight } from "lucide-react";
import { landingData } from "@/data/landingData";

const SkillDiagnosisTest = () => {
    const diagnosisData = landingData.skill.diagnosis;
    const theme = landingData.skill.theme || "#3B82F6";

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    if (!diagnosisData) return null;

    const handleOptionSelect = (score: number) => {
        const newScores = [...scores, score];
        setScores(newScores);

        if (currentQuestionIndex < diagnosisData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsAnalyzing(true);
            setTimeout(() => {
                setIsAnalyzing(false);
                setShowResult(true);
            }, 1500);
        }
    };

    const calculateResult = () => {
        const totalScore = scores.reduce((a, b) => a + b, 0);
        return diagnosisData.results.find(
            (result) => totalScore >= result.minScore && totalScore <= result.maxScore
        );
    };

    const result = calculateResult();

    const resetTest = () => {
        setCurrentQuestionIndex(0);
        setScores([]);
        setShowResult(false);
    };

    return (
        <section className="py-20 bg-brand-black relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-hakgyoansim" dangerouslySetInnerHTML={{ __html: diagnosisData.title }}></h2>
                    <p className="text-gray-400 text-lg">{diagnosisData.subtitle}</p>
                </div>

                <div className="max-w-3xl mx-auto bg-gray-900 rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl min-h-[400px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {!showResult && !isAnalyzing && (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm font-bold text-gray-500">
                                            QUESTION {currentQuestionIndex + 1} / {diagnosisData.questions.length}
                                        </span>
                                        <span className="text-sm font-bold" style={{ color: theme }}>
                                            {Math.round(((currentQuestionIndex + 1) / diagnosisData.questions.length) * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${((currentQuestionIndex + 1) / diagnosisData.questions.length) * 100}%`,
                                                backgroundColor: theme
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-8">
                                    {diagnosisData.questions[currentQuestionIndex].question}
                                </h3>

                                <div className="space-y-3">
                                    {diagnosisData.questions[currentQuestionIndex].options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleOptionSelect(option.score)}
                                            className="w-full p-5 rounded-xl text-left font-medium bg-gray-800/50 border border-transparent hover:bg-gray-800 hover:border-gray-600 transition-all text-gray-300 hover:text-white flex justify-between items-center group"
                                        >
                                            <span>{option.text}</span>
                                            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme }} />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {isAnalyzing && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-10"
                            >
                                <RefreshCw className="w-16 h-16 animate-spin mx-auto mb-6" style={{ color: theme }} />
                                <h3 className="text-2xl font-bold text-white mb-2">운전 성향 분석 중...</h3>
                                <p className="text-gray-400">당신의 응답을 바탕으로 최적의 솔루션을 찾고 있습니다.</p>
                            </motion.div>
                        )}

                        {showResult && result && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <p className="text-gray-400 mb-2">당신의 운전 레벨은</p>
                                <h2 className={`text-4xl md:text-5xl font-black mb-6 font-hakgyoansim ${result.color}`}>
                                    {result.level}
                                </h2>

                                <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed break-keep">
                                    {result.description}
                                </p>

                                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 mb-8 inline-block w-full max-w-md">
                                    <p className="text-sm text-gray-500 mb-2 font-bold">AI 추천 솔루션</p>
                                    <p className="text-2xl font-bold text-white">
                                        {result.recommendation}
                                    </p>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => {
                                            const element = document.getElementById('offer');
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:brightness-110 flex items-center justify-center gap-2 shadow-lg"
                                        style={{ backgroundColor: theme }}
                                    >
                                        <span>추천 과정 상담받기</span>
                                        <ArrowRight size={20} />
                                    </button>
                                    <button
                                        onClick={resetTest}
                                        className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
                                    >
                                        다시 테스트하기
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

export default SkillDiagnosisTest;
