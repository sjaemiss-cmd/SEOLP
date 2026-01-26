"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const RollingNumber = ({ value }: { value: number }) => {
    const springValue = useSpring(value, { stiffness: 100, damping: 20 });
    const displayValue = useTransform(springValue, (current) => Math.round(current).toLocaleString());
    const color = useTransform(springValue, [550000, 440000], ["#FECE48", "#22C55E"]);

    useEffect(() => {
        springValue.set(value);
    }, [value, springValue]);

    return (
        <motion.span style={{ color }} className="flex items-center gap-1">
            <motion.span>{displayValue}</motion.span>
            <span className="text-2xl md:text-3xl">원</span>
        </motion.span>
    );
};

const StudentEvent = () => {
    const [checkedItems, setCheckedItems] = useState({
        exam: false,
        friend: false,
        insta: false
    });

    const basePrice = 550000;
    const discounts = { exam: 10, friend: 5, insta: 5 };

    const totalDiscount =
        (checkedItems.exam ? discounts.exam : 0) +
        (checkedItems.friend ? discounts.friend : 0) +
        (checkedItems.insta ? discounts.insta : 0);

    const finalPrice = basePrice * (1 - totalDiscount / 100);

    const handleCheckboxChange = (key: keyof typeof checkedItems) => {
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <section id="event" className="py-12 md:py-20 bg-gradient-to-b from-brand-black to-gray-900 border-y border-gray-800">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto bg-gray-800 rounded-3xl p-6 md:p-12 border-2 border-brand-yellow shadow-[0_0_30px_rgba(254,206,72,0.15)] relative overflow-hidden"
                >
                    {/* Badge */}
                    <div className="absolute top-0 right-0 bg-status-red text-white font-bold px-6 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-bl-2xl shadow-lg animate-pulse z-10">
                        마감 임박!
                    </div>

                    <div className="mb-8">
                        <span className="inline-block bg-brand-yellow text-brand-black font-bold px-4 py-1 rounded-full mb-4">
                            수험생 특별 혜택
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 break-keep font-hakgyoansim">
                            수험표만 있으면 <br className="md:hidden" /><span className="text-brand-yellow">최대 20% 할인</span>
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl break-keep">
                            대학 입학 전, 가장 저렴하게 운전면허를 취득할 수 있는 마지막 기회입니다.
                        </p>
                    </div>

                    {/* Interactive Discount Calculator */}
                    <div className="bg-black/30 rounded-xl p-6 md:p-8 mb-8 max-w-2xl mx-auto border border-brand-yellow/30 backdrop-blur-sm">
                        <div className="text-center mb-6">
                            <p className="text-brand-yellow font-bold text-lg mb-2">💰 나의 할인가 확인하기</p>
                            <p className="text-gray-400 text-sm">체크할수록 더 저렴해집니다!</p>
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-4 mb-8">
                            {[
                                { id: 'exam', label: '수험표 소지', required: true },
                                { id: 'friend', label: '친구와 함께 등록', required: false },
                                { id: 'insta', label: '인스타 공유', required: false }
                            ].map((item) => (
                                <div key={item.id} className="flex flex-wrap items-center justify-between bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => handleCheckboxChange(item.id as keyof typeof checkedItems)}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${checkedItems[item.id as keyof typeof checkedItems] ? 'bg-brand-yellow border-brand-yellow' : 'border-gray-500'}`}>
                                            {checkedItems[item.id as keyof typeof checkedItems] && <Check size={16} className="text-black" />}
                                        </div>
                                        <span className="text-white font-medium whitespace-nowrap">{item.label}</span>
                                    </div>
                                    <span className="text-brand-yellow font-bold whitespace-nowrap ml-auto">
                                        {item.id === 'exam' ? '-55,000원' : '-27,500원'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Price Display */}
                        <div className="flex flex-col items-center justify-center p-6 bg-brand-black/50 rounded-xl border border-gray-700">
                            <div className="text-gray-400 text-sm mb-1">예상 수강료 (VAT 포함)</div>
                            <div className="flex items-baseline gap-2">
                                <div className="text-4xl md:text-5xl font-black flex items-center gap-1 justify-center">
                                    <RollingNumber value={finalPrice} />
                                </div>
                            </div>
                            <div className="mt-2 text-status-red font-bold text-sm bg-status-red/10 px-3 py-1 rounded-full">
                                총 {totalDiscount}% 할인 적용 중
                            </div>
                        </div>
                    </div>

                    <motion.a
                        href="https://pcmap.place.naver.com/place/38729351/ticket"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-yellow-400 transition-colors relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            무료 상담 후 할인받기 <ArrowRight size={24} />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default StudentEvent;
