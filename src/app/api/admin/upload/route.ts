import { NextResponse } from 'next/server';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { isAuthenticated } from '@/lib/admin/auth';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.mp4', '.webm'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: Request) {
    const authed = await isAuthenticated();
    if (!authed) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: '프로덕션 환경에서는 업로드할 수 없습니다.' }, { status: 403 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: '파일 크기는 50MB를 초과할 수 없습니다.' }, { status: 400 });
        }

        const ext = extname(file.name).toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return NextResponse.json({ error: `허용되지 않는 파일 형식입니다. (${ALLOWED_EXTENSIONS.join(', ')})` }, { status: 400 });
        }

        // Ensure upload directory exists
        if (!existsSync(UPLOAD_DIR)) {
            mkdirSync(UPLOAD_DIR, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filename = `${timestamp}_${safeName}`;
        const filePath = join(UPLOAD_DIR, filename);

        // Write file
        const buffer = Buffer.from(await file.arrayBuffer());
        writeFileSync(filePath, buffer);

        const publicPath = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            file: {
                name: filename,
                originalName: file.name,
                path: publicPath,
                size: file.size,
                type: file.type,
            },
        });
    } catch {
        return NextResponse.json({ error: '파일 업로드에 실패했습니다.' }, { status: 500 });
    }
}
