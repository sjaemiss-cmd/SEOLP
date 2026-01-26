"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Award, GraduationCap, Target } from "lucide-react";

import { m, LazyMotion, domAnimation } from "framer-motion";

interface ProgramTeaserProps {
    slug: string;
}

const ProgramTeaser = ({ slug }: ProgramTeaserProps) => {
    const programs = [
        {
            id: "speed",
            title: "빠른 취득이 필요하신 분",
            description: "시간이 금인 분들을 위한\n초단기 면허 취득 코스",
            icon: Clock,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-500/20",
            hoverBorder: "hover:border-red-500",
            link: `/locations/${slug}/speed`,
            badge: "가장 빠름",
            image: "/images/program_teaser/card_speed_bg.webp"
        },
        {
            id: "skill",
            title: "합격 공식반",
            description: "감으로 하는 운전은 그만!\n공식으로 배우는 확실한 합격",
            icon: GraduationCap,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            hoverBorder: "hover:border-blue-500",
            link: `/locations/${slug}/skill`,
            badge: "합격 보장",
            image: "/images/program_teaser/card_skill_bg.webp"
        },
        {
            id: "cost",
            title: "가성비 합격반",
            description: "학원비 절반 가격으로\n합격할 때까지 무제한",
            icon: Award,
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/10",
            borderColor: "border-yellow-500/20",
            hoverBorder: "hover:border-yellow-400",
            link: `/locations/${slug}/cost`,
            badge: "BEST",
            image: "/images/program_teaser/card_cost_bg.webp"
        },
        {
            id: "phobia",
            title: "장롱면허 탈출반",
            description: "운전이 두려운 분들을 위한\n심리 케어 & 안전 연수",
            icon: ShieldCheck,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/20",
            hoverBorder: "hover:border-green-500",
            link: `/locations/${slug}/phobia`,
            badge: "만족도 1위",
            image: "/images/program_teaser/card_phobia_bg.webp"
        },
        {
            id: "practice",
            title: "운전 연습장",
            description: "주차, 차선변경 등\n부족한 점만 골라 연습",
            icon: Target,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20",
            hoverBorder: "hover:border-purple-500",
            link: `/locations/${slug}/practice`,
            badge: "핀셋 과외",
            image: "/images/program_teaser/card_practice_bg.webp"
        }
    ];

    return (
        <LazyMotion features={domAnimation}>
            <section className="py-20 bg-brand-black relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-hakgyoansim">
                            나에게 딱 맞는 <span className="text-brand-yellow">코스 찾기</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            현재 상황과 목표에 맞춰 최적의 커리큘럼을 선택하세요.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
                        {programs.map((program, index) => (
                            <Link href={program.link} key={program.id} className="block group w-full md:w-[calc(33.333%-1rem)] lg:w-[calc(30%-1rem)] min-w-[300px]">
                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`h-[400px] rounded-3xl p-8 border ${program.borderColor} ${program.hoverBorder} bg-gray-900/50 transition-all duration-300 group-hover:-translate-y-2 relative overflow-hidden flex flex-col justify-end`}
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={program.image}
                                            alt={program.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-105 transform"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                                    </div>

                                    <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl text-xs font-bold ${program.bgColor} ${program.color} z-20`}>
                                        {program.badge}
                                    </div>

                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${program.bgColor} backdrop-blur-sm`}>
                                            <program.icon className={`w-8 h-8 ${program.color}`} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 font-hakgyoansim">
                                            {program.title}
                                        </h3>

                                        <p className="text-gray-300 mb-8 whitespace-pre-line leading-relaxed text-sm font-medium">
                                            {program.description}
                                        </p>

                                        <div className={`flex items-center font-bold ${program.color} group-hover:gap-2 transition-all duration-300`}>
                                            <span>자세히 보기</span>
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </div>
                                    </div>
                                </m.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
};

export default ProgramTeaser;
