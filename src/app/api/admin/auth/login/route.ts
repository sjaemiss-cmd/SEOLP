import { NextResponse } from 'next/server';
import { verifyPassword, createSessionToken, setSessionCookie } from '@/lib/admin/auth';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (!password || !verifyPassword(password)) {
            return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 });
        }

        const token = createSessionToken();
        await setSessionCookie(token);

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: '로그인 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
