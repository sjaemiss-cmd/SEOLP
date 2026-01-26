"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ReviewModal from "@/components/ReviewModal";

interface SocialProofProps {
    theme?: string;
}

interface Review {
    id: number;
    image: string;
    text: string;
    name: string;
    date?: string;
}

// Fallback static reviews (used when API fails)
const STATIC_REVIEWS: Review[] = [
        {
            id: 0,
            image: "https://gosudriving.com/data/files/54cc00e6732898f04cf10407e5063c83.jpg",
            text: "정말 너무 친절하시고 세세하게 알려주십니다!어려웠던 부분도 강사님들 덕분에 다시 이해하고시험 합격할 수 있었습니다 ㅎㅎ가성비 대비해서 정말 강추드립니다시뮬로도 충분히 면허합격 가능합니다!",
            name: "이*준",
            date: ""
        },
        {
            id: 1,
            image: "https://gosudriving.com/data/files/3b70da72807195e67dd4f61e22b0c5d1.jpg",
            text: "전에 했던 경험이 있는 채로 왔었는데, 잘 상기시켜주셔서 일주일 조금 넘게 지나 합격까지 했습니다! 면허시험장과 너무 가까워서 좋고 모르는 점이나 헷갈리는 점도 잘 알려주셔서 편하게 합격할 수 있던것 같아요!",
            name: "김*하",
            date: ""
        },
        {
            id: 2,
            image: "https://gosudriving.com/data/files/99196b4682b37e1fbb5d91dd50b6eec1.jpg",
            text: "면허 땄어요. 기분이 너무 좋네요",
            name: "김*화",
            date: ""
        },
        {
            id: 3,
            image: "https://gosudriving.com/data/files/9bff5922d928a1d43c9e49f0130657e3.jpg",
            text: "친절한 강사님 덕분에 빠르게 면허 딸 수 있었습니다!! 정말 좋으니까 와보시는 거 추천드려요!!",
            name: "김*윤",
            date: ""
        },
        {
            id: 4,
            image: "https://gosudriving.com/data/files/ac2a02a5810d8428e0257c14c67f8ccd.jpg",
            text: "선생님의 좋은 지도 덕분에 면허 합격했습니다 !!! 면허 합격 이후에도 주차 알려주셔서 너무 좋은 것 같아요! 그동안 감사했습니다~~~",
            name: "박*현",
            date: ""
        },
        {
            id: 5,
            image: "https://gosudriving.com/data/files/a3fb1491e02bc3b049fcaed792ad14ac.webp",
            text: "운전이 무서우면 고수운전학원 2주면 합격 50대후반 합격햇네요 화이팅감사합니다",
            name: "서*원",
            date: ""
        },
        {
            id: 6,
            image: "https://gosudriving.com/data/files/89dde8c23f9dfba95b2de557e7840afd.jpg",
            text: "시뮬레이션이 실제로 차로 운전하는거랑 비슷해요! 브레이크 감도 바꿀수 있는점도 너무 좋고 코스 그대로 나와있어서 익히기 좋아요! 선생님들도 다 친절하시고 설명 잘하십니다 추천해요!!",
            name: "김*아",
            date: ""
        },
        {
            id: 7,
            image: "https://gosudriving.com/data/files/6a7f68077417836a0690f3c82c8b0dd7.jpg",
            text: "시뮬레이션으로도 충분히 실제 차랑 비슷해서 연습하기 좋았습니다. 덕분에 기능 도로주행 둘 다 한 번에 합격했어요! 감사합니다☺️❤️",
            name: "이*혜",
            date: ""
        }
    ];

const SocialProof = ({ theme = "#FECE48" }: SocialProofProps) => {
    const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/reviews');
                const data = await response.json();

                if (data.success && data.reviews && data.reviews.length > 0) {
                    setReviews(data.reviews);
                    setError(null);
                } else {
                    // Use fallback data if API returns no reviews
                    console.warn('No reviews from API, using fallback data');
                    setReviews(STATIC_REVIEWS);
                }
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
                setError('리뷰를 불러오는데 실패했습니다. 기본 리뷰를 표시합니다.');
                // Keep using static reviews on error
                setReviews(STATIC_REVIEWS);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // Auto-scroll logic
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || isLoading) return;

        let animationFrameId: number;
        const scrollSpeed = 1; // Pixels per frame

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                scrollContainer.scrollLeft += scrollSpeed;

                // Infinite scroll reset
                // We assume the content is duplicated (reviews + reviews)
                // When we reach halfway (end of first set), reset to 0
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, isLoading, reviews]);

    return (
        <section id="reviews" className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-20 bg-brand-black overflow-hidden">
            <div className="container mx-auto px-4 mb-12 md:mb-20 text-center relative">
                {/* Spotlight Effect Removed */}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative z-10"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 break-keep tracking-tight leading-tight font-hakgyoansim">
                        이미{" "}
                        <span className="relative inline-block">
                            {/* Glow behind text */}
                            <span
                                className="absolute inset-0 blur-2xl rounded-full"
                                style={{ backgroundColor: `${theme}4d` }} // 30% opacity
                            ></span>
                            <motion.span
                                className="relative text-transparent bg-clip-text text-4xl md:text-6xl"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${theme}, #ffffff, ${theme})`,
                                    backgroundSize: '200% auto',
                                    textShadow: `0 0 20px ${theme}4d`
                                }}
                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                수많은 합격자
                            </motion.span>
                        </span>
                        가<br className="md:hidden" /> 증명합니다
                    </h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-gray-300 text-lg md:text-xl break-keep"
                    >
                        도봉점 실제 수강생들의 <span className="font-bold border-b pb-0.5" style={{ color: theme, borderColor: `${theme}80` }}>생생한 합격 인증</span>
                    </motion.p>
                </motion.div>

                {error && (
                    <p className="text-gray-500 text-sm mt-4 relative z-10">
                        {error}
                    </p>
                )}
            </div>

            <div className="relative flex w-full mb-12">
                {isLoading ? (
                    // Loading skeleton
                    <div className="flex gap-6 whitespace-nowrap overflow-hidden px-4">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="w-64 h-80 md:w-80 md:h-96 flex-shrink-0 bg-gray-800 rounded-xl overflow-hidden animate-pulse"
                            >
                                <div className="w-full h-full bg-gray-700"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Swipeable Reviews
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto no-scrollbar px-4 pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        {/* Duplicate reviews for infinite scroll effect */}
                        {[...reviews, ...reviews, ...reviews].map((review, index) => (
                            <div
                                key={`${review.id}-${index}`}
                                onClick={() => setSelectedReview(review)}
                                className="w-64 h-80 md:w-80 md:h-96 flex-shrink-0 bg-gray-800 rounded-xl overflow-hidden relative group cursor-pointer border border-transparent transition-all duration-300 snap-center"
                                style={{ borderColor: 'transparent' }}
                            >
                                <div
                                    className="absolute inset-0 border border-transparent group-hover:border-current transition-colors duration-300 rounded-xl pointer-events-none z-20"
                                    style={{ color: `${theme}80` }}
                                ></div>

                                <Image
                                    src={review.image}
                                    alt={review.text}
                                    fill
                                    sizes="(max-width: 768px) 256px, 320px"
                                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                    draggable={false}
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="font-bold text-sm" style={{ color: theme }}>{review.name}</span>
                                        <span className="text-gray-400 text-xs">{review.date}</span>
                                    </div>
                                    <p className="text-white text-sm font-medium line-clamp-2">{review.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="text-center">
                <a
                    href="https://pcmap.place.naver.com/place/38729351/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-transparent border-2 px-8 py-3 rounded-full font-bold transition-all duration-300"
                    style={{
                        borderColor: theme,
                        color: theme,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme;
                        e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = theme;
                    }}
                >
                    더 많은 생생한 후기 보러가기 <ArrowRight size={20} />
                </a>
            </div>

            <AnimatePresence>
                {selectedReview && (
                    <ReviewModal
                        review={selectedReview}
                        onClose={() => setSelectedReview(null)}
                        theme={theme}
                    />
                )}
            </AnimatePresence>
        </section >
    );
};

export default SocialProof;
