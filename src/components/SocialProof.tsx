"use client";

import React, { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ReviewModal from "@/components/ReviewModal";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

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

const SocialProof = ({ theme = "#FECE48" }: SocialProofProps) => {
    const { siteConfig } = useSiteConfig();
    // Fallback static reviews from siteConfig (used when API fails)
    const STATIC_REVIEWS: Review[] = (siteConfig.fallbackReviews as Review[]) || [];
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
        <LazyMotion features={domAnimation}>
        <section id="reviews" className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-32 md:pb-20 bg-brand-black overflow-hidden">
            <div className="container mx-auto px-4 mb-12 md:mb-20 text-center relative">
                {/* Spotlight Effect Removed */}

                <m.div
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
                            <m.span
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
                            </m.span>
                        </span>
                        가<br className="md:hidden" /> 증명합니다
                    </h2>
                    <m.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-gray-300 text-lg md:text-xl break-keep"
                    >
                        도봉점 실제 수강생들의 <span className="font-bold border-b pb-0.5" style={{ color: theme, borderColor: `${theme}80` }}>생생한 합격 인증</span>
                    </m.p>
                </m.div>

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
                                    alt={review.name ? `${review.name} 후기` : "수강생 후기"}
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
                    href={siteConfig.priceAnchor?.ours?.ctaLink?.replace('/ticket', '/review') || "https://pcmap.place.naver.com/place/38729351/review"}
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
        </LazyMotion>
    );
};

export default SocialProof;
