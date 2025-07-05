import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { JWTExpired } from 'jose/errors';
import { TOKEN_ERROR } from '@/constants/token';
import { AxiosError } from 'axios';
import { createSession } from '@/lib/session';
import { RequiredUserInfo } from '@/types/user';
import { TokenPayload } from '@/types/auth';

const getDefaultProfileImage = () => {
    const randomNumber = Math.floor(Math.random() * 15) + 1;
    return `${process.env.NEXT_PUBLIC_MONEED_BASE_URL}/profile/profile-${randomNumber}.svg`;
};

export async function POST(request: NextRequest) {
    try {
        const { code, state } = await request.json();

        // CSRF 공격 방지를 위한 state 검증
        if (!state || state !== process.env.KAKAO_STATE_TOKEN) {
            console.error('Invalid state token:', state);
            return NextResponse.redirect(new URL('/auth/error?error=invalid_state', request.url));
        }

        // Authorization code 검증
        if (!code) {
            return NextResponse.redirect(new URL('/auth/error?error=missing_code', request.url));
        }

        const authService = new AuthService();

        const tokenData = await authService.getTokenWithKakao(code);
        const kakaoUserInfo = await authService.getKakaoUserInfo(tokenData.accessToken);

        const existingUser = await authService.checkExistingUser({
            userInfo: {
                name: kakaoUserInfo.kakao_account.name,
                email: kakaoUserInfo.kakao_account.email,
                birthyear: kakaoUserInfo.kakao_account.birthyear,
                birthday: kakaoUserInfo.kakao_account.birthday,
            },
            provider: {
                provider: 'kakao',
                providerUserId: kakaoUserInfo.id.toString(),
            },
        });

        let payload: TokenPayload = {
            userId: '',
            nickname: '',
        };

        if (existingUser.isExisting) {
            const user = await authService.signIn(existingUser.user.id, {
                provider: 'kakao',
                providerUserId: kakaoUserInfo.id.toString(),
                accessToken: tokenData.accessToken,
                refreshToken: tokenData.refreshToken,
                accessTokenExpiresIn: new Date(Date.now() + tokenData.accessTokenExpiresInSec * 1000),
                refreshTokenExpiresIn: new Date(Date.now() + tokenData.refreshTokenExpiresInSec * 1000),
            });

            payload = {
                userId: user.id,
                nickname: user.nickname,
            };
        } else {
            const user: Omit<RequiredUserInfo, 'nickname'> = {
                name: kakaoUserInfo.kakao_account.name,
                email: kakaoUserInfo.kakao_account.email,
                birthyear: kakaoUserInfo.kakao_account.birthyear,
                birthday: kakaoUserInfo.kakao_account.birthday,
                profileImage: getDefaultProfileImage(),
                ageRange: kakaoUserInfo.kakao_account.age_range,
                gender: kakaoUserInfo.kakao_account.gender,
            };
            const newUser = await authService.signUp(user, {
                provider: 'kakao',
                providerUserId: kakaoUserInfo.id.toString(),
                accessToken: tokenData.accessToken,
                refreshToken: tokenData.refreshToken,
                accessTokenExpiresIn: new Date(Date.now() + tokenData.accessTokenExpiresInSec * 1000),
                refreshTokenExpiresIn: new Date(Date.now() + tokenData.refreshTokenExpiresInSec * 1000),
            });

            payload = {
                userId: newUser.id,
                nickname: newUser.nickname,
            };
        }

        await createSession(payload);

        return NextResponse.json({ isExistingUser: existingUser.isExisting }, { status: 200 });
    } catch (error) {
        if (error instanceof JWTExpired) {
            return NextResponse.json({ error: TOKEN_ERROR.EXPIRED_TOKEN }, { status: 401 });
        }
        console.error('OAuth callback error:', (error as AxiosError).response?.data);
        // TODO: 에러 경로 상수화 필요
        return NextResponse.redirect(new URL('/auth/error?error=internal_error', request.url));
    }
}
