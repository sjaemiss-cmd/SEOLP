import { Metadata } from "next";
import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { locationData } from "@/data/seoData";
import { JSONLDScript, generateFAQSchema, generateLocalBusinessSchema } from "@/lib/structuredData";

// Components
import Header from "@/components/Header";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import USP from "@/components/USP";
import ProgramTeaser from "@/components/ProgramTeaser";

// Shared Components
import SocialProof from "@/components/SocialProof";
import LocationSection from "@/components/LocationSection";
import FAQ from "@/components/FAQ";
import FloatingCTA from "@/components/FloatingCTA";

// ISR Strategy: Allow on-demand rendering for pages not pre-built
export const dynamicParams = true;

export function generateStaticParams() {
  // Limit to 1000 pages at build time to prevent timeout
  // Remaining pages will be generated on-demand via ISR
  return locationData.slice(0, 1000).map((location) => ({
    slug: location.slug,
  }));
}

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const locationInfo = locationData.find((loc) => loc.slug === decodedSlug);
  const locationName = locationInfo ? locationInfo.name : decodedSlug;
  const keyword = locationInfo?.keyword || "운전연수";
  const landmark = locationInfo?.landmarks[0] || "지하철역";

  return {
    title: `${locationName} ${keyword} 추천 | 고수의 운전면허`,
    description: `${locationName} ${landmark} 근처 쾌적한 실내 운전연습장. ${keyword} 고민 해결! 속성 면허부터 장롱면허 탈출까지, 합리적인 비용으로 시작하세요.`,
    alternates: {
      canonical: `https://dobong.gosudriving.com/locations/${slug}`,
    },
    openGraph: {
      url: `https://dobong.gosudriving.com/locations/${slug}`,
      images: [
        {
          url: "https://dobong.gosudriving.com/logo-black.webp",
          width: 800,
          height: 600,
          alt: `${locationName} 운전면허`,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const locationInfo = locationData.find((loc) => loc.slug === decodedSlug);
  const locationName = locationInfo ? locationInfo.name : "";
  const keyword = locationInfo?.keyword; // Extract keyword

  // Use Cost Data for the main Hero (Broad Appeal)
  const heroData = siteConfig.landing.cost.hero;
  const heroTheme = siteConfig.landing.cost.theme || "#FECE48";
  const designStyle = siteConfig.landing.cost.designStyle;

  // Use Cost Problem Data for USP (or a dedicated USP data if available)
  const uspData = siteConfig.landing.cost.problem;

  // If location not found, show default content without redirecting
  const showDefaultContent = !locationInfo;

  return (
    <main className="min-h-screen bg-brand-black font-sans text-white selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden relative">
      {!showDefaultContent && <JSONLDScript schema={generateFAQSchema(siteConfig.faq.items)} />}
      {!showDefaultContent && locationName && <JSONLDScript schema={generateLocalBusinessSchema(locationName)} />}
      <div className="relative z-10">
        <Header />


        {/* 1. Main Hub Hero (Broad Appeal) */}
        <Hero
          data={heroData}
          theme={heroTheme}
          locationName={showDefaultContent ? undefined : locationName}
          keyword={showDefaultContent ? undefined : keyword}
          designStyle={designStyle}
        />

        {/* 2. USP Section (Video Grid) */}
        <USP data={uspData} theme={heroTheme} />

        {/* 3. Program Teaser (Course Selection) */}
        <ProgramTeaser slug={slug} />

        {/* Shared Sections */}
        <SocialProof theme={heroTheme} />
        <LocationSection theme={heroTheme} />
        {!showDefaultContent && <FAQ theme={heroTheme} />}
        <Footer theme={heroTheme} />
        <FloatingCTA theme={heroTheme} />
      </div>
    </main>
  );
}
