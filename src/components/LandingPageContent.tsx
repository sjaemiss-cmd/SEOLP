"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { landingData } from "@/data/landingData";

// Dynamic Imports - Core Components
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const Hero = dynamic(() => import("@/components/Hero"));
const CostCalculator = dynamic(() => import("@/components/CostCalculator"), { ssr: false });
const USP = dynamic(() => import("@/components/USP"), { ssr: false });
const Curriculum = dynamic(() => import("@/components/Curriculum"));
const Offer = dynamic(() => import("@/components/Offer"));

// Shared Components
const SocialProof = dynamic(() => import("@/components/SocialProof"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const LocationSection = dynamic(() => import("@/components/LocationSection"));
const NewYearEvent = dynamic(() => import("@/components/NewYearEvent"));
const Footer = dynamic(() => import("@/components/Footer"));
const FloatingCTA = dynamic(() => import("@/components/FloatingCTA"), { ssr: false });

// Speed Components
const SpeedHero = dynamic(() => import("@/components/speed/SpeedHero"));
const SpeedProblem = dynamic(() => import("@/components/speed/SpeedProblem"));
const SpeedCurriculum = dynamic(() => import("@/components/speed/SpeedCurriculum"));
const SpeedCTA = dynamic(() => import("@/components/speed/SpeedCTA"));
const SpeedStory = dynamic(() => import("@/components/speed/SpeedStory"), { ssr: false });
const LicenseDDayCalculator = dynamic(() => import("@/components/speed/LicenseDDayCalculator"), { ssr: false });

// Skill Components
const SkillHero = dynamic(() => import("@/components/skill/SkillHero"));
const SkillProblem = dynamic(() => import("@/components/skill/SkillProblem"));
const SkillCurriculum = dynamic(() => import("@/components/skill/SkillCurriculum"));
const SkillCTA = dynamic(() => import("@/components/skill/SkillCTA"));
const DriverDNATest = dynamic(() => import("@/components/skill/DriverDNATest"), { ssr: false });

// Phobia Components
const PhobiaHero = dynamic(() => import("@/components/phobia/PhobiaHero"), { ssr: false });
const PhobiaProblem = dynamic(() => import("@/components/phobia/PhobiaProblem"), { ssr: false });
const PhobiaCurriculum = dynamic(() => import("@/components/phobia/PhobiaCurriculum"), { ssr: false });
const PhobiaCTA = dynamic(() => import("@/components/phobia/PhobiaCTA"), { ssr: false });
const AnxietyReliefPrescription = dynamic(() => import("@/components/phobia/AnxietyReliefPrescription"), { ssr: false });

// Practice Components
const PracticeHero = dynamic(() => import("@/components/practice/PracticeHero"), { ssr: false });
const PracticeProblem = dynamic(() => import("@/components/practice/PracticeProblem"), { ssr: false });
const PracticeCurriculum = dynamic(() => import("@/components/practice/PracticeCurriculum"), { ssr: false });
const PracticeCTA = dynamic(() => import("@/components/practice/PracticeCTA"), { ssr: false });
const CurriculumBuilder = dynamic(() => import("@/components/practice/CurriculumBuilder"), { ssr: false });

/**
 * 랜딩 페이지 콘텐츠 컴포넌트
 * URL 파라미터에 따라 다른 컨텐츠를 렌더링
 * 클라이언트 컴포넌트 (useSearchParams, useScroll 사용)
 */
function LandingPageContent() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "cost";
    const content = landingData[type] || landingData["cost"];
    const theme = content.theme || "#FECE48";

    return (
        <main className="min-h-screen bg-brand-black font-sans text-white selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden relative">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 origin-left z-[100]"
                style={{ scaleX, backgroundColor: theme }}
            />

            <div className="relative z-10">
                <Header />


                {type === 'speed' ? (
                    // Speed Layout
                    <>
                        <SpeedHero />
                        <LicenseDDayCalculator />
                        <SpeedProblem />
                        <SpeedStory />
                        <SpeedCurriculum />
                        <SpeedCTA />
                    </>
                ) : type === 'skill' ? (
                    // Skill Layout
                    <>
                        <SkillHero />
                        <DriverDNATest />
                        <SkillProblem />
                        <SkillCurriculum />
                        <SkillCTA />
                    </>
                ) : type === 'phobia' ? (
                    // Phobia Layout
                    <>
                        <PhobiaHero />
                        <AnxietyReliefPrescription />
                        <PhobiaProblem />
                        <PhobiaCurriculum />
                        <PhobiaCTA />
                    </>
                ) : type === 'practice' ? (
                    // Practice Layout
                    <>
                        <PracticeHero />
                        <CurriculumBuilder />
                        <PracticeProblem />
                        <PracticeCurriculum />
                        <PracticeCTA />
                    </>
                ) : (
                    // Default / Cost Layout
                    <>
                        <Hero data={content.hero} theme={theme} />
                        {/* Only show CostCalculator for 'cost' type or if it's the default */}
                        {type === 'cost' && <CostCalculator />}

                        <USP data={content.problem} theme={theme} />

                        {/* Dynamic Sections */}
                        <Curriculum
                            title={content.curriculum.title}
                            steps={content.curriculum.steps}
                            theme={theme}
                        />
                        <Offer
                            offer={content.offer}
                            theme={theme}
                        />
                    </>
                )}

                {/* Shared Sections */}
                <SocialProof theme={theme} />
                <LocationSection theme={theme} />
                <NewYearEvent theme={theme} />
                <FAQ theme={theme} />
                <Footer theme={theme} />
                <FloatingCTA theme={theme} />
            </div>
        </main>
    );
}

export default LandingPageContent;
