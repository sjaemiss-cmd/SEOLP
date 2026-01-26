import React from "react";
import { landingData } from "@/data/landingData";
import { siteConfig } from "@/data/siteConfig";
import { JSONLDScript, generateFAQSchema } from "@/lib/structuredData";

// Components
import Header from "@/components/Header";

import PracticeHero from "@/components/practice/PracticeHero";
import CurriculumBuilder from "@/components/practice/CurriculumBuilder";
import PracticeProblem from "@/components/practice/PracticeProblem";
import PracticeCurriculum from "@/components/practice/PracticeCurriculum";
import PracticeCTA from "@/components/practice/PracticeCTA";

// Shared Components
import SocialProof from "@/components/SocialProof";
import LocationSection from "@/components/LocationSection";
import NewYearEvent from "@/components/NewYearEvent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata = {
    title: "고수의 운전면허 - Practice 핀셋 연습",
    description: "부족한 부분만 집중적으로 연습하고 싶으신가요? 내가 원하는 코스만 골라 연습하는 맞춤형 커리큘럼.",
    alternates: {
        canonical: "https://dobong.gosudriving.com/practice",
    },
    openGraph: {
        url: "https://dobong.gosudriving.com/practice",
        images: [
            {
                url: "https://dobong.gosudriving.com/logo-black.webp",
                width: 800,
                height: 600,
                alt: "고수의 운전면허 Practice 코스",
            },
        ],
    },
};

export default function PracticePage() {
    const theme = landingData.practice.theme;

    return (
        <main className="min-h-screen bg-brand-black font-sans text-white selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden relative">
            <JSONLDScript schema={generateFAQSchema(siteConfig.faq.items)} />
            <div className="relative z-10">
                <Header />


                <PracticeHero />
                <CurriculumBuilder />
                <PracticeProblem />
                <PracticeCurriculum />
                <PracticeCTA />

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
