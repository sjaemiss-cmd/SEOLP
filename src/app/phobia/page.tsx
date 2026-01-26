import React from "react";
import { landingData } from "@/data/landingData";
import { siteConfig } from "@/data/siteConfig";
import { JSONLDScript, generateFAQSchema } from "@/lib/structuredData";

// Components
import Header from "@/components/Header";

import PhobiaHero from "@/components/phobia/PhobiaHero";
import AnxietyReliefPrescription from "@/components/phobia/AnxietyReliefPrescription";
import PhobiaProblem from "@/components/phobia/PhobiaProblem";
import PhobiaCurriculum from "@/components/phobia/PhobiaCurriculum";
import PhobiaCTA from "@/components/phobia/PhobiaCTA";

// Shared Components
import SocialProof from "@/components/SocialProof";
import LocationSection from "@/components/LocationSection";
import NewYearEvent from "@/components/NewYearEvent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata = {
    title: "고수의 운전면허 - 장롱면허 탈출 Phobia 케어",
    description: "운전이 무서우신가요? 심리적 안정을 돕는 단계별 연수 프로그램으로 운전 공포증을 극복하세요.",
    alternates: {
        canonical: "https://dobong.gosudriving.com/phobia",
    },
    openGraph: {
        url: "https://dobong.gosudriving.com/phobia",
        images: [
            {
                url: "https://dobong.gosudriving.com/logo-black.webp",
                width: 800,
                height: 600,
                alt: "고수의 운전면허 Phobia 케어",
            },
        ],
    },
};

export default function PhobiaPage() {
    const theme = landingData.phobia.theme;

    return (
        <main className="min-h-screen bg-brand-black font-sans text-white selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden relative">
            <JSONLDScript schema={generateFAQSchema(siteConfig.faq.items)} />
            <div className="relative z-10">
                <Header />


                <PhobiaHero />
                <AnxietyReliefPrescription />
                <PhobiaProblem />
                <PhobiaCurriculum />
                <PhobiaCTA />

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
