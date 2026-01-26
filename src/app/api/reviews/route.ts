import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

interface Review {
    id: number;
    image: string;
    text: string;
    name: string;
    date: string;
}

export async function GET() {
    try {
        // Fetch the HTML from the external URL
        const response = await fetch(
            'https://gosudriving.com/company/pass_review.php?re_use_type=&re_certifi_type=&sd_idx=11&br_idx=4',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch reviews: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const reviews: Review[] = [];
        const seenImages = new Set<string>();

        // Parse review items - iterate over list items that contain the popup link
        $('li:has(a[href*="javascript:open_popup"])').each((index, element) => {
            const $li = $(element);
            const $link = $li.find('a[href*="javascript:open_popup"]');

            if ($link.length === 0) return;

            const linkText = $link.text().trim();

            // Check if this is a Dobong review
            if (!linkText.includes('[도봉운전면허시험장점]')) {
                return; // Skip non-Dobong reviews
            }

            // Extract image
            const $img = $link.find('img');
            const imgSrc = $img.attr('src');

            if (!imgSrc || seenImages.has(imgSrc)) {
                return; // Skip if no image or duplicate
            }

            // Extract name from the link text or h1 inside
            const $h1 = $link.find('h1');
            const nameText = $h1.length ? $h1.text().trim() : linkText;
            const nameMatch = nameText.match(/\[도봉운전면허시험장점\]\s*(.+)/);
            const name = nameMatch ? nameMatch[1].trim() : '익명';

            // Find the date - it is in <p class="date">
            let date = '';
            const $date = $link.find('.date');
            if ($date.length) {
                date = $date.text().trim();
            } else {
                // Fallback to regex if class not found
                const dateMatch = $li.text().match(/(\d{4}-\d{2}-\d{2})/);
                if (dateMatch) {
                    date = dateMatch[1];
                }
            }

            // Extract review text from <div class="summary">
            let reviewText = $link.find('.summary').text().trim();

            // Fallback if summary class is missing (though it seems standard)
            if (!reviewText) {
                reviewText = $li.text()
                    .replace(linkText, '')
                    .replace(date, '')
                    .replace(/\[도봉운전면허시험장점\]/g, '')
                    .trim();
            }

            // Final cleanup of review text
            reviewText = reviewText
                .replace(/\[도봉운전면허시험장점\]/g, '')
                .replace(name, '') // Remove name if it appears in body
                .replace(/^\s*-\s*/, '') // Remove leading hyphens
                .trim();

            if (imgSrc && reviewText) {
                seenImages.add(imgSrc);

                const imageUrl = imgSrc.startsWith('http')
                    ? imgSrc
                    : `https://gosudriving.com${imgSrc.startsWith('/') ? '' : '/'}${imgSrc}`;

                reviews.push({
                    id: reviews.length,
                    image: imageUrl,
                    text: reviewText.substring(0, 300), // Increased limit for modal
                    name: name,
                    date: date || new Date().toISOString().split('T')[0],
                });
            }
        });

        // Sort by date (most recent first) and limit to 8
        const sortedReviews = reviews
            .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 8);

        // Reassign IDs after sorting and limiting
        sortedReviews.forEach((review, index) => {
            review.id = index;
        });

        return NextResponse.json({
            success: true,
            count: sortedReviews.length,
            reviews: sortedReviews,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            },
        });
    } catch {
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch reviews',
            reviews: [],
        }, {
            status: 500,
        });
    }
}
