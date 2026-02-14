import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { readSection, writeSection } from '@/lib/admin/configIO';
import { isAuthenticated } from '@/lib/admin/auth';

const VALID_SECTIONS = ['common', 'header', 'footer', 'faq', 'event', 'fallbackReviews', 'priceAnchor', 'media', 'trustBar', 'uspCards', 'programTeaser', 'location'];

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ section: string }> }
) {
    const authed = await isAuthenticated();
    if (!authed) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const { section } = await params;

    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: '유효하지 않은 섹션입니다.' }, { status: 400 });
    }

    try {
        const data = await readSection(section);
        if (data === null) {
            return NextResponse.json({ error: '섹션을 찾을 수 없습니다.' }, { status: 404 });
        }
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: '섹션을 불러오는데 실패했습니다.' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ section: string }> }
) {
    const authed = await isAuthenticated();
    if (!authed) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const { section } = await params;

    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: '유효하지 않은 섹션입니다.' }, { status: 400 });
    }

    try {
        const data = await request.json();
        await writeSection(section, data);
        revalidateTag('siteConfig', 'default');
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: '섹션 저장에 실패했습니다.' }, { status: 500 });
    }
}
