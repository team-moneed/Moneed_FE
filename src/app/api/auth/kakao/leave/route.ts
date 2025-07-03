import { getSession } from '@/lib/session';
import { AuthService } from '@/services/auth.service';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const authService = new AuthService();
        const result = await authService.leaveWithKakao(session.userId);

        if (result.ok) {
            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ ok: false, reason: result.reason }, { status: 400 });
    } catch (error) {
        console.error('Leave API error:', error);
        return NextResponse.json({ ok: false, reason: 'Internal server error' }, { status: 500 });
    }
}
