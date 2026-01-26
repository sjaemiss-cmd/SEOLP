/**
 * JSON-LD / Structured Data Utilities
 * Generates Schema.org structured data for SEO
 */

interface LocalBusinessSchema {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
    telephone: string;
    address: {
        "@type": string;
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
    };
    geo?: {
        "@type": string;
        latitude: number;
        longitude: number;
    };
    openingHoursSpecification?: Array<{
        "@type": string;
        dayOfWeek: string[];
        opens: string;
        closes: string;
    }>;
    priceRange: string;
    image: string;
}

interface FAQPageSchema {
    "@context": string;
    "@type": string;
    mainEntity: Array<{
        "@type": string;
        name: string;
        acceptedAnswer: {
            "@type": string;
            text: string;
        };
    }>;
}

interface OrganizationSchema {
    "@context": string;
    "@type": string;
    name: string;
    url: string;
    logo: string;
    description: string;
    contactPoint: {
        "@type": string;
        telephone: string;
        contactType: string;
    };
    address: {
        "@type": string;
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
    };
}

/**
 * Generates LocalBusiness JSON-LD schema
 */
export function generateLocalBusinessSchema(locationName?: string): LocalBusinessSchema {
    return {
        "@context": "https://schema.org",
        "@type": "DrivingSchool",
        name: locationName ? `고수의 운전면허 ${locationName}` : "고수의 운전면허 도봉점",
        description: "노원/도봉 운전면허 합격률 1위! 실내 운전연습장에서 합리적인 비용으로 운전면허 취득하세요. 합격할 때까지 추가 비용 없는 무제한 보장반 운영.",
        url: "https://dobong.gosudriving.com",
        telephone: "02-930-9394",
        address: {
            "@type": "PostalAddress",
            streetAddress: "서울 노원구 동일로1426 미도빌딩 5층 504호",
            addressLocality: "노원구",
            addressRegion: "서울특별시",
            addressCountry: "KR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 37.665,
            longitude: 127.035,
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "21:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Saturday"],
                opens: "10:00",
                closes: "18:00",
            },
        ],
        priceRange: "$$",
        image: "https://dobong.gosudriving.com/logo-black.webp",
    };
}

/**
 * Generates FAQPage JSON-LD schema
 */
export function generateFAQSchema(faqs: { q: string; a: string }[]): FAQPageSchema {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
            },
        })),
    };
}

/**
 * Generates Organization JSON-LD schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "고수의 운전면허 도봉점",
        url: "https://dobong.gosudriving.com",
        logo: "https://dobong.gosudriving.com/logo-black.webp",
        description: "노원/도봉 운전면허 합격률 1위 실내 운전연습장",
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "02-930-9394",
            contactType: "customer service",
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: "서울 노원구 동일로1426 미도빌딩 5층 504호",
            addressLocality: "노원구",
            addressRegion: "서울특별시",
            addressCountry: "KR",
        },
    };
}

/**
 * Renders JSON-LD script tag
 */
export function JSONLDScript({ schema }: { schema: Record<string, unknown> | LocalBusinessSchema | OrganizationSchema | FAQPageSchema }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
