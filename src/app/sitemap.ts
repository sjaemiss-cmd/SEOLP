import { MetadataRoute } from 'next';
import { locationData, intentData } from '@/data/seoData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://dobong.gosudriving.com';

    // 1. Static Routes (High Priority)
    const staticRoutes = [
        '',
        '/speed',
        '/phobia',
        '/skill',
        '/practice',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    // 2. Location Main Pages (Limited to prevent build timeout)
    // Limit to 1000 most important pages to prevent build timeout
    // Priority: main regions first, then major keywords
    const locationRoutes = locationData.slice(0, 1000).map((location) => ({
        url: `${baseUrl}/locations/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Intent Detail Pages (Limited and filtered)
    // Only include intent pages for top 500 locations to prevent timeout
    // Priority: cost intent first (main), then others
    const topLocations = locationData.slice(0, 500);
    const intentRoutes = topLocations.flatMap((location) =>
        intentData.map((intent) => ({
            url: `${baseUrl}/locations/${location.slug}/${intent}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: intent === 'cost' ? 0.7 : 0.6,
        }))
    );

    return [...staticRoutes, ...locationRoutes, ...intentRoutes];
}
