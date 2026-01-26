import React from "react";
import { landingData } from "@/data/landingData";
import { siteConfig } from "@/data/siteConfig";
import { JSONLDScript, generateFAQSchema } from "@/lib/structuredData";

// Components
import Header from "@/components/Header";

import SpeedHero from "@/components/speed/SpeedHero";
import LicenseDDayCalculator from "@/components/speed/LicenseDDayCalculator";
import SpeedProblem from "@/components/speed/SpeedProblem";
import SpeedStory from "@/components/speed/SpeedStory";
import SpeedCurriculum from "@/components/speed/SpeedCurriculum";
import SpeedCTA from "@/components/speed/SpeedCTA";

// Shared Components
import SocialProof from "@/components/SocialProof";
import LocationSection from "@/components/LocationSection";
import NewYearEvent from "@/components/NewYearEvent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata = {
    title: "고수의 운전면허 - 3일 완성 Speed 코스",
    description: "운전면허 취득이 급하신가요? 3일 만에 완성하는 초단기 속성 합격 커리큘럼.",
    alternates: {
        canonical: "https://dobong.gosudriving.com/speed",
    },
    openGraph: {
        url: "https://dobong.gosudriving.com/speed",
        images: [
            {
                url: "https://dobong.gosudriving.com/logo-black.webp",
                width: 800,
                height: 600,
                alt: "고수의 운전면허 Speed 코스",
            },
        ],
    },
};

export default function SpeedPage() {
    const theme = landingData.speed.theme;

    return (
        <main className="min-h-screen bg-brand-black font-sans text-white selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden relative">
            <JSONLDScript schema={generateFAQSchema(siteConfig.faq.items)} />
            <div className="relative z-10">
                <Header />


                <SpeedHero />
                <LicenseDDayCalculator />
                <SpeedProblem />
                <SpeedStory />
                <SpeedCurriculum />
                <SpeedCTA />

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
