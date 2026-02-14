import { NextResponse } from 'next/server';
import { readdirSync, statSync, existsSync, unlinkSync } from 'fs';
import { join, extname } from 'path';
import { isAuthenticated } from '@/lib/admin/auth';

const PUBLIC_DIR = join(process.cwd(), 'public');
const UPLOAD_DIR = join(PUBLIC_DIR, 'uploads');
const MEDIA_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.mp4', '.webm'];

interface MediaFile {
    name: string;
    path: string;
    size: number;
    type: 'image' | 'video';
    modified: string;
    isUpload: boolean;
}

function isMediaFile(filename: string): boolean {
    return MEDIA_EXTENSIONS.includes(extname(filename).toLowerCase());
}

function getFileType(filename: string): 'image' | 'video' {
    const ext = extname(filename).toLowerCase();
    return ['.mp4', '.webm'].includes(ext) ? 'video' : 'image';
}

function scanDirectory(dir: string, basePath: string, isUpload: boolean): MediaFile[] {
    if (!existsSync(dir)) return [];

    const files: MediaFile[] = [];

    try {
        const entries = readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            if (entry.isFile() && isMediaFile(entry.name)) {
                const stat = statSync(fullPath);
                files.push({
                    name: entry.name,
                    path: `${basePath}/${entry.name}`,
                    size: stat.size,
                    type: getFileType(entry.name),
                    modified: stat.mtime.toISOString(),
                    isUpload,
                });
            } else if (entry.isDirectory() && entry.name !== 'uploads') {
                // Scan subdirectories (like /images/program_teaser/)
                files.push(...scanDirectory(fullPath, `${basePath}/${entry.name}`, isUpload));
            }
        }
    } catch {
        // Skip directories that can't be read
    }

    return files;
}

export async function GET() {
    const authed = await isAuthenticated();
    if (!authed) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    try {
        // Scan both public root and uploads directory
        const publicFiles = scanDirectory(PUBLIC_DIR, '', false);
        const uploadFiles = scanDirectory(UPLOAD_DIR, '/uploads', true);

        const allFiles = [...uploadFiles, ...publicFiles].sort((a, b) =>
            new Date(b.modified).getTime() - new Date(a.modified).getTime()
        );

        return NextResponse.json({ files: allFiles });
    } catch {
        return NextResponse.json({ error: '미디어 목록을 불러오는데 실패했습니다.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const authed = await isAuthenticated();
    if (!authed) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: '프로덕션 환경에서는 삭제할 수 없습니다.' }, { status: 403 });
    }

    try {
        const { path } = await request.json();

        // Only allow deleting uploaded files (safety)
        if (!path || !path.startsWith('/uploads/')) {
            return NextResponse.json({ error: '업로드된 파일만 삭제할 수 있습니다.' }, { status: 400 });
        }

        const filePath = join(PUBLIC_DIR, path);
        if (!existsSync(filePath)) {
            return NextResponse.json({ error: '파일을 찾을 수 없습니다.' }, { status: 404 });
        }

        unlinkSync(filePath);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: '파일 삭제에 실패했습니다.' }, { status: 500 });
    }
}
