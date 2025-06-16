import { UserRepository } from '@/repositories/user.repository';
import { OAuthAccount, User } from '@/generated/prisma';
import { deleteSession } from '@/lib/session';
import { getKakaoToken, getKakaoUserInfo, leaveKakao, logoutKakao } from '@/api/kakao.api';
import { ProviderRepository } from '@/repositories/provider.repository';
import { AxiosError } from 'axios';
import { RequiredUserInfo, UserInfo } from '@/types/user';

export interface ProviderInfo {
    provider: string;
    providerUserId: string;
}

// TODO: 추상화 (카카오 로그인 외 다른 로그인 추가 시 수정 필요)
export class AuthService {
    private userRepository: UserRepository;
    private providerRepository: ProviderRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.providerRepository = new ProviderRepository();
    }

    async checkExistingUser({
        userInfo,
        provider,
    }: {
        userInfo: UserInfo;
        provider: ProviderInfo;
    }): Promise<{ user: User; isExisting: true } | { user: null; isExisting: false }> {
        const existingUserByProvider = await this.userRepository.findByProvider({
            provider: provider.provider,
            providerUserId: provider.providerUserId,
        });

        if (existingUserByProvider) {
            return { user: existingUserByProvider, isExisting: true };
        }

        const existingUserByUserInfo = await this.userRepository.findByUserInfo(userInfo);

        if (existingUserByUserInfo) {
            return { user: existingUserByUserInfo, isExisting: true };
        }

        return { user: null, isExisting: false };
    }

    async signIn(
        userId: string,
        providerData: Pick<
            OAuthAccount,
            | 'provider'
            | 'providerUserId'
            | 'accessToken'
            | 'refreshToken'
            | 'accessTokenExpiresIn'
            | 'refreshTokenExpiresIn'
        >,
    ) {
        await this.providerRepository.upsert(userId, providerData);
    }

    async signUp(
        user: RequiredUserInfo,
        providerData: Pick<
            OAuthAccount,
            | 'provider'
            | 'providerUserId'
            | 'accessToken'
            | 'refreshToken'
            | 'accessTokenExpiresIn'
            | 'refreshTokenExpiresIn'
        >,
    ) {
        await this.userRepository.create(providerData, user);
    }

    async logoutWithKakao(userId: string) {
        try {
            const providerInfo = await this.providerRepository.findProviderInfo(userId, 'kakao');
            if (!providerInfo) {
                await deleteSession();
                return;
            }

            const { accessToken, providerUserId } = providerInfo;
            if (!accessToken) {
                await deleteSession();
                return;
            }

            await logoutKakao({ accessToken, providerUserId });
            await deleteSession();
        } catch (e) {
            const error = e as AxiosError<{ msg: string; code: number }>;
            if (error.response?.data?.code === -401) {
                await deleteSession();
            }
        }
    }

    async leaveWithKakao(userId: string) {
        const providerInfo = await this.providerRepository.findProviderInfo(userId, 'kakao');
        if (!providerInfo) {
            await deleteSession();
            return {
                ok: false,
                reason: 'Provider information not found',
            };
        }

        const { accessToken, providerUserId } = providerInfo;
        if (!accessToken) {
            await deleteSession();
            return {
                ok: false,
                reason: 'Access token not found',
            };
        }

        // 카카오 연결 해제 시도
        const kakaoResponse = await leaveKakao({ accessToken, providerUserId });
        if (kakaoResponse.id) {
            const user = await this.userRepository.findByProvider({
                provider: 'kakao',
                providerUserId: kakaoResponse.id.toString(),
            });

            if (user) {
                await this.leave(user.id);
                return {
                    ok: true,
                };
            }
        }

        return {
            ok: false,
            reason: 'Failed to process leave request',
        };
    }

    async getTokenWithKakao(code: string) {
        const kakaoToken = await getKakaoToken(code);
        const {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: accessTokenExpiresInSec,
            refresh_token_expires_in: refreshTokenExpiresInSec,
        } = kakaoToken;

        return {
            accessToken,
            refreshToken,
            accessTokenExpiresInSec,
            refreshTokenExpiresInSec,
        };
    }

    async getKakaoUserInfo(kakaoAccessToken: string) {
        const kakaoUserInfo = await getKakaoUserInfo(kakaoAccessToken);
        return kakaoUserInfo;
    }

    async leave(userId: string) {
        await this.userRepository.delete(userId);
        await deleteSession();
    }
}
