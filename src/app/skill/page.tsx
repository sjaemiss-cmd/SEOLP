import React from "react";
import { landingData } from "@/data/landingData";
import { siteConfig } from "@/data/siteConfig";
import { JSONLDScript, generateFAQSchema } from "@/lib/structuredData";

// Components
import Header from "@/components/Header";

import SkillHero from "@/components/skill/SkillHero";
import SkillDiagnosisTest from "@/components/skill/SkillDiagnosisTest";
import SkillProblem from "@/components/skill/SkillProblem";
import SkillCurriculum from "@/components/skill/SkillCurriculum";
import SkillCTA from "@/components/skill/SkillCTA";

// Shared Components
import SocialProof from "@/components/SocialProof";
import LocationSection from "@/components/LocationSection";
import NewYearEvent from "@/components/NewYearEvent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata = {
    title: "고수의 운전면허 - Skill 공식 완성",
    description: "운전면허 기능시험, 도로주행 공식 완벽 분석. 합격 공식을 전수해드립니다.",
    alternates: {
        canonical: "https://dobong.gosudriving.com/skill",
    },
    openGraph: {
        url: "https://dobong.gosudriving.com/skill",
        images: [
            {
                url: "https://dobong.gosudriving.com/logo-black.webp",
                width: 800,
                height: 600,
                alt: "고수의 운전면허 Skill 코스",
            },
        ],
    },
};

export default function SkillPage() {
    const theme = landingData.skill.theme;

    return (
        <main className="min-h-screen bg-brand-black font-sans text-white selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden relative">
            <JSONLDScript schema={generateFAQSchema(siteConfig.faq.items)} />
            <div className="relative z-10">
                <Header />


                <SkillHero />
                <SkillDiagnosisTest />
                <SkillProblem />
                <SkillCurriculum />
                <SkillCTA />

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
