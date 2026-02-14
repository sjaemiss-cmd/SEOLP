import { createHmac, timingSafeEqual, randomBytes } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'cms_session';
const SESSION_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds

export function verifyPassword(input: string): boolean {
    const expected = process.env.CMS_PASSWORD;
    if (!expected) return false;

    const inputBuf = Buffer.from(input);
    const expectedBuf = Buffer.from(expected);

    if (inputBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(inputBuf, expectedBuf);
}

export function createSessionToken(): string {
    const secret = process.env.CMS_SESSION_SECRET;
    if (!secret) throw new Error('CMS_SESSION_SECRET is not set');

    const timestamp = Date.now().toString();
    const hmac = createHmac('sha256', secret).update(timestamp).digest('hex');
    return `${timestamp}:${hmac}`;
}

export function verifySessionToken(token: string): boolean {
    const secret = process.env.CMS_SESSION_SECRET;
    if (!secret) return false;

    const parts = token.split(':');
    if (parts.length !== 2) return false;

    const [timestamp, providedHmac] = parts;
    const ts = parseInt(timestamp, 10);
    if (isNaN(ts)) return false;

    // Check expiration (24 hours)
    if (Date.now() - ts > SESSION_MAX_AGE * 1000) return false;

    const expectedHmac = createHmac('sha256', secret).update(timestamp).digest('hex');
    const providedBuf = Buffer.from(providedHmac);
    const expectedBuf = Buffer.from(expectedHmac);

    if (providedBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(providedBuf, expectedBuf);
}

export async function setSessionCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: SESSION_MAX_AGE,
        path: '/',
    });
}

export async function clearSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getSessionToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value;
}

export async function isAuthenticated(): Promise<boolean> {
    const token = await getSessionToken();
    if (!token) return false;
    return verifySessionToken(token);
}

export function generateSecret(): string {
    return randomBytes(32).toString('hex');
}
