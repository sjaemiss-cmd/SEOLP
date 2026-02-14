import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { readConfig, writeConfig } from '@/lib/admin/configIO';
import { isAuthenticated } from '@/lib/admin/auth';

export async function GET() {
    const authed = await isAuthenticated();
    if (!authed) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    try {
        const config = await readConfig();
        return NextResponse.json(config);
    } catch {
        return NextResponse.json({ error: '설정을 불러오는데 실패했습니다.' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const authed = await isAuthenticated();
    if (!authed) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    try {
        const config = await request.json();
        await writeConfig(config);
        revalidateTag('siteConfig', 'default');
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: '설정 저장에 실패했습니다.' }, { status: 500 });
    }
}
