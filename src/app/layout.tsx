import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import "./globals.css";
import { JSONLDScript, generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/structuredData";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { SiteConfigProvider } from "@/contexts/SiteConfigContext";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const hakgyoansim = localFont({
  src: [
    {
      path: "./fonts/Hakgyoansim Allimjang OTF R.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Hakgyoansim Allimjang OTF B.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-hakgyoansim",
});

export const metadata: Metadata = {
  title: "고수의 운전면허 도봉점 - 합격 무제한 보장 | 노원 운전면허",
  description: "노원/도봉 운전면허 합격률 1위! 실내 운전연습장에서 합리적인 비용으로 운전면허 취득하세요. 합격할 때까지 추가 비용 없는 무제한 보장반 운영. 100% 예약제, 1:1 맞춤 지도.",
  keywords: ["운전면허", "운전연습", "장롱면허", "운전연수", "도봉운전면허시험장", "노원운전면허학원", "실내운전연습장", "고수의운전면허"],
  metadataBase: new URL("https://dobong.gosudriving.com"),
  openGraph: {
    title: "고수의 운전면허 도봉점 - 합격 무제한 보장",
    description: "합격할 때까지 추가 비용 0원! 쾌적한 실내에서 시뮬레이터로 안전하고 확실하게 운전면허 취득하세요.",
    url: "https://dobong.gosudriving.com",
    siteName: "고수의 운전면허 도봉점",
    images: [
      {
        url: "https://dobong.gosudriving.com/images/logos/logo-black.webp",
        width: 800,
        height: 600,
        alt: "고수의 운전면허 도봉점 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "고수의 운전면허 도봉점",
    description: "합격할 때까지 무제한 보장! 노원/도봉 운전면허의 기준.",
    images: ["https://dobong.gosudriving.com/images/logos/logo-black.webp"],
  },
  icons: {
    apple: "/images/logos/logo-black.webp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FECE48",
};

import ScrollToTop from "@/components/ScrollToTop";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();

  return (
    <html lang="ko">
      <head>
        {/* Pretendard CDN removed */}
        <JSONLDScript schema={generateOrganizationSchema()} />
        <JSONLDScript schema={generateLocalBusinessSchema()} />
      </head>
      <body
        className={`${pretendard.variable} ${hakgyoansim.variable} antialiased font-sans`}
      >
        <SiteConfigProvider config={config}>
          <ScrollToTop />
          {children}
        </SiteConfigProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
