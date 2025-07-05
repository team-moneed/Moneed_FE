import { UserRepository } from '@/repositories/user.repository';
import { OAuthAccount, User } from '@/generated/prisma';
import { getKakaoToken, getKakaoUserInfo } from '@/api/kakao.api';
import { ProviderRepository } from '@/repositories/provider.repository';
import { RequiredUserInfo, UserInfo } from '@/types/user';
import { NicknameService } from '@/services/nickname.service';

export interface ProviderInfo {
    provider: string;
    providerUserId: string;
}

// TODO: 추상화 (카카오 로그인 외 다른 로그인 추가 시 수정 필요)
export class AuthService {
    private userRepository: UserRepository;
    private providerRepository: ProviderRepository;
    private nicknameService: NicknameService;

    constructor() {
        this.userRepository = new UserRepository();
        this.providerRepository = new ProviderRepository();
        this.nicknameService = new NicknameService();
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
    ): Promise<User> {
        await this.providerRepository.upsert(userId, providerData);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async signUp(
        user: Omit<RequiredUserInfo, 'nickname'>,
        providerData: Pick<
            OAuthAccount,
            | 'provider'
            | 'providerUserId'
            | 'accessToken'
            | 'refreshToken'
            | 'accessTokenExpiresIn'
            | 'refreshTokenExpiresIn'
        >,
    ): Promise<User> {
        // 랜덤 닉네임 생성
        const uniqueNickname = await this.nicknameService.generateUniqueNickname();

        // 사용자 데이터에 생성된 닉네임 추가
        const userWithNickname: RequiredUserInfo = {
            ...user,
            nickname: uniqueNickname,
        };

        return this.userRepository.create(providerData, userWithNickname);
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
}
