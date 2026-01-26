"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Zap, Eye, RefreshCw, AlertTriangle } from "lucide-react";
import { landingData } from "@/data/landingData";

const DriverDNATest = () => {
    const theme = landingData.skill.theme || "#3B82F6";

    // Game States
    const [gameState, setGameState] = useState<'intro' | 'reaction' | 'spatial' | 'judgment' | 'analyzing' | 'result'>('intro');
    const [scores, setScores] = useState({ reaction: 0, spatial: 0, judgment: 0 });

    // Reaction Test State
    const [reactionStatus, setReactionStatus] = useState<'waiting' | 'ready' | 'clicked' | 'too-early'>('waiting');
    const [reactionTime, setReactionTime] = useState(0);
    const startTimeRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Spatial Test State
    const [spatialAnswer, setSpatialAnswer] = useState<string | null>(null);


    // --- REACTION TEST LOGIC ---
    const startReactionTest = () => {
        setGameState('reaction');
        setReactionStatus('waiting');
        const delay = Math.random() * 2000 + 1500; // 1.5s - 3.5s random delay

        timeoutRef.current = setTimeout(() => {
            setReactionStatus('ready');
            startTimeRef.current = Date.now();
        }, delay);
    };

    const handleReactionClick = () => {
        if (reactionStatus === 'waiting') {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setReactionStatus('too-early');
            setTimeout(startReactionTest, 1500); // Retry
        } else if (reactionStatus === 'ready') {
            const time = Date.now() - startTimeRef.current;
            setReactionTime(time);
            setReactionStatus('clicked');
            // Score: <250ms = 100, <350ms = 80, <500ms = 60, else 40
            const score = time < 250 ? 100 : time < 350 ? 80 : time < 500 ? 60 : 40;
            setScores(prev => ({ ...prev, reaction: score }));

            setTimeout(() => setGameState('spatial'), 1500);
        }
    };

    // --- SPATIAL TEST LOGIC ---
    const handleSpatialAnswer = (answer: string) => {
        setSpatialAnswer(answer);
        // Correct answer: "Left" (Turning wheel left moves back to left)
        const score = answer === 'left' ? 100 : 0;
        setScores(prev => ({ ...prev, spatial: score }));

        setTimeout(() => setGameState('judgment'), 1000);
    };

    // --- JUDGMENT TEST LOGIC ---
    const handleJudgmentAnswer = (answer: string) => {
        // Scenario: Yellow light dilemma. Safe stop is best.
        // Options: 'go', 'stop_safe', 'stop_immediate'
        const score = answer === 'stop_safe' ? 100 : answer === 'go' ? 50 : 0; // Stop immediate might be dangerous if rear car exists, but for beginner logic 'stop' is better than 'go'
        setScores(prev => ({ ...prev, judgment: score }));

        setTimeout(() => setGameState('analyzing'), 1000);
    };

    // --- ANALYSIS & RESULT ---
    useEffect(() => {
        if (gameState === 'analyzing') {
            setTimeout(() => setGameState('result'), 2000);
        }
    }, [gameState]);

    const getResultType = () => {
        const total = scores.reaction + scores.spatial + scores.judgment;
        // Max 300. 
        if (total >= 250) return {
            type: "타고난 레이서 (Born Racer)",
            desc: "재능은 충분합니다! 하지만 자만은 금물. '3개월 무제한반'으로 감각을 완벽하게 다듬고, 최단 기간 합격에 도전하세요. 남은 기간은 도로주행 연수까지 미리 대비할 수 있습니다.",
            color: "text-blue-400",
            recommendation: "3개월 합격 무제한반"
        };
        if (scores.spatial >= 80 && scores.judgment >= 80) return {
            type: "논리적인 설계자 (Logic Master)",
            desc: "머리로는 완벽합니다. 이제 몸이 기억할 때까지 반복할 차례입니다. '3개월 무제한반'으로 시간에 쫓기지 말고, 모든 공식을 완벽하게 내 것으로 만드세요.",
            color: "text-green-400",
            recommendation: "3개월 합격 무제한반"
        };
        if (scores.reaction >= 80) return {
            type: "감각적인 파이터 (Sense Fighter)",
            desc: "반응속도는 좋지만, 운전은 안전이 최우선입니다. 사고 걱정 없는 시뮬레이터에서 '3개월 무제한'으로 마음껏 실수하며 거친 습관을 교정하세요.",
            color: "text-yellow-400",
            recommendation: "3개월 합격 무제한반"
        };
        return {
            type: "잠재력 만렙 (Hidden Potential)",
            desc: "아직 운전이 낯설지만 걱정 마세요. '3개월 무제한반'은 합격할 때까지 추가 비용이 0원입니다. 남들보다 조금 느려도, 끝까지 책임지고 합격시켜 드립니다.",
            color: "text-white",
            recommendation: "3개월 합격 무제한반"
        };
    };

    const result = getResultType();

    return (
        <section className="py-20 bg-brand-black relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-hakgyoansim">
                        나의 <span style={{ color: theme }}>운전 DNA</span> 테스트
                    </h2>
                    <p className="text-gray-400 text-lg">
                        나는 운전에 소질이 있을까? 30초 만에 확인해보세요.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-gray-900 rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl min-h-[500px] flex flex-col justify-center relative overflow-hidden">

                    {/* INTRO */}
                    {gameState === 'intro' && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-center space-y-8"
                        >
                            <div className="flex justify-center gap-6 mb-8">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-blue-400">
                                        <Zap size={32} />
                                    </div>
                                    <span className="text-sm text-gray-400">반응속도</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-green-400">
                                        <Brain size={32} />
                                    </div>
                                    <span className="text-sm text-gray-400">공간지각</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-yellow-400">
                                        <Eye size={32} />
                                    </div>
                                    <span className="text-sm text-gray-400">상황판단</span>
                                </div>
                            </div>
                            <button
                                onClick={startReactionTest}
                                className="px-8 py-4 rounded-full font-bold text-xl text-white hover:scale-105 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                style={{ backgroundColor: theme }}
                            >
                                테스트 시작하기
                            </button>
                        </motion.div>
                    )}

                    {/* TEST 1: REACTION */}
                    {gameState === 'reaction' && (
                        <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer" onClick={handleReactionClick}>
                            <h3 className="text-xl text-gray-400 mb-8 absolute top-10">TEST 1. 반응속도</h3>

                            {reactionStatus === 'waiting' && (
                                <div className="text-center">
                                    <div className="w-32 h-32 rounded-full bg-red-600 mb-4 animate-pulse mx-auto shadow-[0_0_30px_rgba(220,38,38,0.3)]"></div>
                                    <p className="text-2xl font-bold text-white">초록불로 바뀌면 클릭하세요!</p>
                                </div>
                            )}
                            {reactionStatus === 'ready' && (
                                <div className="text-center w-full h-full flex flex-col items-center justify-center bg-green-500/10 absolute inset-0">
                                    <div className="w-40 h-40 rounded-full bg-green-500 mb-4 shadow-[0_0_50px_#22c55e] scale-110 transition-transform"></div>
                                    <p className="text-4xl font-black text-white">지금 클릭!!!</p>
                                </div>
                            )}
                            {reactionStatus === 'clicked' && (
                                <div className="text-center">
                                    <p className="text-5xl font-black text-white mb-2">{reactionTime}ms</p>
                                    <p className="text-gray-400">
                                        {reactionTime < 250 ? "프로게이머급 반응속도!" : "나쁘지 않은 속도입니다."}
                                    </p>
                                </div>
                            )}
                            {reactionStatus === 'too-early' && (
                                <div className="text-center">
                                    <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                                    <p className="text-xl font-bold text-white">너무 빨랐어요!</p>
                                    <p className="text-gray-400">다시 시도합니다...</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TEST 2: SPATIAL */}
                    {gameState === 'spatial' && (
                        <div className="w-full flex flex-col items-center">
                            <h3 className="text-xl text-gray-400 mb-8">TEST 2. 공간지각</h3>
                            <div className="bg-gray-800 p-8 rounded-2xl mb-8 w-full max-w-md text-center">
                                <p className="text-lg text-white mb-6 font-bold">
                                    후진 주차 중입니다.<br />
                                    차 엉덩이를 <span className="text-blue-400">왼쪽</span>으로 보내려면<br />
                                    핸들을 어디로 돌려야 할까요?
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => handleSpatialAnswer('left')}
                                        className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${spatialAnswer === 'left' ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-gray-600 hover:border-gray-400 text-gray-300'}`}
                                    >
                                        왼쪽 (Left)
                                    </button>
                                    <button
                                        onClick={() => handleSpatialAnswer('right')}
                                        className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${spatialAnswer === 'right' ? 'border-red-500 bg-red-500/20 text-red-400' : 'border-gray-600 hover:border-gray-400 text-gray-300'}`}
                                    >
                                        오른쪽 (Right)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TEST 3: JUDGMENT */}
                    {gameState === 'judgment' && (
                        <div className="w-full flex flex-col items-center">
                            <h3 className="text-xl text-gray-400 mb-8">TEST 3. 상황판단</h3>
                            <div className="bg-gray-800 p-8 rounded-2xl mb-8 w-full max-w-md text-center">
                                <p className="text-lg text-white mb-6 font-bold">
                                    교차로 진입 직전,<br />
                                    신호가 <span className="text-yellow-400">황색</span>으로 바뀌었습니다.<br />
                                    당신의 선택은?
                                </p>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => handleJudgmentAnswer('go')}
                                        className="w-full py-3 rounded-xl border border-gray-600 hover:bg-gray-700 text-gray-300 transition-all"
                                    >
                                        빠르게 통과한다 (Speed Up)
                                    </button>
                                    <button
                                        onClick={() => handleJudgmentAnswer('stop_safe')}
                                        className="w-full py-3 rounded-xl border border-gray-600 hover:bg-gray-700 text-gray-300 transition-all"
                                    >
                                        정지선에 멈출 수 있으면 멈춘다 (Stop)
                                    </button>
                                    <button
                                        onClick={() => handleJudgmentAnswer('stop_immediate')}
                                        className="w-full py-3 rounded-xl border border-gray-600 hover:bg-gray-700 text-gray-300 transition-all"
                                    >
                                        무조건 급브레이크! (Panic Brake)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ANALYZING */}
                    {gameState === 'analyzing' && (
                        <div className="text-center">
                            <RefreshCw className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-white">운전 DNA 분석 중...</h3>
                            <p className="text-gray-400 mt-2">당신의 잠재력을 계산하고 있습니다.</p>
                        </div>
                    )}

                    {/* RESULT */}
                    {gameState === 'result' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center w-full"
                        >
                            <p className="text-gray-400 mb-2">당신의 운전 DNA 타입은</p>
                            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${result.color} font-hakgyoansim`}>
                                {result.type}
                            </h2>

                            <div className="flex justify-center gap-8 mb-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{scores.reaction}</div>
                                    <div className="text-xs text-gray-500">반응속도</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{scores.spatial}</div>
                                    <div className="text-xs text-gray-500">공간지각</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{scores.judgment}</div>
                                    <div className="text-xs text-gray-500">상황판단</div>
                                </div>
                            </div>

                            <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed break-keep">
                                {result.desc}
                            </p>

                            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 mb-8">
                                <p className="text-sm text-gray-500 mb-2">AI 추천 커리큘럼</p>
                                <p className="text-2xl font-bold text-white" style={{ color: theme }}>
                                    {result.recommendation}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    const element = document.getElementById('offer');
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:brightness-110 flex items-center justify-center gap-2 mx-auto shadow-lg"
                                style={{ backgroundColor: theme }}
                            >
                                <span>상담 예약하고 할인받기</span>
                                <ArrowRight size={20} />
                            </button>

                            <button
                                onClick={() => {
                                    setGameState('intro');
                                    setScores({ reaction: 0, spatial: 0, judgment: 0 });
                                }}
                                className="mt-6 text-gray-500 hover:text-white text-sm underline"
                            >
                                다시 테스트하기
                            </button>
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default DriverDNATest;
