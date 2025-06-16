import { getSession } from '@/lib/session';
import { AuthService } from '@/services/auth.service';
import { NextResponse } from 'next/server';

export async function POST() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ message: '로그아웃 성공' }, { status: 200 });
    }

    const authService = new AuthService();
    await authService.logoutWithKakao(session.userId);
    return NextResponse.json({ message: '로그아웃 성공' }, { status: 200 });
}
