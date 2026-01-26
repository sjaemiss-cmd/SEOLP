import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { JSONLDScript, generateFAQSchema } from "@/lib/structuredData";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import USP from "@/components/USP";
import ProgramTeaser from "@/components/ProgramTeaser";

// Shared Components
import SocialProof from "@/components/SocialProof";
import LocationSection from "@/components/LocationSection";
import CookieEvent from "@/components/CookieEvent";
import FAQ from "@/components/FAQ";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata = {
  title: "고수의 운전면허 도봉점 - 합격 무제한 보장 | 노원 운전면허",
  description: "노원/도봉 운전면허 합격률 1위! 실내 운전연습장에서 합리적인 비용으로 운전면허 취득하세요. 합격할 때까지 추가 비용 없는 무제한 보장반 운영.",
};

export default function Home() {
  // Use Cost Data for the main Hero (Broad Appeal)
  const heroData = siteConfig.landing.cost.hero;
  const heroTheme = siteConfig.landing.cost.theme || "#FECE48";
  const designStyle = siteConfig.landing.cost.designStyle;

  // Use Cost Problem Data for USP
  const uspData = siteConfig.landing.cost.problem;

  return (
    <main className="min-h-screen bg-brand-black font-sans text-white selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden relative">
      <JSONLDScript schema={generateFAQSchema(siteConfig.faq.items)} />
      <div className="relative z-10">
        <Header />

        {/* 1. Main Hub Hero (Broad Appeal) */}
        <Hero
          data={heroData}
          theme={heroTheme}
          designStyle={designStyle}
        />

        {/* 2. USP Section (Video Grid) */}
        <USP data={uspData} theme={heroTheme} />

        {/* 3. Program Teaser (Course Selection) - Hub Feature */}
        <ProgramTeaser slug="dobong" />

        {/* Shared Sections */}
        <SocialProof theme={heroTheme} />
        <LocationSection theme={heroTheme} />
        <CookieEvent theme={heroTheme} />
        <FAQ theme={heroTheme} />
        <Footer theme={heroTheme} />
        <FloatingCTA theme={heroTheme} />
      </div>
    </main>
  );
}
