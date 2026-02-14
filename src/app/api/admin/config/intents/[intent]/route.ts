import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { readIntent, writeIntent } from '@/lib/admin/configIO';
import { isAuthenticated } from '@/lib/admin/auth';

const VALID_INTENTS = ['speed', 'skill', 'cost', 'phobia', 'practice'];

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ intent: string }> }
) {
    const authed = await isAuthenticated();
    if (!authed) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const { intent } = await params;

    if (!VALID_INTENTS.includes(intent)) {
        return NextResponse.json({ error: '유효하지 않은 인텐트입니다.' }, { status: 400 });
    }

    try {
        const data = await readIntent(intent);
        if (data === null) {
            return NextResponse.json({ error: '인텐트를 찾을 수 없습니다.' }, { status: 404 });
        }
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: '인텐트를 불러오는데 실패했습니다.' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ intent: string }> }
) {
    const authed = await isAuthenticated();
    if (!authed) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const { intent } = await params;

    if (!VALID_INTENTS.includes(intent)) {
        return NextResponse.json({ error: '유효하지 않은 인텐트입니다.' }, { status: 400 });
    }

    try {
        const data = await request.json();
        await writeIntent(intent, data);
        revalidateTag('siteConfig', 'default');
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: '인텐트 저장에 실패했습니다.' }, { status: 500 });
    }
}
